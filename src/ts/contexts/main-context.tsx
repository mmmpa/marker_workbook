import {Parcel} from "../libs/parcel";
require("zepto/zepto.min");

export default class MainContext extends Parcel {
  listen(to) {
  }

  route(state) {
    this.routeChildren = this.props.children.filter((child)=> {
      return _.isUndefined(child.props.route) || child.props.route == state.route
    });
  }

  componentWillUpdate(props, state) {
    this.route(state)
  }
}