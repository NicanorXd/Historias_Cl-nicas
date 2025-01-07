import { AdministrationMysqlSchema } from 'src/modules/administration/infrastructure/schema/administration-mysql.schema';
import { AnamensisMysqlSchema } from 'src/modules/anamnesis/infrastructure/schema/anamnesis-mysql.schema';
import { AttentionMysqlSchema } from 'src/modules/attention/infrastructure/schema/attention-mysql.schema';
import { DiagnosisDetailMysqlSchema } from 'src/modules/diagnosis-detail/infrastructure/schema/diagnosis-detail-mysql.schema';
import { DiagnosisMysqlSchema } from 'src/modules/diagnosis/infrastructure/schema/diagnosis-mysql.schema';
import { InsuredTypeMysqlSchema } from 'src/modules/insured-type/infrastructure/schema/insured-type-mysql.schema';
import { MedicalConsultationMysqlSchema } from 'src/modules/medical-consultation/infrastructure/schema/medical-consultation-mysql.schema';
import { MedicineMysqlSchema } from 'src/modules/medicine/infrastructure/schema/medicine-mysql.schema';
import { OfficeMysqlSchema } from 'src/modules/office/infrastructure/schema/office-mysql.schema';
import { PatientMysqlSchema } from 'src/modules/patient/infrastructure/schema/patient-mysql.schema';
import { PermissionMysqlSchema } from 'src/modules/permission/infrastructure/schema/permission-mysql.schema';
import { PresentationMysqlSchema } from 'src/modules/presentation/infrastructure/schema/presentation-mysql.schema';
import { ProfessionMysqlSchema } from 'src/modules/profession/infrastructure/schema/profession-mysql.schema';
import { RoleMysqlSchema } from 'src/modules/role/infrastructure/schema/role-mysql.schema';
import { ServiceMysqlSchema } from 'src/modules/service/infrastructure/schema/service-mysql.schema';
import { TratamientoMysqlSchema } from 'src/modules/tratamiento/infrastructure/schema/tratamiendo-mysql.schema';
import { UserMysqlSchema } from 'src/modules/user/infrastructure/schema/user-mysql.schema';
import { WorkerMysqlSchema } from 'src/modules/worker/infrastructure/schema/worker-mysql.schema';

export const PersistenceMysqlEntities = [
  RoleMysqlSchema,
  UserMysqlSchema,
  ServiceMysqlSchema,
  WorkerMysqlSchema,
  DiagnosisMysqlSchema,
  PatientMysqlSchema,
  InsuredTypeMysqlSchema,
  ProfessionMysqlSchema,
  MedicalConsultationMysqlSchema,
  AttentionMysqlSchema,
  AdministrationMysqlSchema,
  PresentationMysqlSchema,
  OfficeMysqlSchema,
  AnamensisMysqlSchema,
  DiagnosisDetailMysqlSchema,
  TratamientoMysqlSchema,
  PermissionMysqlSchema,
  MedicineMysqlSchema,
];
