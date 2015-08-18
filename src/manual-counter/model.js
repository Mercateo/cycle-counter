import { Rx } from '@cycle/core';

export default function model(actions, config) {
  return Rx.Observable.merge(actions.increment$, actions.decrement$)
    .startWith(0)
    .scan((counter, delta) => counter + delta);
}
