import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PersistenceMysqlRepository } from 'src/shared/persistence/infrastructure/repository/persistence-mysqlrepository';
import { PersistenceMysqlTypeormName } from 'src/shared/persistence/infrastructure/persistence-mysql.typeorm';
import { AnamnesisRepository } from '../../domain/anamnesis.repository';
import {
  AnamnesisCreateParams,
  AnamnesisFindParams,
} from '../../domain/anamnesis.params';
import { AnamnesisEntity } from '../../domain/anamnesis.entity';
import { AnamensisMysqlSchema } from '../schema/anamnesis-mysql.schema';

@Injectable()
export class AnamnesisMysqlRepository
  extends PersistenceMysqlRepository
  implements AnamnesisRepository
{
  constructor(
    @Inject(PersistenceMysqlTypeormName)
    connecion: DataSource,
  ) {
    super(connecion);
  }

  async createAnamnesis(
    params: AnamnesisCreateParams,
  ): Promise<AnamnesisEntity> {
    const repository = this.manager.getRepository(AnamensisMysqlSchema);
    const payload = repository.create(params);
    return repository.save(payload);
  }

  async deleteAnamnesis(params: AnamnesisFindParams): Promise<boolean> {
    const repository = this.manager.getRepository(AnamensisMysqlSchema);
    const { affected } = await repository.delete(params);
    return affected > 0;
  }
}
