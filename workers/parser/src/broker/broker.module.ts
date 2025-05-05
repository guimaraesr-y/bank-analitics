import { Module } from '@nestjs/common';
import { RabbitMQBroker } from './infra/adapters/rabbitmq-broker.adapter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'BrokerInterface',
      useClass: RabbitMQBroker,
    },
  ],
  exports: ['BrokerInterface'],
})
export class BrokerModule {}
