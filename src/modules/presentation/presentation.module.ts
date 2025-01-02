import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { PresentationHttpController } from './infrastructure/controllers/presentation-http.controller';
import { presentationMysqlProvider } from './infrastructure/schema/presentation-persistence.provider';
import { PresentationMysqlRepository } from './infrastructure/repository/presentation-mysql-repository';

@Module({
  imports: [PersistenceModule],
  providers: [...presentationMysqlProvider, PresentationMysqlRepository],
  exports: [...presentationMysqlProvider, PresentationMysqlRepository],
  controllers: [PresentationHttpController],
})
export class PresentationModule {}
