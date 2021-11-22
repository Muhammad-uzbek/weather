import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers';
import { cityEpic } from './epics/citiesEpic';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

const initialState = {
  choices: ['Tashkent', 'Namangan', 'Samarkand', 'Andijon', 'Bukhara', 'Fergana', 'Jizzakh', 'Karakalpakstan'],
  loading: false,
  error: undefined,
  city: '',
  data: {}
};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(cityEpic);

export default store;
