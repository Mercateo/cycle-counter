import { Rx } from '@cycle/core';

export default function model(actions, config) {
  return Rx.Observable.interval(config.interval);
}
