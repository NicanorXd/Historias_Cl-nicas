import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DiagnosisEntity } from '../../domain/diagnosis.entity';
import { DiagnosisDetailMysqlSchema } from 'src/modules/diagnosis-detail/infrastructure/schema/diagnosis-detail-mysql.schema';
import { DiagnosisDetailEntity } from 'src/modules/diagnosis-detail/domain/diagnosis-detail.entity';

@Entity('diagnosis')
export class DiagnosisMysqlSchema implements DiagnosisEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cie10: string;

  @Column()
  description: string;

  @Column({ type: Boolean })
  state: boolean;

  @OneToMany(() => DiagnosisDetailMysqlSchema, (detail) => detail.diagnosis)
  diagnosisDetails: DiagnosisDetailEntity[];
}
