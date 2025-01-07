import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { medicineMysqlProvider } from './infrastructure/schema/medicine-persistence.provider';
import { MedicineMysqlRepository } from './infrastructure/repository/medicine-mysql-repository';

@Module({
  imports: [PersistenceModule],
  providers: [...medicineMysqlProvider, MedicineMysqlRepository],
  exports: [...medicineMysqlProvider, MedicineMysqlRepository],
})
export class MedicineModule {}
