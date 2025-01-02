import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PresentationListService } from '../../application/presentation-list.service';
import { PresentationMysqlRepository } from '../repository/presentation-mysql-repository';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';

@ApiTags('presentation')
@Controller('presentation')
export class PresentationHttpController {
  constructor(private representationRepository: PresentationMysqlRepository) {}

  @Get()
  async listPresentations() {
    const service = new PresentationListService(this.representationRepository);
    return service.execute().catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }
}
