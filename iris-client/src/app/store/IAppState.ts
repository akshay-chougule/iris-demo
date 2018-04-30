import { IUser } from './IUser';

export interface IAppState {
    users: IUser[];
}

export const INITIAL_STATE: IAppState = {
    users: []
};
