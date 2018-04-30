import { IRecord } from './IRecord';

export interface IAppState {
    records: IRecord[];
}

export const INITIAL_STATE: IAppState = {
  records: []
};
