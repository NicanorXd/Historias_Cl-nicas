import { ServiceEntity } from './service.entity';
import { ServiceCreateParams } from './service.params';

export class ServiceValue implements ServiceEntity {
  constructor(params: ServiceCreateParams) {
    this.description = params.description;
    this.state = true;
  }

  id: number;
  description: string;
  state: boolean;
}
