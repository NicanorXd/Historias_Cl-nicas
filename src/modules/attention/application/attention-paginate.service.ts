import { AttentionPaginateParams } from '../domain/attention.params';
import { AttentionRepository } from '../domain/attention.repository';

export class AttentionPaginateService {
  constructor(private attentionRepository: AttentionRepository) {}

  async execute(params: AttentionPaginateParams) {
    return this.attentionRepository.paginateAttentions(params);
  }
}
