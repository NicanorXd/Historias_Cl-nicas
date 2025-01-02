import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { TratamientoRepository } from '../../domain/tratamiento.repository';
import {
  TratamientoCreateParams,
  TratamientoFindParams,
} from '../../domain/tratamiento.params';
import { TratamientoEntity } from '../../domain/tratamiento.entity';
import { TratamientoMysqlSchema } from '../schema/tratamiendo-mysql.schema';

@Injectable()
export class TratamientoMysqlRepository
  extends PersistenceMysqlRepository
  implements TratamientoRepository
{
  constructor(
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async createTratamiento(
    params: TratamientoCreateParams,
  ): Promise<TratamientoEntity> {
    const repository = this.manager.getRepository(TratamientoMysqlSchema);
    const payload = repository.create(params);
    return repository.save(payload);
  }

  async deleteTratamiento(params: TratamientoFindParams): Promise<boolean> {
    const repository = this.manager.getRepository(TratamientoMysqlSchema);
    const { affected } = await repository.delete(params);
    return affected > 0;
  }
}
