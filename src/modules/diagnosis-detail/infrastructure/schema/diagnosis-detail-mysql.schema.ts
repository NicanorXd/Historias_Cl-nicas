import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DiagnosisDetailEntity } from '../../domain/diagnosis-detail.entity';
import { OfficeEntity } from 'src/modules/office/domain/office.entity';
import { OfficeMysqlSchema } from 'src/modules/office/infrastructure/schema/office-mysql.schema';
import { DiagnosisMysqlSchema } from 'src/modules/diagnosis/infrastructure/schema/diagnosis-mysql.schema';
import { DiagnosisEntity } from 'src/modules/diagnosis/domain/diagnosis.entity';

@Entity('diagnosisDetail')
export class DiagnosisDetailMysqlSchema implements DiagnosisDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  officeId: number;

  @Column()
  diagnosisId: number;

  @Column()
  comment: string;

  @Column()
  morbilidad: string;

  @ManyToOne(() => OfficeMysqlSchema, (office) => office.diagnosis)
  office: OfficeEntity;

  @ManyToOne(() => DiagnosisMysqlSchema, (diagnosis) => diagnosis)
  diagnosis: DiagnosisEntity;
}
