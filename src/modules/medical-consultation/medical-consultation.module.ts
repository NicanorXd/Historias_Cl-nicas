import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { medicalConsultationMysqlProvider } from './infrastructure/schema/medical-consultation-persistence.provider';
import { MedicalConsultationHttpController } from './infrastructure/controllers/medical-consultation-http.controller';
import { MedicalConsultationMysqlRepository } from './infrastructure/repository/medical-consultation-mysql-repository';

@Module({
  imports: [PersistenceModule],
  providers: [
    ...medicalConsultationMysqlProvider,
    MedicalConsultationMysqlRepository,
  ],
  exports: [
    ...medicalConsultationMysqlProvider,
    MedicalConsultationMysqlRepository,
  ],
  controllers: [MedicalConsultationHttpController],
})
export class MedicalConsultationModule {}
