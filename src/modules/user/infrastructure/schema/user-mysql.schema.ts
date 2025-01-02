import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../domain/user.entity';
import { RoleEntity } from 'src/modules/role/domain/role.entity';
import { RoleMysqlSchema } from 'src/modules/role/infrastructure/schema/role-mysql.schema';
import { WorkerMysqlSchema } from 'src/modules/worker/infrastructure/schema/worker-mysql.schema';
import { WorkerEntity } from 'src/modules/worker/domain/worker.entity';

@Entity('users')
export class UserMysqlSchema implements UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  workerId: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  roleId: number;

  @Column({ type: Boolean })
  state: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => RoleMysqlSchema, (role) => role.users)
  role: RoleEntity;

  @OneToOne(() => WorkerMysqlSchema, (worker) => worker.user)
  @JoinColumn({ name: 'workerId' })
  worker: WorkerEntity;
}
