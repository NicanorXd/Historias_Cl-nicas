import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TratamientoEntity } from '../../domain/tratamiento.entity';
import { OfficeMysqlSchema } from 'src/modules/office/infrastructure/schema/office-mysql.schema';
import { OfficeEntity } from 'src/modules/office/domain/office.entity';
import { PresentationMysqlSchema } from 'src/modules/presentation/infrastructure/schema/presentation-mysql.schema';
import { PresentationEntity } from 'src/modules/presentation/domain/presentation.entity';
import { AdministrationEntity } from 'src/modules/administration/domain/administration.entity';
import { AdministrationMysqlSchema } from 'src/modules/administration/infrastructure/schema/administration-mysql.schema';

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
  presentationId: number;

  @Column()
  dosis: string;

  @Column()
  frequency: string;

  @Column()
  administrationId: number;

  @Column()
  duration: string;

  @ManyToOne(() => OfficeMysqlSchema, (office) => office.diagnosis)
  office: OfficeEntity;

  @ManyToOne(
    () => PresentationMysqlSchema,
    (presentation) => presentation.tratamientos,
  )
  presentation: PresentationEntity;

  @ManyToOne(
    () => AdministrationMysqlSchema,
    (administration) => administration.tratamientos,
  )
  administration: AdministrationEntity;
}
