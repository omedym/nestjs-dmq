import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { configurePostgresModule, RepositoryPostgresModule, TrackedQueueRepository } from '@omedym/nestjs-dmq-repository-postgres';

import { configureRedisConnection } from './redis.connect';
import { TrackedJobEventProcessor, TrackedJobEventQueue } from './queue';
import { Providers } from './providers';


/**
 * Provides support for TrackedQueue processors to publish job events to the
 * tracked job event queues. This is needed by any service/module that is hosts
 * an implementation of a tracked job processor.
 */
@Module({
  imports: [
    BullModule.forRoot({ connection: { ...configureRedisConnection() } }),
    BullModule.registerQueueAsync({ name: Providers.TrackedJobEventQueue }),
  ],
  providers: [
    TrackedJobEventQueue,
  ],
  exports: [
    Providers.ILogger,
    TrackedJobEventQueue
  ],
})
export class PublishTrackedQueueJobEventsModule { }

/**
 * Instantiates background processor for handling tracked job events generated by
 * tracked queue processors.
 */
@Module({
  imports: [
    BullModule.forRoot({ connection: { ...configureRedisConnection() } }),
    BullModule.registerQueueAsync({ name: Providers.TrackedJobEventQueue }),
    RepositoryPostgresModule.forRoot({ ...configurePostgresModule() }),
  ],
  providers: [
    TrackedJobEventProcessor,
    TrackedQueueRepository,
  ],
})
export class ProcessTrackedQueueJobEventsModule { }
