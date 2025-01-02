export interface AnamnesisFindParams {
  officeId?: number;
}

export interface AnamnesisCreateParams {
  officeId: number;
  timeSick: string;
  reason: string;
  illnessStory: string;
  biological: string;
  background: string;
}
