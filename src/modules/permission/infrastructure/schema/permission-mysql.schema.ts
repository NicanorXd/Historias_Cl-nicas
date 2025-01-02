import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionEntity } from '../../domain/permission.entity';
import { PermissionActionEnum } from '../../domain/permission.enum';

@Entity('permission')
export class PermissionMysqlSchema implements PermissionEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  roleId: number;

  @Column()
  action: PermissionActionEnum;

  @Column({ type: Boolean })
  state: boolean;
}
