import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';
import { ProfessionMysqlRepository } from '../repository/profession-mysql-repository';
import { ProfessionListService } from '../../application/profession-list.service';

@ApiTags('professions')
@Controller('professions')
export class ProfessionHttpController {
  constructor(private professionRepository: ProfessionMysqlRepository) {}

  @Get()
  async listProfessions() {
    const service = new ProfessionListService(this.professionRepository);
    return service.execute().catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }
}
