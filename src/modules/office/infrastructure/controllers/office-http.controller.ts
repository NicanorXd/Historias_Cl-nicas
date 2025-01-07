import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { OfficeMysqlRepository } from '../repository/office-mysql-repository';
import { OfficeCreateService } from '../../application/office-create.service';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';
import { OfficeCreateDto } from './dtos/office-create.dto';
import { AnamnesisMysqlRepository } from 'src/modules/anamnesis/infrastructure/repository/anamnesis-mysql-repository';
import { DiagnosisDetailMysqlRepository } from 'src/modules/diagnosis-detail/infrastructure/repository/diagnosis-detail-repository';
import { TratamientoMysqlRepository } from 'src/modules/tratamiento/infrastructure/repository/tratamiento-repository';
import { OfficePaginateService } from '../../application/office-paginate.service';
import { OfficePaginateDto } from './dtos/office-paginate.dto';
import { OfficeFindParams } from '../../domain/office.params';
import { OfficeEditService } from '../../application/office-edit.service';
import { OfficeEditDto } from './dtos/office-edit.dto';
import { AttentionMysqlRepository } from 'src/modules/attention/infrastructure/repository/attention-mysql-repository';
import { OfficeFindService } from '../../application/office-find.service';
import { OfficeHistoryHtmlReport } from '../reports/office-history-html.report';
import { ApiTags } from '@nestjs/swagger';
import { OfficeRecetaHtmlReport } from '../reports/office-receta-html.report';

@ApiTags('office')
@Controller('office')
export class OfficeHttpController {
  constructor(
    private officeRepository: OfficeMysqlRepository,
    private anamnesisRepository: AnamnesisMysqlRepository,
    private diagnosisDetailRepository: DiagnosisDetailMysqlRepository,
    private tratamientoRepository: TratamientoMysqlRepository,
    private attentionRepository: AttentionMysqlRepository,
    private officeHistoryReport: OfficeHistoryHtmlReport,
    private officeRecetaHtmlReport: OfficeRecetaHtmlReport,
  ) {}

  @Get()
  async paginate(@Query() query: OfficePaginateDto) {
    const service = new OfficePaginateService(this.officeRepository);
    return service.execute(query).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Post()
  async store(@Body() payload: OfficeCreateDto) {
    const service = new OfficeCreateService(
      this.officeRepository,
      this.anamnesisRepository,
      this.diagnosisDetailRepository,
      this.tratamientoRepository,
      this.attentionRepository,
    );
    return service.execute(payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Get(':id')
  async show(@Param() params: OfficeFindParams) {
    const service = new OfficeFindService(this.officeRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Put(':id')
  async update(
    @Param() params: OfficeFindParams,
    @Body() payload: OfficeEditDto,
  ) {
    const service = new OfficeEditService(
      this.officeRepository,
      this.anamnesisRepository,
      this.diagnosisDetailRepository,
      this.tratamientoRepository,
    );
    return service.execute(params, payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Get(':id/history.html')
  async historyHtml(@Param() params: OfficeFindParams) {
    return this.officeHistoryReport
      .execute(params)
      .then((data) => new StreamableFile(data.buffer, { type: data.type }))
      .catch((err) => {
        throw new HttpExceptionCustom(err);
      });
  }

  @Get(':id/receta.html')
  async recetaHtml(@Param() params: OfficeFindParams) {
    return this.officeRecetaHtmlReport
      .execute(params)
      .then((data) => new StreamableFile(data.buffer, { type: data.type }))
      .catch((err) => {
        throw new HttpExceptionCustom(err);
      });
  }
}
