import {Parcel} from "../libs/parcel";
import FileHandler from "../models/file-handler";
import {AppState} from "../constants/constants";
import KeyControl from "../models/key-control";
import WorkbookRecord from "../records/workbook-record";
require("zepto/zepto.min");

export default class MainContext extends Parcel {
  componentWillMount() {
    super.componentWillMount();

    let defaultState = {
      file: null,
      state: AppState.Ready,
      keyControl: new KeyControl()
    };
    
    
    let {firstDataURI, firstWorkbookData} = this.props;
    if(firstDataURI){
      defaultState.state = AppState.Wait;
      this.setState(defaultState, ()=>{
        new FileHandler((file)=> {
          if(firstWorkbookData){
            //new WorkbookRecord(file.key).write('workbook', firstWorkbookData);
          }
          this.dispatch('file:set', file);
        }, firstDataURI);
      });
    }else{
      this.setState(defaultState);
    }
  }

  listen(to) {
    to(null, 'file:start', ()=> this.setState({file: null, state: AppState.Wait}));
    to(null, 'file:set', (file)=> this.setFile(file));
    to(null, 'workbook:save:json', (json)=> this.save(json));
  }

  save(json){
    new WorkbookRecord(this.state.file.key).write('workbook', json)
  }

  setFile(file) {
    this.setState({file, state: AppState.Ready});
  }

  route(state) {
    this.routeChildren = this.props.children.filter((child)=> {
      return _.isUndefined(child.props.route) || child.props.route == state.route
    });
  }

  componentWillUpdate(props, state) {
    //this.route(state)
  }
}