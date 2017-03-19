// @flow

import { feeder, eater } from '../lib/decorators/feeder'
import React, { Component } from 'react';
import FileRead from '../models/file-read';

@feeder
@eater
export default class FileSelectorContext extends Component {
  dispatch: EaterDispatch;

  listen (to: FeederListenTo) {
    to('file:open', () => this.open());
  }

  open () {
    this.dispatch('file:open:start');
    new FileRead({
      succeed: result => this.dispatch('file:open:complete', result) ,
      fail: error => this.dispatch('file:open:fail', error)
    }).run()
  }
}
