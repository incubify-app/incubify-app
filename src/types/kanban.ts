import { Incubator } from './incubator';

export type Kanban = {
  id: string;
  incubator_id: Incubator['id'];
}