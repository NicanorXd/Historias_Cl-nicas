import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { AuthEntity } from '../../domain/auth.entity';
import { AuthValidateUser } from '../../domain/auth.params';
import { AuthRepository } from '../../domain/auth.repository';
import { UserMysqlRepository } from 'src/modules/user/infrastructure/repository/user-mysql-repository';

@Injectable()
export class AuthLocalRepository implements AuthRepository {
  constructor(
    private userRepository: UserMysqlRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(params: AuthValidateUser): Promise<UserEntity> {
    const user = await this.userRepository.findUser({
      username: params.username,
    });
    // validar usuario
    if (!user) throw new UnauthorizedException('errors.authUser');
    // validar contraseña
    const isSame = bcrypt.compareSync(params.password, user.password);
    if (!isSame) throw new UnauthorizedException('errors.authPassword');
    // response
    return user;
  }

  async login(user: UserEntity): Promise<string> {
    // validar estado
    if (!user.state) throw new UnauthorizedException('errors.authInactive');
    // payload login
    const payload = {
      sub: user.id,
      username: user.username,
      roleId: user.roleId,
    };
    // response
    return this.jwtService.sign(payload);
  }

  async identify(request: AuthEntity): Promise<UserEntity> {
    return this.userRepository.findUser({
      id: request.userId,
    });
  }
}
