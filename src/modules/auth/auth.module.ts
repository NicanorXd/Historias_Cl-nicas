import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PersistenceModule } from 'src/shared/persistence/persistence.module';
import { UserModule } from '../user/user.module';
import { AuthHttpGuard } from './infrastructure/guards/auth-http.guard';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { AuthLocalRepository } from './infrastructure/repository/auth-local.repository';
import { AuthHttpController } from './infrastructure/controllers/auth-http.controller';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    PersistenceModule,
    ConfigModule,
    forwardRef(() => UserModule),
    PassportModule,
    PermissionModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET', 'dev'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: [AuthLocalRepository, JwtStrategy, AuthHttpGuard],
  exports: [AuthHttpGuard],
  controllers: [AuthHttpController],
})
export class AuthModule {}
