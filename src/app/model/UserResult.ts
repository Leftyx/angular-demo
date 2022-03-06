import { User } from './';
import { Info } from './Info';

export interface UserResult {
  results?: User[];
  info: Info;
}
