import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MedicalConsultationPaginateDto } from './dtos/medical-consultation-paginate.dto';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';
import { MedicalConsultationMysqlRepository } from '../repository/medical-consultation-mysql-repository';
import { MedicalConsultationCreateService } from '../../application/medical-consultation-create.service';
import { MedicalConsultationDeleteService } from '../../application/medical-consultation-delete.service';
import { MedicalConsultationPaginateService } from '../../application/medical-consultation-paginate.service';
import { MedicalConsultationFindParams } from '../../domain/medical-consultation.params';
import { MedicalConsultationCreateDto } from './dtos/medical-consultation-create.dto';

@ApiTags('medicalConsultation')
@Controller('medicalConsultation')
export class MedicalConsultationHttpController {
  constructor(
    private medicalConsultationRepository: MedicalConsultationMysqlRepository,
  ) {}

  @Get()
  async paginateDiagnoses(@Query() query: MedicalConsultationPaginateDto) {
    const service = new MedicalConsultationPaginateService(
      this.medicalConsultationRepository,
    );
    return service.execute(query).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Post()
  async createMedicalConsultation(
    @Body() payload: MedicalConsultationCreateDto,
  ) {
    const service = new MedicalConsultationCreateService(
      this.medicalConsultationRepository,
    );
    return service.execute(payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Delete(':id')
  async deleteMedicalConsultation(
    @Param() params: MedicalConsultationFindParams,
  ) {
    const service = new MedicalConsultationDeleteService(
      this.medicalConsultationRepository,
    );
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }
}
