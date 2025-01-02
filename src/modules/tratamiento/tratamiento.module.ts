import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { TratamientoMysqlRepository } from './infrastructure/repository/tratamiento-repository';

@Module({
  imports: [PersistenceModule],
  providers: [TratamientoMysqlRepository],
  exports: [TratamientoMysqlRepository],
})
export class TratamientoModule {}
