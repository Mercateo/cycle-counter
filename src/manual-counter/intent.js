export default function intent(DOM, config) {
  const decrement$ = DOM.get(`.js-${config.name}-manual-counter-decrement`, 'click').map(evt => -1);
  const increment$ = DOM.get(`.js-${config.name}-manual-counter-increment`, 'click').map(evt => 1);

  return {
    decrement$,
    increment$
  };
}
