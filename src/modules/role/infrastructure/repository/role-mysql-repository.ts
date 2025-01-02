import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { RoleRepository } from '../../domain/role.repository';
import { RoleMysqlSchema } from '../schema/role-mysql.schema';
import { roleMysqlProviderName } from '../schema/role-persistence.provider';
import { RoleEntity } from '../../domain/role.entity';
import {
  RoleListParams,
  RoleFindParams,
  RoleEditParams,
} from '../../domain/role.params';
import { RoleValue } from '../../domain/role.value';
import { RoleSelectMysqlQuery } from './query/role-select-mysql.query';

@Injectable()
export class RoleMysqlRepository
  extends PersistenceMysqlRepository
  implements RoleRepository
{
  constructor(
    @Inject(roleMysqlProviderName)
    private repository: Repository<RoleMysqlSchema>,
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async listRole(params: RoleListParams): Promise<RoleEntity[]> {
    const repository = this.manager.getRepository(RoleMysqlSchema);
    return new RoleSelectMysqlQuery(repository).query(params).getMany();
  }

  async findRole(params: RoleFindParams): Promise<RoleEntity> {
    const repository = this.manager.getRepository(RoleMysqlSchema);
    return new RoleSelectMysqlQuery(repository).query(params).getOne();
  }

  async createRole(value: RoleValue): Promise<RoleEntity> {
    const repository = this.manager.getRepository(RoleMysqlSchema);
    const payload = this.repository.create(value);
    return repository.save(payload);
  }

  async editRole(
    params: RoleFindParams,
    payload: RoleEditParams,
  ): Promise<boolean> {
    const repository = this.manager.getRepository(RoleMysqlSchema);
    const { affected } = await repository.update(params, payload);
    return affected > 0;
  }

  async deleteRole(params: RoleFindParams): Promise<boolean> {
    const repository = this.manager.getRepository(RoleMysqlSchema);
    const { affected } = await repository.delete(params);
    return affected > 0;
  }
}
