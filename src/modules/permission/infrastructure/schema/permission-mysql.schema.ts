import { Column, Entity, PrimaryColumn } from 'typeorm';
import { PermissionEntity } from '../../domain/permission.entity';
import { PermissionActionEnum } from '../../domain/permission.enum';

@Entity('permission')
export class PermissionMysqlSchema implements PermissionEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  roleId: number;

  @Column()
  action: PermissionActionEnum;
}
