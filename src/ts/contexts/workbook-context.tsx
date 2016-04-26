import {Parcel} from "../libs/parcel";
import {FileType, WorkbookState, ToolMode, ShortCut} from "../constants/constants";
import FileHandler from "../models/file-handler";
import Workbook from "../models/workbook";

export default class WorkbookContext extends Parcel {
  componentWillMount() {
    super.componentWillMount();

    this.setState({
      type: null,
      pageNumber: 0,
      pageCount: 0,
      mode: ToolMode.DrawingMark,
      shortCut: null
    });

    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(props) {
    if (this.props.file !== props.file) {
      this.initialize(props.file);
    }
  }

  listen(to) {
    to(null, 'pdf:page', (n)=> this.page(n));

    to(null, 'tool:change:slide:paper', ()=> this.setState({mode: ToolMode.SlidingPaper}));
    to(null, 'tool:change:slide:sheet', ()=> this.setState({mode: ToolMode.SlidingSheet}));
    to(null, 'tool:change:draw:Marker', ()=> this.setState({mode: ToolMode.DrawingMark}));
    to(null, 'tool:change:delete:marker', ()=> this.setState({mode: ToolMode.DeletingMark}));

    to(null, 'workspace:press', (x, y, isRight)=> this.pressWorkspace(x, y, isRight));
    to(null, 'workspace:drag', (startX, startY, x, y, endX, endY, isRight)=> this.dragWorkspace(startX, startY, x, y, endX, endY, isRight));
  }

  pressWorkspace(x, y, isRight = false) {
    this.setShortCut(()=> this.detectPressAction(isRight)(x, y));
  }

  dragWorkspace(startX, startY, x, y, endX, endY, isRight = false) {
    this.detectDragAction(isRight)(startX, startY, x, y, endX, endY);
  }


  setShortCut(callback) {
    switch (true) {
      case this.props.keyControl.isDown('Space'):
        return this.setState({shortCut: ShortCut.Slide}, callback);
      default:
        return this.setState({shortCut: null}, callback)
    }
  }

  detectPressAction(isRight = false) {
    switch (this.state.mode) {
      default:
        return (...args)=> null
        return isRight
          ? (x, y)=> this.draw(x, y, this.rightColor)
          : (x, y)=> this.draw(x, y, this.leftColor);
    }
  }

  detectDragAction(isRight = false):(startX, startY, x, y, endX, endY)=> void {
    switch (true) {
      case this.state.shortCut === ShortCut.Slide:
        return isRight
          ? (startX, startY, x, y, endX, endY)=> this.slideSheet(x, y, endX, endY)
          : (startX, startY, x, y, endX, endY)=> this.slidePage(x, y, endX, endY);
      default:
        return (x, y, endX, endY)=> this.drawMarker(x, y, endX, endY, this.rightColor)
    }
  }

  slideSheet(x, y, endX, endY) {
    console.log('slide sheet')
    this.state.page.moveSheet(endX - x, endY - y);
    this.setState({})
  }

  slidePage(x, y, endX, endY) {
    console.log('slide page')
    this.state.page.movePage(endX - x, endY - y);
    this.setState({})
  }

  get isLoaded() {
    return !!this.props.file;
  }

  get isPDF() {
    return this.props.file.isPDF;
  }

  get pdf() {
    return this.props.file.pdf;
  }

  initialize(file?:FileHandler) {
    if (!file) {
      return null;
    }

    if (file.isPDF) {
      this.setState({workbookState: WorkbookState.Rendering})
      file.pdf.page(1, (pageNumber, size, dataURL)=> {
        let workbook = new Workbook(file.pdf.pageCount);
        this.setState({
          workbookState: WorkbookState.Ready,
          type: FileType.PDF,
          pageCount: file.pdf.pageCount,
          pageNumber,
          dataURL,
          size,
          workbook: workbook,
          page: workbook.page(1)
        })
      });
    } else {
      let workbook = new Workbook(1);
      this.setState({
        workbookState: WorkbookState.Ready,
        type: FileType.Image,
        pageCount: 1,
        pageNumber: 1,
        dataURL: file.dataURL,
        workbook,
        size: {width: file.width, height: file.height},
        page: workbook.page(1)
      });
    }
  }

  page(pageNumber) {
    this.setState({workbookState: WorkbookState.Rendering})
    this.pdf.page(pageNumber, (pageNumber, size, dataURL)=> this.setState({
      workbookState: WorkbookState.Ready,
      pageNumber,
      dataURL,
      page: this.state.workbook.page(pageNumber)
    }));
  }
}