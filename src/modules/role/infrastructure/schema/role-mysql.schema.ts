import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../../domain/role.entity';
import { UserMysqlSchema } from 'src/modules/user/infrastructure/schema/user-mysql.schema';
import { UserEntity } from 'src/modules/user/domain/user.entity';

@Entity('roles')
export class RoleMysqlSchema implements RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  icon: string;

  @Column({ default: false })
  isRoot: boolean;

  @Column({ type: Boolean })
  state: boolean;

  @OneToMany(() => UserMysqlSchema, (user) => user.role)
  users: UserEntity[];
}
