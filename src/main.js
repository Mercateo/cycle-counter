/** @jsx hJSX */
import Cycle, { Rx } from '@cycle/core';
import { hJSX, makeDOMDriver } from '@cycle/dom';
import manualCounter from './manual-counter';
import automaticCounter from './automatic-counter';

function main(responses) {
  let state$ = responses.reload$;

  return {
    DOM: state$.map(() =>
      <div>
        <h1>Counter Example</h1>
        <p>This is an automatic counter (1s steps):</p>
        {automaticCounter(responses).DOM}
        <p>This is an automatic counter (2s steps):</p>
        {automaticCounter(responses, { interval: 2000 }).DOM}
        <p>This is a manual counter:</p>
        {manualCounter(responses, { name: 'first' }).DOM}
        <p>This is another manual counter:</p>
        {manualCounter(responses, { name: 'second' }).DOM}
      </div>
    )
  };
}

let drivers = {
  DOM: makeDOMDriver('#app'),
  reload$: () => Rx.Observable.fromEvent(window, 'fb-flo-reload').startWith(null)
};

Cycle.run(main, drivers);
