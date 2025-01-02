import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { ProfessionSelectMysqlQuery } from './query/profession-select-mysql.query';
import { ProfessionRepository } from '../../domain/profession.repository';
import { professionMysqlProviderName } from '../schema/profession-persistence.provider';
import { ProfessionMysqlSchema } from '../schema/profession-mysql.schema';
import { ProfessionEntity } from '../../domain/profession.entity';

@Injectable()
export class ProfessionMysqlRepository
  extends PersistenceMysqlRepository
  implements ProfessionRepository
{
  constructor(
    @Inject(professionMysqlProviderName)
    private repository: Repository<ProfessionMysqlSchema>,
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async listProfessions(): Promise<ProfessionEntity[]> {
    const repository = this.manager.getRepository(ProfessionMysqlSchema);
    return new ProfessionSelectMysqlQuery(repository).query().getMany();
  }
}
