/** @jsx hJSX */
import { run, Rx } from '@cycle/core';
import { hJSX, makeDOMDriver } from '@cycle/dom';
import automaticCounter from './automatic-counter';
import configurableAutomaticCounter from './configurable-automatic-counter';

function main({ DOM }) {
  let firstAutomaticCounterProps$ = Rx.Observable.just({
    interval: 1000,
    initial: 0
  });
  let firstAutomaticCounter = automaticCounter({ DOM, props$: firstAutomaticCounterProps$ });

  let secondAutomaticCounterProps$ = Rx.Observable.just({
    interval: 2000,
    initial: 0
  });
  let secondAutomaticCounter = automaticCounter({ DOM, props$: secondAutomaticCounterProps$ });

  let firstConfigurableAutomaticCounterProps$ = Rx.Observable.just({
    interval: 2000,
    initial: 0
  });
  let firstConfigurableAutomaticCounter = configurableAutomaticCounter({ DOM, props$: firstConfigurableAutomaticCounterProps$ });

  return {
    DOM: Rx.Observable.combineLatest(
      firstAutomaticCounter.DOM, secondAutomaticCounter.DOM, firstConfigurableAutomaticCounter.DOM,
      (firstAutomaticCounterVTree, secondAutomaticCounterVTree, firstConfigurableAutomaticCounterVTree) =>
      <div>
        <h1>Counter Examples</h1>

        <h2>Automatic Counters</h2>
        <p>This is an automatic counter (interval: 1s): {firstAutomaticCounterVTree}</p>
        <p>This is an automatic counter (interval: 2s): {secondAutomaticCounterVTree}</p>

        <h2>Configurable Automatic Counters</h2>
        {firstConfigurableAutomaticCounterVTree}
      </div>
    )
  };
}

let drivers = {
  DOM: makeDOMDriver('#app')
};

run(main, drivers);
