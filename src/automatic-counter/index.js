/** @jsx hJSX */
import { Rx } from '@cycle/core';
import { hJSX, h } from '@cycle/dom';

export default function automaticCounter({ DOM, props$ }, name = '') {
  // props
  // value
  let initialValue$ = props$.map(props => props.initial).first();
  let intervalValue$ = props$.map(props => Rx.Observable.interval(props.interval));
  let value$ = initialValue$.concat(intervalValue$);

  // vtree
  let vtree$ = Rx.Observable.combineLatest(props$, value$, (props, value) =>
    <span>
      {value}
    </span>
  );

  return {
    DOM: vtree$,
    value$
  }
}
