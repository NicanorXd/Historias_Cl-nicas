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
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';
import { PatientPaginateService } from '../../application/patient-paginate.service';
import { PatientMysqlRepository } from '../repository/patient-mysql-repository';
import { PatientPaginateDto } from './dtos/patient-paginate.dto';
import { PatientFindService } from '../../application/patient-find.service';
import { PatientFindParams } from '../../domain/patient.params';
import { PatientCreateService } from '../../application/patient-create.service';
import { PatientCreateDto } from './dtos/patient-create.dto';
import { PatientDeleteService } from '../../application/patient-delete.service';
import { PatientEditService } from '../../application/patient-edit.service';
import { PatientEditDto } from './dtos/patient-edit.dto';

@ApiTags('patients')
@Controller('patients')
export class PatientHttpController {
  constructor(private patientRepository: PatientMysqlRepository) {}

  @Get()
  async paginatePatients(@Query() query: PatientPaginateDto) {
    const service = new PatientPaginateService(this.patientRepository);
    return service.execute(query).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Post()
  async createPatient(@Body() payload: PatientCreateDto) {
    const service = new PatientCreateService(this.patientRepository);
    return service.execute(payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Get(':id')
  async findPatient(@Param() params: PatientFindParams) {
    const service = new PatientFindService(this.patientRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Put(':id')
  async editRole(
    @Param() params: PatientFindParams,
    @Body() payload: PatientEditDto,
  ) {
    const service = new PatientEditService(this.patientRepository);
    return service.execute(params, payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Delete(':id')
  async deleteRole(@Param() params: PatientFindParams) {
    const service = new PatientDeleteService(this.patientRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }
}
