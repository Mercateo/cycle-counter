/** @jsx hJSX */
import { hJSX } from '@cycle/dom';

export default function view(state$, config) {
  return state$.map(counter =>
    <div>
      {counter}
    </div>
  );
}
