import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MedicineEntity } from '../../domain/medicine.entity';

@Entity('medicines')
export class MedicineMysqlSchema implements MedicineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: Boolean })
  state: boolean;
}
