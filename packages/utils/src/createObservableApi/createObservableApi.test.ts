import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import createObservableApi from './createObservableApi';

const response = {
  data: ['a', 'b', 'c'],
};

const mock = new MockAdapter(axios);

const fakeApi = ({ id }) => axios.get(`/data/${id}`);

it('should has response', () => {
  return new Promise((done) => {
    mock.onGet(/\/data\/\d+/).reply(200, response);
    const api$ = createObservableApi(
      fakeApi({
        id: 1,
      })
    );
    api$.subscribe(
      (res) => {
        expect((res as typeof response).data).toEqual(response);
      },
      null,
      done
    );
  });
});

it('should has api error', () => {
  return new Promise((done) => {
    mock.onGet(/\/data\/\d+/).networkError();
    const api$ = createObservableApi(
      fakeApi({
        id: 1,
      })
    );
    api$.pipe(catchError((error) => of(error))).subscribe(
      (error) => {
        const t = () => {
          throw error;
        };
        expect(t).toThrow(Error);
      },
      null,
      done
    );
  });
});
