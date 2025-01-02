import { AnamnesisEntity } from './anamnesis.entity';
import { AnamnesisCreateParams } from './anamnesis.params';

export class AnamnesisValue implements AnamnesisEntity {
  id: number;
  officeId: number;
  timeSick: string;
  reason: string;
  illnessStory: string;
  biological: string;
  background: string;

  constructor(params: AnamnesisCreateParams) {
    this.officeId = params.officeId;
    this.timeSick = params.timeSick;
    this.reason = params.reason;
    this.illnessStory = params.illnessStory;
    this.biological = params.biological;
    this.background = params.background;
  }
}
