// @flow

import React, { Component } from 'react';
import { feeder, eater } from '../lib/decorators/feeder'
import Workbook from '../models/workbook'
import Marker from '../models/marker'
import KeyControl from '../models/key-control'

import {
  WorkbookState,
  ToolMode,
} from '../constants/constants';

type State = {
  workbook: Workbook,
  mode: any,
  scale: number,
  pageNumber: number,
  sheetVisibility: boolean
}

@feeder
@eater
export default class WorkbookContext extends Component {
  dispatch: EaterDispatch;

  setState: (state: any) => void;
  state: State;
  props: any;

  componentWillMount () {
    this.setState({
      type: null,
      mode: ToolMode.DrawingMark,
      thickness: 40,
      sheetVisibility: true,
      workbook: null,
      scale: 1,
    });

    this.initializeShortCut(this.props.keyControl);

    this.componentWillReceiveProps(this.props);
  }

  initializeShortCut (keyControl: KeyControl) {
    keyControl.bind('onArrowLeft', 'pdf:back', () => this.pageNext(-1));
    keyControl.bind('onArrowRight', 'pdf:next', () => this.pageNext(+1));
    keyControl.bind('onV', 'sheet:toggle', () => {
      this.dispatch('sheet:display', !this.state.sheetVisibility);
    });
  }

  pageNext (n: number): void {
    this.dispatch('pdf:page', this.state.pageNumber + n);
  }

  componentWillReceiveProps (props: any): void {
    if (this.props.file !== props.file) {
      // this.initialize(props.file);
    }
  }

  listen (to: FeederListenTo) {
    to('tool:change:slide:paper', () => this.setState({ mode: ToolMode.SlidingPaper }));
    to('tool:change:slide:sheet', () => this.setState({ mode: ToolMode.SlidingSheet }));
    to('tool:change:draw:Marker', () => this.setState({ mode: ToolMode.DrawingMark }));
    to('tool:change:delete:marker', () => this.setState({ mode: ToolMode.DeletingMark }));
    to('tool:thickness', thickness => this.setState({ thickness }));

    to('sheet:display', sheetVisibility => this.setState({ sheetVisibility }));

    to('marker:click', (marker: Marker, isRight: boolean) => this.selectMarker(marker, isRight));

    to('pdf:page', pageNumber => this.page({ pageNumber }));

    to('workbook:scale', scale => this.page({ scale }));
    to('workbook:position:reset', scale => this.resetPosition());
    to('workbook:save', () => this.dispatch('workbook:save:json', this.state.workbook.forJSON));
  }

  resetPosition () {
    this.state.workbook.resetPosition();
    this.setState({});
    this.dispatch('workbook:save');
  }

  selectMarker (marker: Marker, isRight: boolean) {
    const { keyControl } = this.props;
    const { mode } = this.state;

    if (keyControl.isDown('Space')) {
      return;
    }

    if (mode !== ToolMode.DrawingMark && mode !== ToolMode.DeletingMark) {
      return;
    }

    if (mode === ToolMode.DrawingMark && !isRight) {
      return;
    }

    if (mode === ToolMode.DeletingMark && isRight) {
      return;
    }

    this.state.workbook.removeMarker(marker);
    this.setState({});
    this.dispatch('workbook:save');
  }

  get isLoaded (): boolean {
    return !!this.props.file;
  }

  page ({ pageNumber: nextPageNumber, scale: nextScale }: {pageNumber?: number, scale?: number}): void {
    const pageNumber = nextPageNumber || this.state.workbook.pageNumber;
    const scale = nextScale || this.state.scale;

    this.setState({ workbookState: WorkbookState.Rendering });

    this.state.workbook.page({
      pageNumber,
      scale,
      callback: ({ pageNumber, size, dataURL }: PagedResult) => {
        this.setState({
          workbookState: WorkbookState.Ready,
          pageNumber,
          dataURL,
          scale,
          size,
        });
      }
    });
  }
}
