import { Module } from '@nestjs/common';
import { TrackedQueueRepository } from '@omedym/nestjs-dmq-repository-postgres';
import { Providers } from './providers';
import { TrackedJobEventProcessor, TrackedJobEventQueue } from './queue';

@Module({
  imports: [
  ],
  exports: [
    TrackedJobEventProcessor,
    TrackedJobEventQueue,
  ],
  providers: [
    TrackedJobEventProcessor,
    TrackedJobEventQueue,
    TrackedQueueRepository,
  ],
})
export class TrackedQueueModule { }
