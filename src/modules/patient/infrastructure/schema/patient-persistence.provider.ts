import { DataSource } from 'typeorm';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { PatientMysqlSchema } from './patient-mysql.schema';

export const patientMysqlProviderName = 'PATIENT_MYSQL_REPORSITORY';

export const patientMysqlProvider = [
  {
    provide: patientMysqlProviderName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PatientMysqlSchema),
    inject: [PersistenceMysqlTypeormName],
  },
];
