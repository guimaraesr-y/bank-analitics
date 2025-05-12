import { Module } from '@nestjs/common';
import { PersistEntriesServiceImpl } from './infra/services/persist-entries.service';

@Module({
  providers: [
    {
      provide: 'PersistEntriesService',
      useClass: PersistEntriesServiceImpl,
    }
  ],
  exports: [
    'PersistEntriesService',
  ]
})
export class RecordPersistenceModule {}
