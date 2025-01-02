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
import { WorkerMysqlRepository } from '../repository/worker-mysql-repository';
import { WorkerPaginateService } from '../../application/worker-paginate.service';
import { WorkerFindParams } from '../../domain/worker.params';
import { WorkerDeleteService } from '../../application/worker-delete.service';
import { WorkerEditService } from '../../application/worker-edit.service';
import { WorkerFindService } from '../../application/worker-find.service';
import { WorkerCreateService } from '../../application/worker-create.service';
import { WorkerPaginateDto } from './dtos/worker-paginate.dto';
import { WorkerCreateDto } from './dtos/worker-create.dto';
import { WorkerEditDto } from './dtos/worker-edit.dto';
import { UserMysqlRepository } from 'src/modules/user/infrastructure/repository/user-mysql-repository';

@ApiTags('workers')
@Controller('workers')
export class WorkerHttpController {
  constructor(
    private workerRepository: WorkerMysqlRepository,
    private userRepository: UserMysqlRepository,
  ) {}

  @Get()
  async paginateWorkers(@Query() query: WorkerPaginateDto) {
    const service = new WorkerPaginateService(this.workerRepository);
    return service.execute(query).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Post()
  async createWorker(@Body() payload: WorkerCreateDto) {
    const service = new WorkerCreateService(
      this.workerRepository,
      this.userRepository,
    );
    return service.execute(payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Get(':id')
  async findWorker(@Param() params: WorkerFindParams) {
    const service = new WorkerFindService(this.workerRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Put(':id')
  async editWorker(
    @Param() params: WorkerFindParams,
    @Body() payload: WorkerEditDto,
  ) {
    const service = new WorkerEditService(
      this.workerRepository,
      this.userRepository,
    );
    return service.execute(params, payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Delete(':id')
  async deleteWorker(@Param() params: WorkerFindParams) {
    const service = new WorkerDeleteService(
      this.workerRepository,
      this.userRepository,
    );
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }
}
