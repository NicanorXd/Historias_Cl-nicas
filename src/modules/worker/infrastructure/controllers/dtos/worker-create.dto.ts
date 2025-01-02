import { createZodDto } from '@anatine/zod-nestjs';
import { Transform } from 'class-transformer';
import {
  userPasswordMinConstans,
  userUsernameMaxConstans,
  userUsernameMinConstans,
} from 'src/modules/user/domain/user.constans';
import { WorkerCreateRequest } from 'src/modules/worker/application/worker-create.service';
import { WorkerGenderEnum } from 'src/modules/worker/domain/worker.enum';
import { WorkerCreateParams } from 'src/modules/worker/domain/worker.params';
import zod from 'zod';

const schema = zod.object({
  name: zod.string(),
  lastname: zod.string(),
  documentNumber: zod.string(),
  dateOfBirth: zod.string(),
  gender: zod.nativeEnum(WorkerGenderEnum),
  email: zod.string(),
  phone: zod.string(),
  ubigeoBirth: zod.string(),
  addressCurrent: zod.string(),
  professionId: zod.number(),
  tuitionNumber: zod.string(),
  roleId: zod.number(),
  username: zod
    .string()
    .min(userUsernameMinConstans)
    .max(userUsernameMaxConstans),
  password: zod.string().min(userPasswordMinConstans),
});

export class WorkerCreateDto
  extends createZodDto(schema)
  implements WorkerCreateRequest
{
  name: string;
  lastname: string;
  documentNumber: string;
  dateOfBirth: string;
  tuitionNumber: string;
  gender: WorkerGenderEnum;
  email: string;
  phone: string;
  ubigeoBirth: string;
  addressCurrent: string;

  @Transform(({ value }) => parseInt(`${value}`))
  professionId: number;

  username: string;
  password: string;

  @Transform(({ value }) => parseInt(`${value}`))
  roleId: number;
}
