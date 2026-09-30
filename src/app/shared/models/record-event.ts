export interface RecordEvent {
  id: number | string;
  action: 'opened' | 'favourited';
}
