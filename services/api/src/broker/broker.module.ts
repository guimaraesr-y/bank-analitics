import { Module } from '@nestjs/common';
import { RabbitMQBrokerImpl } from './infra/adapters/rabbitmq-broker.adapter';

@Module({
  providers: [
    {
      provide: 'SenderBrokerService',
      useClass: RabbitMQBrokerImpl,
    },
  ],
  exports: ['SenderBroker'],
})
export class BrokerModule {}
