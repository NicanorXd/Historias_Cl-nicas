import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import { UserPaginateParams } from 'src/modules/user/domain/user.params';
import zod from 'zod';

const userPaginateSchema = zod.object({
  page: zod.number(),
  limit: zod.number(),
  querySearch: zod.string().optional(),
  roleId: zod.number().optional(),
  state: zod.boolean().optional(),
});

export class UserPaginateDto
  extends createZodDto(userPaginateSchema)
  implements UserPaginateParams
{
  @Transform(({ value }) => parseInt(value))
  page: number;

  @Transform(({ value }) => parseInt(value))
  limit: number;

  @Transform(({ value }) => (!!value ? parseInt(value) : undefined))
  roleId: number;

  @Transform(({ value }) => (!!value ? JSON.parse(value) : undefined))
  state: boolean;

  querySearch?: string;
}
