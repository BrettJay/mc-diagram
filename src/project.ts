import { makeProject } from '@motion-canvas/core/lib';

import diagram from './scenes/diagram?scene';

export default makeProject({
  scenes: [diagram],
  background: '#141414',
});
