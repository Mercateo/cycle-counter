/** @jsx hJSX */
import { hJSX } from '@cycle/dom';

export default function view(state$, config) {
  let decrementClass = `js-${config.name}-manual-counter-decrement`;
  let incrementClass = `js-${config.name}-manual-counter-increment`;
  return state$.map(counter =>
    <div>
      <button className={decrementClass}>decrement</button>
      <span> {counter} </span>
      <button className={incrementClass}>increment</button>
    </div>
  );
}
