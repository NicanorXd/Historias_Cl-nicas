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
import { UserMysqlRepository } from '../repository/user-mysql-repository';
import { UserCreateService } from '../../application/user-create.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';
import { ApiTags } from '@nestjs/swagger';
import { UserPaginteService } from '../../application/user-paginate.service';
import { UserPaginateDto } from './dtos/user-paginate.dto';
import { UserFindParams } from '../../domain/user.params';
import { UserEditDto } from './dtos/user-edit.dto';
import { UserEditService } from '../../application/user-edit.service';
import { UserFindService } from '../../application/user-find.service';
import { UserChangePasswordService } from '../../application/user-change-password.service';
import { UserChangePasswordDto } from './dtos/user-change-password.dto';
import { UserDeleteService } from '../../application/user-delete.service';
import { WorkerMysqlRepository } from 'src/modules/worker/infrastructure/repository/worker-mysql-repository';

@ApiTags('users')
@Controller('users')
export class UserHttpController {
  constructor(
    private userRepository: UserMysqlRepository,
    private workerRepository: WorkerMysqlRepository,
  ) {}

  @Get()
  async index(@Query() params: UserPaginateDto) {
    const service = new UserPaginteService(this.userRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Post()
  async store(@Body() payload: UserCreateDto) {
    const service = new UserCreateService(this.userRepository);
    return service.execute(payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Get(':id')
  async show(@Param() params: UserFindParams) {
    const service = new UserFindService(this.userRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Put(':id')
  async update(@Param() params: UserFindParams, @Body() payload: UserEditDto) {
    const service = new UserEditService(this.userRepository);
    return service.execute(params, payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Delete(':id')
  async delete(@Param() params: UserFindParams) {
    const service = new UserDeleteService(
      this.userRepository,
      this.workerRepository,
    );
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Put(':id/changePassword')
  async changePassword(
    @Param() params: UserFindParams,
    @Body() payload: UserChangePasswordDto,
  ) {
    const service = new UserChangePasswordService(this.userRepository);
    return service.execute(params, payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }
}
