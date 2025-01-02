import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { attentionMysqlProvider } from './infrastructure/schema/attention-persistence.provider';
import { AttentionHttpController } from './infrastructure/controllers/attention-http.controller';
import { AttentionMysqlRepository } from './infrastructure/repository/attention-mysql-repository';
import { MedicalConsultationModule } from '../medical-consultation/medical-consultation.module';

@Module({
  imports: [PersistenceModule, MedicalConsultationModule],
  providers: [...attentionMysqlProvider, AttentionMysqlRepository],
  exports: [...attentionMysqlProvider, AttentionMysqlRepository],
  controllers: [AttentionHttpController],
})
export class AttentionModule {}
