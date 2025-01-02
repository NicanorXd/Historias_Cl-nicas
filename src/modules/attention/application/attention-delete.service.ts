import { AttentionFindParams } from '../domain/attention.params';
import { AttentionRepository } from '../domain/attention.repository';

export class AttentionDeleteService {
  constructor(private attentionRepository: AttentionRepository) {}

  async execute(params: AttentionFindParams) {
    const data = await this.attentionRepository.findAttention(params);
    if (!data) throw new Error('El registro no existe!!!');
    return this.attentionRepository.deleteAttention({
      id: data.id,
    });
  }
}
