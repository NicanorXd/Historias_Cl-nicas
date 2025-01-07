import { PaginateEntity } from 'src/shared/persistence/domain/paginate.entity';
import { MedicinePaginateParams } from './medicine.params';
import { MedicineEntity } from './medicine.entity';

export interface MedicineRepository {
  paginateMedicines(
    params: MedicinePaginateParams,
  ): Promise<PaginateEntity<MedicineEntity>>;
}
