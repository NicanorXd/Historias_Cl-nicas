import { TratamientoEntity } from './tratamiento.entity';
import { PersistenceRepository } from 'src/shared/persistence/domain/persistence.repository';
import { TratamientoValue } from './tratamiento.value';
import { TratamientoFindParams } from './tratamiento.params';

export interface TratamientoRepository extends PersistenceRepository {
  createTratamiento(value: TratamientoValue): Promise<TratamientoEntity>;
  deleteTratamiento(params: TratamientoFindParams): Promise<boolean>;
}
