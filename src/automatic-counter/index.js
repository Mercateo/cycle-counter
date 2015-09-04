/** @jsx hJSX */
import { Rx } from '@cycle/core';
import { hJSX, h } from '@cycle/dom';

export default function automaticCounter({ DOM, initial$, interval$ }, name = '') {
  // value
  let initialValue$ = initial$.first();
  let intervalValue$ = interval$.flatMapLatest(interval => Rx.Observable.interval(interval));
  let value$ = initialValue$.combineLatest(intervalValue$, (initialValue, intervalValue) => initialValue + intervalValue);

  // vtree
  let vtree$ = Rx.Observable.combineLatest(value$, (value) =>
    <span>
      {value}
    </span>
  );

  return {
    DOM: vtree$,
    value$
  }
}
