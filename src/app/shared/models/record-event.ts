export interface RecordEvent {
  id: number;
  action: 'opened' | 'favourited' | 'deleted';
}
