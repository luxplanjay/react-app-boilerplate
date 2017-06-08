import React from 'react';

import Title from '../Title/Title';
import Text from '../Text/Text';

class RootContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
          <Title/>
          <Text/>
      </div>
    );
  }
}

export default RootContainer;
