import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { PermissionSelectMysqlQuery } from './query/permission-select-mysql.query';
import { PermissionRepository } from '../../domain/permission.repository';
import {
  PermissionFindParams,
  PermissionListParams,
} from '../../domain/permission.params';
import { PermissionEntity } from '../../domain/permission.entity';
import { PermissionMysqlSchema } from '../schema/permission-mysql.schema';
import { PermissionValue } from '../../domain/permission.value';

@Injectable()
export class PermissionMysqlRepository
  extends PersistenceMysqlRepository
  implements PermissionRepository
{
  constructor(
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async listPermissions(
    params: PermissionListParams,
  ): Promise<PermissionEntity[]> {
    const repository = this.manager.getRepository(PermissionMysqlSchema);
    return new PermissionSelectMysqlQuery(repository).query(params).getMany();
  }

  async findPermission(
    params: PermissionFindParams,
  ): Promise<PermissionEntity> {
    const repository = this.manager.getRepository(PermissionMysqlSchema);
    return new PermissionSelectMysqlQuery(repository).query(params).getOne();
  }

  async createPermission(value: PermissionValue): Promise<PermissionEntity> {
    const repository = this.manager.getRepository(PermissionMysqlSchema);
    const payload = repository.create(value);
    return repository.save(payload);
  }

  async deletePermission(params: PermissionFindParams): Promise<boolean> {
    const repository = this.manager.getRepository(PermissionMysqlSchema);
    const { affected } = await repository.delete(params);
    return affected > 0;
  }
}
