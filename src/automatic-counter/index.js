import intent from './intent';
import model from './model';
import view from './view';

const defaultConfig = {
  interval: 1000
};

export default function main(responses, config) {
  config = Object.assign({}, defaultConfig, config);
  return {
    DOM: view(model(intent(responses.DOM, config), config), config)
  };
}
