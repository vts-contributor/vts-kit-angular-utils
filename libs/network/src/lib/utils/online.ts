import { fromEvent, map, merge, Observable } from 'rxjs';

export const online$ = () =>
  merge(
    fromEvent(window, 'offline').pipe(map(() => false)),
    fromEvent(window, 'online').pipe(map(() => true)),
    new Observable((sub) => {
      sub.next(navigator.onLine);
      sub.complete();
    })
  );

export const isOnline = () => navigator.onLine;
