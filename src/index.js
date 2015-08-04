import React from 'react';
import Root from './containers/Root';

// for (let i = 0; i < 10; i++) {
//   let e = document.createElement('div');
//   e.style.cssText = 'float: left; width: 300px; padding: 10px; min-height: 400px;';
//   document.body.appendChild(e);
//   console.log(e);
//   React.render(<Root />, e);
// }

React.render(
  <Root />,
  document.body
);
