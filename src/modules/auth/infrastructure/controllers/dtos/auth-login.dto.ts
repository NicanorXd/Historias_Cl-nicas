import zod from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { AuthValidateUser } from 'src/modules/auth/domain/auth.params';
import { userPasswordMinConstans } from 'src/modules/user/domain/user.constans';

const authLoginSchema = zod.object({
  username: zod.string(),
  password: zod.string().min(userPasswordMinConstans),
});

export class AuthLoginDto
  extends createZodDto(authLoginSchema)
  implements AuthValidateUser
{
  username: string;
  password: string;
}
