import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { MedicineSelectMysqlQuery } from './query/medicine-select-mysql.query';
import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { MedicineRepository } from '../../domain/medicine.repository';
import { MedicinePaginateParams } from '../../domain/medicine.params';
import { MedicineEntity } from '../../domain/medicine.entity';
import { MedicineMysqlSchema } from '../schema/medicine-mysql.schema';

@Injectable()
export class MedicineMysqlRepository
  extends PersistenceMysqlRepository
  implements MedicineRepository
{
  constructor(
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async paginateMedicines(
    params: MedicinePaginateParams,
  ): Promise<PaginateEntity<MedicineEntity>> {
    const repository = this.manager.getRepository(MedicineMysqlSchema);
    const queryBuilder = new MedicineSelectMysqlQuery(repository).query(params);
    return paginate(queryBuilder, { page: params.page, limit: params.limit });
  }
}
