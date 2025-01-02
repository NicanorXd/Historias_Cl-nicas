import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdministrationListService } from '../../application/administration-list.service';
import { AdministrationMysqlRepository } from '../repository/administration-mysql-repository';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';

@ApiTags('administration')
@Controller('administration')
export class AdministrationHttpController {
  constructor(
    private administrationRepository: AdministrationMysqlRepository,
  ) {}

  @Get()
  async listInsuredTypes() {
    const service = new AdministrationListService(
      this.administrationRepository,
    );
    return service.execute().catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }
}
