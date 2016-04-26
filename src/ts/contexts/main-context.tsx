import {Parcel} from "../libs/parcel";
import FileHandler from "../models/file-handler";
import {AppState} from "../constants/constants";
import KeyControl from "../models/key-control";
require("zepto/zepto.min");

export default class MainContext extends Parcel {
  componentWillMount() {
    super.componentWillMount();

    this.setState({
      file: this.props.file || null,
      state: AppState.Ready,
      keyControl: new KeyControl()
    })
  }

  listen(to) {
    to(null, 'file:start', ()=> this.setState({file: null, state: AppState.Wait}));
    to(null, 'file:set', (file)=> this.setFile(file));
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