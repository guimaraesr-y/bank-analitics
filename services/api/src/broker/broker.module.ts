import { Module } from '@nestjs/common';
import { RabbitMQBroker } from './infra/adapters/rabbitmq-broker.adapter';

@Module({
  providers: [
    {
      provide: 'SenderBrokerInterface',
      useClass: RabbitMQBroker,
    },
  ],
  exports: ['SenderBrokerInterface'],
})
export class BrokerModule {}
