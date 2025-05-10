import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, Channel } from 'amqplib';
import { SenderBrokerService } from 'src/broker/domain/services/sender-broker.service';

@Injectable()
export class RabbitMQBrokerImpl implements SenderBrokerService {

  private channel: Channel;
  private connectionUrl: string;

  constructor(private readonly configService: ConfigService) {
    let connectionUrl = this.configService.get<string>('RABBITMQ_URL');

    if (!connectionUrl) {
      connectionUrl = 'amqp://localhost:5672';
    }

    this.connectionUrl = connectionUrl;
    this.connect();
  }

  async connect(): Promise<void> {
    const conn = await connect(this.connectionUrl);
    this.channel = await conn.createChannel();
  }

  async send(queue: string, message: Buffer): Promise<void> {
    if (!this.channel) {
      throw new Error('Broker is not connected');
    }

    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, message);
  }

}
