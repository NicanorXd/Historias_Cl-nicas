import {
  AttentionEditParams,
  AttentionFindParams,
} from '../domain/attention.params';
import { AttentionRepository } from '../domain/attention.repository';

export class AttentionEditService {
  constructor(private attentionRepository: AttentionRepository) {}

  async execute(params: AttentionFindParams, payload: AttentionEditParams) {
    const data = await this.attentionRepository.findAttention(params);
    if (!data) throw new Error('El registro no existe!!!');
    const attentionParams = { id: data.id };
    return this.attentionRepository.editAttention(attentionParams, payload);
  }
}
