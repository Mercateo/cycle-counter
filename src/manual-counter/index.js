import intent from './intent';
import model from './model';
import view from './view';

export default function main(responses, config) {
  return {
    DOM: view(model(intent(responses.DOM, config), config), config)
  };
}
