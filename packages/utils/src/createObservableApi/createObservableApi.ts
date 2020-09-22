import { Observable, isObservable } from 'rxjs';

/**
 * Create observable api
 */
export default function createObservableApi(
  api: Promise<unknown> | Observable<unknown>
): Observable<unknown> {
  if (typeof api === 'undefined') {
    throw new TypeError('Undefined api in createObservableApi.');
  }
  if (isObservable(api)) {
    return api;
  }
  return new Observable((observer) => {
    api
      .then((response) => {
        observer.next(response);
        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
}
