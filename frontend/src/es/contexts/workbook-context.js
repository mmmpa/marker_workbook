import { Parcel } from '../libs/parcel';
import {
  FileType,
  WorkbookState,
  ToolMode,
} from '../constants/constants';
import FileHandler from '../models/file-handler';
import Workbook from '../models/workbook';

export default class WorkbookContext extends Parcel {
  componentWillMount () {
    super.componentWillMount();

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

  initializeShortCut (keyControl) {
    keyControl.bind('onArrowLeft', 'pdf:back', () => this.pageNext(-1));
    keyControl.bind('onArrowRight', 'pdf:next', () => this.pageNext(+1));
    keyControl.bind('onV', 'sheet:toggle', () => {
      this.dispatch('sheet:display', !this.state.sheetVisibility);
    });
  }

  pageNext (n) {
    if (!this.state.workbook.isPDF) {
      return;
    }
    const { pageNumber } = this.state.workbook;
    this.dispatch('pdf:page', pageNumber + n);
  }

  componentWillReceiveProps (props) {
    if (this.props.file !== props.file) {
      this.initialize(props.file);
    }
  }

  listen (to) {
    to(null, 'tool:change:slide:paper', () => this.setState({ mode: ToolMode.SlidingPaper }));
    to(null, 'tool:change:slide:sheet', () => this.setState({ mode: ToolMode.SlidingSheet }));
    to(null, 'tool:change:draw:Marker', () => this.setState({ mode: ToolMode.DrawingMark }));
    to(null, 'tool:change:delete:marker', () => this.setState({ mode: ToolMode.DeletingMark }));
    to(null, 'tool:thickness', thickness => this.setState({ thickness }));
    to(null, 'sheet:display', sheetVisibility => this.setState({ sheetVisibility }));

    to(null, 'marker:click', (marker, isRight) => this.selectMarker(marker, isRight));

    to(null, 'pdf:page', nextPageNumber => this.page({ nextPageNumber }));
    to(null, 'workbook:scale', nextScale => this.page({ nextScale }));
    to(null, 'workbook:position:reset', scale => this.resetPosition());
    to(null, 'workbook:save', () => {
      console.log(this.state.workbook.forJSON);
      this.dispatch('workbook:save:json', this.state.workbook.forJSON);
    });
  }

  resetPosition () {
    this.state.workbook.currentPage.resetPosition();
    this.setState({});
    this.dispatch('workbook:save');
  }

  selectMarker (marker, isRight) {
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

    this.state.workbook.currentPage.removeMarker(marker);
    this.setState({});
    this.dispatch('workbook:save');
  }

  get isLoaded () {
    return !!this.props.file;
  }

  get isPDF () {
    return this.props.file.isPDF;
  }

  get pdf () {
    return this.props.file.pdf;
  }

  initialize (file?: FileHandler) {
    if (!file) {
      return null;
    }

    if (file.isPDF) {
      this.setState({ workbookState: WorkbookState.Rendering });
      file.pdf.page(1, this.state.scale, (pageNumber, size, dataURL) => {
        const workbook = new Workbook(file.key, file.pdf.pageCount, true);
        this.setState({
          workbookState: WorkbookState.Ready,
          type: FileType.PDF,
          dataURL,
          size,
          workbook,
        });
      });
    } else {
      const workbook = new Workbook(file.key, 1);
      this.setState({
        workbookState: WorkbookState.Ready,
        type: FileType.Image,
        dataURL: file.dataURL,
        workbook,
        size: { width: file.width, height: file.height },
      });
    }
  }

  page ({ nextPageNumber, nextScale }) {
    const pageNumber = nextPageNumber || this.state.workbook.pageNumber;
    const scale = nextScale || this.state.scale;

    this.setState({ workbookState: WorkbookState.Rendering });
    this.pdf.page(pageNumber, scale, (pageNumber, size, dataURL) => {
      this.state.workbook.page(pageNumber);
      this.setState({
        workbookState: WorkbookState.Ready,
        dataURL,
        scale,
        size,
      });
    });
  }
}
