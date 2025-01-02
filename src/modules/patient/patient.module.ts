import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { PatientMysqlRepository } from './infrastructure/repository/patient-mysql-repository';
import { patientMysqlProvider } from './infrastructure/schema/patient-persistence.provider';
import { PatientHttpController } from './infrastructure/controllers/patient-http.controller';

@Module({
  imports: [PersistenceModule],
  providers: [...patientMysqlProvider, PatientMysqlRepository],
  exports: [...patientMysqlProvider, PatientMysqlRepository],
  controllers: [PatientHttpController],
})
export class PatientModule {}
