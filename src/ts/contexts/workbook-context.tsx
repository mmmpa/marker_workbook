import {Parcel} from "../libs/parcel";
import {FileType, WorkbookState} from "../constants/constants";
import FileHandler from "../models/file-handler";

export default class WorkbookContext extends Parcel {
  componentWillMount() {
    super.componentWillMount();

    this.setState({
      type: null,
      pageNumber: 0,
      pageCount: 0
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
      file.pdf.page(1, (pageNumber, dataURL)=> this.setState({
        workbookState: WorkbookState.Ready,
        type: FileType.PDF,
        pageCount: file.pdf.pageCount,
        pageNumber,
        dataURL
      }));
    } else {
      this.setState({
        workbookState: WorkbookState.Ready,
        type: FileType.Image,
        pageCount: 0,
        pageNumber: 0,
        dataURL: file.dataURL
      });
    }
  }

  page(pageNumber) {
    this.setState({workbookState: WorkbookState.Rendering})
    this.pdf.page(pageNumber, (pageNumber, dataURL)=> this.setState({
      workbookState: WorkbookState.Ready,
      pageNumber,
      dataURL
    }));
  }
}