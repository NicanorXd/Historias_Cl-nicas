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
import { RoleListService } from '../../application/role-list.service';
import { RoleMysqlRepository } from '../repository/role-mysql-repository';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';
import { RoleListDto } from './dtos/role-list.dto';
import { RoleCreateService } from '../../application/role-create.service';
import { RoleCreateDto } from './dtos/role-create.dto';
import { RoleFindService } from '../../application/role-find.service';
import { RoleFindParams } from '../../domain/role.params';
import { RoleEditService } from '../../application/role-edit.service';
import { RoleDeleteService } from '../../application/role-delete.service';
import { RoleEditDto } from './dtos/role-edit.dto';
import { RolePermissionListService } from '../../application/role-permission-list.service';
import { PermissionMysqlRepository } from 'src/modules/permission/infrastructure/repository/permission-mysql-repository';
import { RolePermissionSaveService } from '../../application/role-permission-save.service';
import { RolePermissionSaveDto } from './dtos/role-permission-save.dto';

@ApiTags('roles')
@Controller('roles')
export class RoleHttpController {
  constructor(
    private roleRepository: RoleMysqlRepository,
    private permissionRepository: PermissionMysqlRepository,
  ) {}

  @Get()
  async listRoles(@Query() query: RoleListDto) {
    const service = new RoleListService(this.roleRepository);
    return service.execute(query).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Post()
  async createRole(@Body() payload: RoleCreateDto) {
    const service = new RoleCreateService(this.roleRepository);
    return service.execute(payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Get(':id')
  async findRole(@Param() params: RoleFindParams) {
    const service = new RoleFindService(this.roleRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Put(':id')
  async editRole(
    @Param() params: RoleFindParams,
    @Body() payload: RoleEditDto,
  ) {
    const service = new RoleEditService(this.roleRepository);
    return service.execute(params, payload).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Delete(':id')
  async deleteRole(@Param() params: RoleFindParams) {
    const service = new RoleDeleteService(this.roleRepository);
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Get(':id/permissions')
  async permissionList(@Param() params: RoleFindParams) {
    const service = new RolePermissionListService(
      this.roleRepository,
      this.permissionRepository,
    );
    return service.execute(params).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Post(':id/permissions')
  async permissionSave(
    @Param() params: RoleFindParams,
    @Body() payload: RolePermissionSaveDto,
  ) {
    const service = new RolePermissionSaveService(
      this.roleRepository,
      this.permissionRepository,
    );
    return service.execute(params, payload.permissions).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }
}
