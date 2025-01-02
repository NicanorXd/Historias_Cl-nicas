import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { InsuredTypeRepository } from '../../domain/insured-type.repository';
import { insuredTypeMysqlProviderName } from '../schema/insured-type-persistence.provider';
import { InsuredTypeMysqlSchema } from '../schema/insured-type-mysql.schema';
import { InsuredTypeEntity } from '../../domain/insured-type.entity';
import { InsuredTypeSelectMysqlQuery } from './query/insured-type-select-mysql.query';

@Injectable()
export class InsuredTypeMysqlRepository
  extends PersistenceMysqlRepository
  implements InsuredTypeRepository
{
  constructor(
    @Inject(insuredTypeMysqlProviderName)
    private repository: Repository<InsuredTypeMysqlSchema>,
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async listInsuredTypes(): Promise<InsuredTypeEntity[]> {
    const repository = this.manager.getRepository(InsuredTypeMysqlSchema);
    return new InsuredTypeSelectMysqlQuery(repository).query().getMany();
  }
}
