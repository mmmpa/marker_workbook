import React, { Component } from 'react';

import { feeder } from '../lib/decorators/feeder';
import KeyControl from '../models/key-control';
// import WorkbookRecord from '../records/workbook-record';
import {AppState} from '../constants/constants'

@feeder
export default class MainContext extends Component{
  componentWillMount () {
    const defaultState = {
      file: null,
      state: AppState.Ready,
      keyControl: new KeyControl({
        killer: {
          onSpace: true,
          onArrowLeft: true,
          onArrowRight: true,
        },
      }),
    };
  }

  listen (to) {
    to('file:start', () => this.setState({ file: null, state: AppState.Wait }));
    to('file:set', file => this.setFile(file));
    to('workbook:save:json', json => this.save(json));
  }

  save (json) {
    new WorkbookRecord(this.state.file.key).write('workbook', json);
  }

  setFile (file) {
    this.setState({ file, state: AppState.Ready });
  }
}
