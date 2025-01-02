import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import {
  userPasswordMaxConstans,
  userPasswordMinConstans,
  userUsernameMaxConstans,
  userUsernameMinConstans,
} from 'src/modules/user/domain/user.constans';
import { UserEditParams } from 'src/modules/user/domain/user.params';
import zod from 'zod';

const userEditSchema = zod.object({
  workerId: zod.number(),
  roleId: zod.number(),
  username: zod
    .string()
    .min(userUsernameMinConstans)
    .max(userUsernameMaxConstans),
  password: zod
    .string()
    .min(userPasswordMinConstans)
    .max(userPasswordMaxConstans)
    .optional(),
  state: zod.boolean(),
});

export class UserEditDto
  extends createZodDto(userEditSchema)
  implements UserEditParams
{
  @Transform(({ value }) => parseInt(`${value}`))
  workerId: number;

  @Transform(({ value }) => parseInt(`${value}`))
  roleId: number;

  @Transform(({ value }) => (value ? value : undefined))
  password?: string;
}
