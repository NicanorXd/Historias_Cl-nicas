import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const host = config.get('REDIS_HOST', 'localhost');
        const port = +config.get('REDIS_PORT', 6379);
        // response config
        return {
          redis: {
            host,
            port,
          },
        };
      },
    }),
  ],
})
export class QueueModule {}
