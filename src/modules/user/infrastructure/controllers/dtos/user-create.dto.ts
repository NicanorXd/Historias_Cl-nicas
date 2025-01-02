import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import {
  userPasswordMaxConstans,
  userPasswordMinConstans,
  userUsernameMaxConstans,
  userUsernameMinConstans,
} from 'src/modules/user/domain/user.constans';
import { UserCreateParams } from 'src/modules/user/domain/user.params';
import zod from 'zod';

const userCreateSchema = zod.object({
  workerId: zod.number(),
  roleId: zod.number(),
  username: zod
    .string()
    .min(userUsernameMinConstans)
    .max(userUsernameMaxConstans),
  password: zod
    .string()
    .min(userPasswordMinConstans)
    .max(userPasswordMaxConstans),
});

export class UserCreateDto
  extends createZodDto(userCreateSchema)
  implements UserCreateParams
{
  @Transform(({ value }) => parseInt(`${value}`))
  workerId: number;

  @Transform(({ value }) => parseInt(`${value}`))
  roleId: number;

  username: string;
  password: string;
}
