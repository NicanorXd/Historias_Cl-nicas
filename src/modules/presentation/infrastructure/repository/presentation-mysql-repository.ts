import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { PresentationMysqlSchema } from '../schema/presentation-mysql.schema';
import { PresentationSelectMysqlQuery } from './query/presentation-select-mysql.query';
import { PresentationRepository } from '../../domain/presentation.repository';
import { PresentationEntity } from '../../domain/presentation.entity';

@Injectable()
export class PresentationMysqlRepository
  extends PersistenceMysqlRepository
  implements PresentationRepository
{
  constructor(
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async listPresentations(): Promise<PresentationEntity[]> {
    const repository = this.manager.getRepository(PresentationMysqlSchema);
    return new PresentationSelectMysqlQuery(repository).query().getMany();
  }
}
