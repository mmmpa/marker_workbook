import {Parcel} from "../libs/parcel";
require("zepto/zepto.min");

export default class MainContext extends Parcel {
  componentWillMount() {
    super.componentWillMount();

    this.setState({
      file: this.props.file,
    })
  }

  listen(to) {
    to(null, 'file:set', (file)=> this.setState({file}));
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