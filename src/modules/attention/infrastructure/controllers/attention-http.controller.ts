import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttentionPaginateDto } from './dtos/attention-paginate.dto';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';
import { AttentionMysqlRepository } from '../repository/attention-mysql-repository';
import { AttentionCreateService } from '../../application/attention-create.service';
import { AttentionDeleteService } from '../../application/attention-delete.service';
import { AttentionPaginateService } from '../../application/attention-paginate.service';
import { AttentionFindParams } from '../../domain/attention.params';
import { AttentionCreateDto } from './dtos/attention-create.dto';
import { AttentionEditDto } from './dtos/attention-edit.dto';
import { AttentionEditService } from '../../application/attention-edit.service';
import { MedicalConsultationMysqlRepository } from 'src/modules/medical-consultation/infrastructure/repository/medical-consultation-mysql-repository';

@ApiTags('attention')
@Controller('attention')
export class AttentionHttpController {
  constructor(
    private attentionRepository: AttentionMysqlRepository,
    private medicalConsultationRepository: MedicalConsultationMysqlRepository,
  ) {}

  @Get()
  async paginateAttentions(@Query() query: AttentionPaginateDto) {
    const service = new AttentionPaginateService(this.attentionRepository);
    return service.execute(query).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Post()
  async createAttention(@Body() payload: AttentionCreateDto) {
    const service = new AttentionCreateService(
      this.attentionRepository,
      this.medicalConsultationRepository,
    );
    return service.execute(payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Put(':id')
  async editAttention(
    @Param() params: AttentionFindParams,
    @Body() payload: AttentionEditDto,
  ) {
    const service = new AttentionEditService(this.attentionRepository);
    return service.execute(params, payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Delete(':id')
  async deleteAttention(@Param() params: AttentionFindParams) {
    const service = new AttentionDeleteService(this.attentionRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }
}
