import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthLocalRepository } from '../repository/auth-local.repository';
import { HttpExceptionCustom } from 'src/shared/http/infrastructure/exceptions/http.exception';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthLoginService } from '../../application/auth-login.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthUserDecorador } from '../decoradors/auth-user.decorador';
import { AuthHttpGuard } from '../guards/auth-http.guard';
import { AuthEntity } from '../../domain/auth.entity';
import { AuthProfileService } from '../../application/auth-profile.service';
import { PermissionMysqlRepository } from 'src/modules/permission/infrastructure/repository/permission-mysql-repository';

@ApiTags('auth')
@Controller('auth')
export class AuthHttpController {
  constructor(
    private authRepository: AuthLocalRepository,
    private permissionRepository: PermissionMysqlRepository,
  ) {}

  @Post('login')
  async login(@Body() params: AuthLoginDto) {
    const service = new AuthLoginService(this.authRepository);
    return service
      .execute(params)
      .then((token) => ({ token }))
      .catch((err) => {
        throw new HttpExceptionCustom(err);
      });
  }

  @Get('profile')
  @UseGuards(AuthHttpGuard)
  async profile(@AuthUserDecorador() auth: AuthEntity) {
    const service = new AuthProfileService(
      this.authRepository,
      this.permissionRepository,
    );
    return service.execute(auth).catch((err) => {
      throw new HttpExceptionCustom(err);
    });
  }

  @Get('validate')
  @UseGuards(AuthHttpGuard)
  async validate(@AuthUserDecorador() auth: AuthEntity) {
    return auth;
  }
}
