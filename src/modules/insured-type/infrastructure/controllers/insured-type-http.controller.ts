import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InsuredTypeListService } from '../../application/insured-type-list.service';
import { InsuredTypeMysqlRepository } from '../repository/insured-type-mysql-repository';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';

@ApiTags('insured-types')
@Controller('insured-types')
export class InsuredTypeHttpController {
  constructor(private insuredTypeRepository: InsuredTypeMysqlRepository) {}

  @Get()
  async listInsuredTypes() {
    const service = new InsuredTypeListService(this.insuredTypeRepository);
    return service.execute().catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }
}
