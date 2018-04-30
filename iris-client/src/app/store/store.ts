import {
  createStore,
  applyMiddleware,
  compose,
  GenericStoreEnhancer
} from 'redux';
import { rootReducer } from './reducers';

declare var window: any;
const devToolsExtension: GenericStoreEnhancer = window.devToolsExtension
  ? window.devToolsExtension()
  : f => f;

export const store = createStore(rootReducer, compose(devToolsExtension) as GenericStoreEnhancer);

