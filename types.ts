
export interface Contact {
  name: string;
  phone: string;
}

export enum SendingStatus {
  IDLE = 'idle',
  SENDING = 'sending',
  PAUSED = 'paused',
  FINISHED = 'finished',
}
