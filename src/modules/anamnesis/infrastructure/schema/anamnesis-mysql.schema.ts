import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnamnesisEntity } from '../../domain/anamnesis.entity';
import { OfficeMysqlSchema } from 'src/modules/office/infrastructure/schema/office-mysql.schema';
import { OfficeEntity } from 'src/modules/office/domain/office.entity';

@Entity('anamnesis')
export class AnamensisMysqlSchema implements AnamnesisEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  officeId: number;

  @Column()
  timeSick: string;

  @Column()
  reason: string;

  @Column()
  illnessStory: string;

  @Column()
  biological: string;

  @Column()
  background: string;

  @OneToOne(() => OfficeMysqlSchema, (office) => office.anamnesis)
  @JoinColumn()
  office: OfficeEntity;
}
