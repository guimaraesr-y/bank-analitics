import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, Channel, ConsumeMessage } from 'amqplib';
import { BrokerInterface } from 'src/broker/domain/services/broker.service';

@Injectable()
export class RabbitMQBroker implements BrokerInterface {
  private channel: Channel;
  private connectionUrl: string;

  constructor(private readonly configService: ConfigService) {
    let connectionUrl = this.configService.get<string>('RABBITMQ_URL');
  
    if (!connectionUrl) {
      connectionUrl = 'amqp://localhost:5672';
    }

    this.connectionUrl = connectionUrl;
  }

  async connect(): Promise<void> {
    const conn = await connect(this.connectionUrl);
    this.channel = await conn.createChannel();
  }

  async consume(queue: string, onMessage: (msg: Buffer) => Promise<void>): Promise<void> {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, async (msg: ConsumeMessage | null) => {
      if (!msg) return;
      try {
        await onMessage(msg.content);
        this.ack(msg);
      } catch (err) {
        console.error(err);
        this.nack(msg, false);
      }
    });
  }

  async ack(message: ConsumeMessage): Promise<void> {
    this.channel.ack(message);
  }

  async nack(message: ConsumeMessage, requeue = true): Promise<void> {
    this.channel.nack(message, false, requeue);
  }
}
