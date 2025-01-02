import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessionEntity } from '../../domain/profession.entity';
import { WorkerEntity } from 'src/modules/worker/domain/worker.entity';
import { WorkerMysqlSchema } from 'src/modules/worker/infrastructure/schema/worker-mysql.schema';

@Entity('professions')
export class ProfessionMysqlSchema implements ProfessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: Boolean })
  state: boolean;

  @OneToMany(() => WorkerMysqlSchema, (worker) => worker.profession)
  workers: WorkerEntity[];
}
