import { Module } from '@nestjs/common';
import { RabbitMQBroker } from './infra/adapters/rabbitmq-broker.adapter';

@Module({
  providers: [
    {
      provide: 'BrokerInterface',
      useClass: RabbitMQBroker,
    },
  ],
  exports: ['BrokerInterface'],
})
export class BrokerModule {}
