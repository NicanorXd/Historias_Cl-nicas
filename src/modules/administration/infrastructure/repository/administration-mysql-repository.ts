import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { AdministrationMysqlSchema } from '../schema/administration-mysql.schema';
import { AdministrationSelectMysqlQuery } from './query/administration-select-mysql.query';
import { AdministrationRepository } from '../../domain/administration.repository';
import { AdministrationEntity } from '../../domain/administration.entity';

@Injectable()
export class AdministrationMysqlRepository
  extends PersistenceMysqlRepository
  implements AdministrationRepository
{
  constructor(
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async listAdministrations(): Promise<AdministrationEntity[]> {
    const repository = this.manager.getRepository(AdministrationMysqlSchema);
    return new AdministrationSelectMysqlQuery(repository).query().getMany();
  }
}
