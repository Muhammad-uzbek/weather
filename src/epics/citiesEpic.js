import { filter,
  flatMap,
  switchMap,
  catchError,
  retry,
  takeUntil
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
  FETCH_CITY,
  FETCH_STOP,
  updateCityAction
} from '../actions/cityActions';
import {
  errorAction,
  loadingAction
} from '../actions/uiActions';

const API_ID = '79946b6e9a2cbe91e515ffe5635089a2';
const API_HOST = `http://api.openweathermap.org/data/2.5/weather?q=:city&appid=${API_ID}&units=metric`;

export const cityEpic = function (action$) {
  return action$.pipe(
    filter(action => action.type === FETCH_CITY),
    switchMap(action => {
      const response$ = ajax.getJSON(API_HOST.replace(':city', action.payload));
      return response$.pipe(
        flatMap(response => {
          const data = {
            city: response.name,
            data: {
              temp: response.main.temp,
              ...response.weather[0]
            }
          };
          return of(
            updateCityAction(data),
            loadingAction(false),
            errorAction()
          );
        }),
           takeUntil(action$.pipe(
          filter(action => action.type === FETCH_STOP)
        )),
        retry(2),
        catchError(error => {
          return of(
            errorAction(error),
            loadingAction(false),
            updateCityAction({
              city: '',
              data: {}
            })
          );
        })
      );
    })
  );
}
