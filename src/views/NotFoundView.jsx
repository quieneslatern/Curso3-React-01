import React from 'react';

export class NotFoundView extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return <p>No encontramos la vista requerida</p>;
  }

}

