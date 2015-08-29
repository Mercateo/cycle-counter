/** @jsx hJSX */
import { Rx } from '@cycle/core';
import { hJSX, h } from '@cycle/dom';
import automaticCounter from '../automatic-counter';

export default function configurableAutomaticCounter({ DOM, props$ }, name = '') {
  // automatic counter
  let myAutomaticCounter = automaticCounter({ DOM, props$ });

  // TODO: How can I push newInterval$ into props$?
  let newInterval$ = DOM.get(`.configurable-automatic-counter${name} .slider`, 'input')
    .map(ev => ev.target.value);

  // value
  let value$ = myAutomaticCounter.value$;

  // vtree
  let vtree$ = Rx.Observable.combineLatest(props$, value$, myAutomaticCounter.DOM, (props, value, automaticCounterVTree) =>
      <div className="configurable-automatic-counter">
        <span>Current interval: {props.interval}</span>
        <input className="slider" type="range" min="100" max="5000" value={props.interval}/>
        <p>Counter value: {automaticCounterVTree}</p>
      </div>
  );

  return {
    DOM: vtree$,
    value$
  }
}
