import { createZodDto } from '@anatine/zod-nestjs';
import { userPasswordMinConstans } from 'src/modules/user/domain/user.constans';
import zod from 'zod';

const userChangePasswordSchema = zod.object({
  password: zod.string(),
  newPassword: zod.string().min(userPasswordMinConstans),
});

export class UserChangePasswordDto extends createZodDto(
  userChangePasswordSchema,
) {
  password: string;
  newPassword: string;
}
