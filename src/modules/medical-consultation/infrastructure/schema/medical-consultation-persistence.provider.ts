import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { MedicalConsultationMysqlSchema } from './medical-consultation-mysql.schema';

export const medicalConsultationMysqlProviderName =
  'MEDICAL_CONSULTATION_MYSQL_REPORSITORY';

export const medicalConsultationMysqlProvider = [
  {
    provide: medicalConsultationMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MedicalConsultationMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
