import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TratamientoEntity } from '../../domain/tratamiento.entity';
import { OfficeMysqlSchema } from 'src/modules/office/infrastructure/schema/office-mysql.schema';
import { OfficeEntity } from 'src/modules/office/domain/office.entity';

@Entity('tratamientos')
export class TratamientoMysqlSchema implements TratamientoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  officeId: number;

  @Column()
  description: string;

  @Column()
  medicamento: string;

  @Column()
  presentation: string;

  @Column()
  dosis: string;

  @Column()
  frequency: string;

  @Column()
  administration: string;

  @Column()
  duration: string;

  @ManyToOne(() => OfficeMysqlSchema, (office) => office.diagnosis)
  office: OfficeEntity;
}
