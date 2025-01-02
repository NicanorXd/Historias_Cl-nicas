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
import { DiagnosisMysqlRepository } from '../repository/diagnosis-mysql-repository';
import { DiagnosisPaginateService } from '../../application/diagnosis-paginate.service';
import { DiagnosisPaginateDto } from './dtos/diagnosis-paginate.dto';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';
import { DiagnosisCreateService } from '../../application/diagnosis-create.service';
import { DiagnosisFindService } from '../../application/diagnosis-find.service';
import { DiagnosisFindParams } from '../../domain/diagnosis.params';
import { DiagnosisEditService } from '../../application/diagnosis-edit.service';
import { DiagnosisDeleteService } from '../../application/diagnosis-delete.service';
import { DiagnosisCreateDto } from './dtos/diagnosis-create.dto';
import { DiagnosisEditDto } from './dtos/diagnosis-edit.dto';

@ApiTags('diagnosis')
@Controller('diagnosis')
export class DiagnosisHttpController {
  constructor(private diagnosisRepository: DiagnosisMysqlRepository) {}

  @Get()
  async paginateDiagnoses(@Query() query: DiagnosisPaginateDto) {
    const service = new DiagnosisPaginateService(this.diagnosisRepository);
    return service.execute(query).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Post()
  async createDiagnosis(@Body() payload: DiagnosisCreateDto) {
    const service = new DiagnosisCreateService(this.diagnosisRepository);
    return service.execute(payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Get(':id')
  async findDiagnosis(@Param() params: DiagnosisFindParams) {
    const service = new DiagnosisFindService(this.diagnosisRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Put(':id')
  async editDiagnosis(
    @Param() params: DiagnosisFindParams,
    @Body() payload: DiagnosisEditDto,
  ) {
    const service = new DiagnosisEditService(this.diagnosisRepository);
    return service.execute(params, payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Delete(':id')
  async deleteDiagnosis(@Param() params: DiagnosisFindParams) {
    const service = new DiagnosisDeleteService(this.diagnosisRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }
}
