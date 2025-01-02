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
import { ServiceMysqlRepository } from '../repository/service-mysql-repository';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';
import { ServicePaginateService } from '../../application/service-paginate.service';
import { ServiceFindParams } from '../../domain/service.params';
import { ServiceCreateService } from '../../application/service-create.service';
import { ServiceFindService } from '../../application/service-find.service';
import { ServiceEditService } from '../../application/service-edit.service';
import { ServiceDeleteService } from '../../application/service-delete.service';
import { ServicePaginateDto } from './dtos/service-paginate.dto';
import { ServiceCreateDto } from './dtos/service-create.dto';
import { ServiceEditDto } from './dtos/service-edit.dto';

@ApiTags('services')
@Controller('services')
export class ServiceHttpController {
  constructor(private serviceRepository: ServiceMysqlRepository) {}

  @Get()
  async paginateServices(@Query() query: ServicePaginateDto) {
    const service = new ServicePaginateService(this.serviceRepository);
    return service.execute(query).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Post()
  async createService(@Body() payload: ServiceCreateDto) {
    const service = new ServiceCreateService(this.serviceRepository);
    return service.execute(payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Get(':id')
  async findService(@Param() params: ServiceFindParams) {
    const service = new ServiceFindService(this.serviceRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Put(':id')
  async editService(
    @Param() params: ServiceFindParams,
    @Body() payload: ServiceEditDto,
  ) {
    const service = new ServiceEditService(this.serviceRepository);
    return service.execute(params, payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Delete(':id')
  async deleteService(@Param() params: ServiceFindParams) {
    const service = new ServiceDeleteService(this.serviceRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }
}
