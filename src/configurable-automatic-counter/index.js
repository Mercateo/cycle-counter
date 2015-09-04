/** @jsx hJSX */
import { Rx } from '@cycle/core';
import { hJSX, h } from '@cycle/dom';
import automaticCounter from '../automatic-counter';

export default function configurableAutomaticCounter({ DOM, initial$, interval$ }, name = '') {
  // observe new interval intent
  let newInterval$ = DOM.get(`.configurable-automatic-counter${name} .slider`, 'input')
    .map(ev => ev.target.value);
  interval$ = interval$.merge(newInterval$);

  // automatic counter
  let myAutomaticCounter = automaticCounter({
    DOM,
    initial$,
    interval$
  });

  // value
  let value$ = myAutomaticCounter.value$;

  // vtree
  let vtree$ = Rx.Observable.combineLatest(interval$, value$, myAutomaticCounter.DOM, (interval, value, automaticCounterVTree) =>
    <div className="configurable-automatic-counter">
      <span>Current interval: {interval}</span>
      <input className="slider" type="range" min="100" max="5000" value={interval}/>
      <p>Counter value: {automaticCounterVTree}</p>
    </div>
  );

  return {
    DOM: vtree$,
    value$
  }
}
