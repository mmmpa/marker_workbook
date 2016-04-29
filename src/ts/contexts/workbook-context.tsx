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
      shortCut: null,
      thickness: 40,
      sheetVisibility: true
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
    to(null, 'tool:thickness', (thickness)=> this.setState({thickness}));
    to(null, 'sheet:display', (sheetVisibility)=> this.setState({sheetVisibility}));

    to(null, 'marker:click', (marker, isRight)=> this.selectMarker(marker, isRight));

    to(null, 'workbook:save', ()=> {
      this.dispatch('workbook:save:json', this.state.workbook.forJSON)
    });
  }

  selectMarker(marker, isRight){
    let {keyControl} = this.props
    let {mode} = this.state;
    
    if(keyControl.isDown('Space')){
      return;
    }

    if(mode !== ToolMode.DrawingMark && mode !== ToolMode.DeletingMark){
      return;
    }

    if(mode === ToolMode.DrawingMark && !isRight){
      return;
    }

    if(mode === ToolMode.DeletingMark && isRight){
      return;
    }

    this.state.page.removeMarker(marker);
    this.setState({});
    this.dispatch('workbook:save');
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
        let workbook = new Workbook(file.key, file.pdf.pageCount);
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
      let workbook = new Workbook(file.key, 1);
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