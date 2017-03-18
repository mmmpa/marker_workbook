import { EventEmitter } from 'events';
import React from 'react';
import * as _ from 'lodash';

export const EventingShared = {
  emitter: React.PropTypes.any,
};

export class Good extends React.Component {
  static get contextTypes (): React.ValidationMap<any> {
    return EventingShared;
  }

  static get childContextTypes (): React.ValidationMap<any> {
    return EventingShared;
  }

  getChildContext () {
    return { emitter: this.emitter };
  }

  componentDidMount () {
    this.debug('componentDidMount');
  }

  componentWillReceiveProps () {
    // this.debug('componentWillReceiveProps');
  }

  shouldComponentUpdate (): boolean {
    // this.debug('shouldComponentUpdate');
    return true;
  }

  componentWillUpdate (): void {
    // this.debug('componentWillUpdate');
  }

  componentDidUpdate (): void {
    // this.debug('componentDidUpdate');
  }

  componentWillUnmount () {
    this.debug('componentWillUnmount');
  }

  _emitter;
  get emitter () {
    return this.context.emitter || this._emitter || (this._emitter = new EventEmitter());
  }

  activate () {

  }

  deactivate () {

  }

  _myName: string;
  get myName () {
    if (this._myName) {
      return this._myName;
    }

    this._myName = this.constructor.toString().match(/function[ ]+([a-zA-Z0-9_]+)/)[1];

    return this._myName;
  }

  debug (...args) {
    console.log(this.myName, ...args);
  }

  componentWillMount () {
    this.debug('componentWillMount');
    this.removeEventAll();
  }

  eventStore: any[] = [];

  addEventSafety (target, ...args) {
    this.eventStore.push([target].concat(args));
    target.addEventListener(...args);
  }

  removeEventAll () {
    this.eventStore.forEach(([target, ...args]) => target.removeEventListener(...args));
  }

  dispatch (event: string, ...args: any[]): boolean {
    return (this.emitter || this.props.emitter).emit(event, ...args);
  }

  relayingProps () {
    const props: any = _.assign({ emitter: this.emitter || this.props.emitter }, this.props, this.state);
    delete props.children;
    return props;
  }

  relay (children) {
    const props: any = this.relayingProps();

    return children.map((child, key) => React.cloneElement(child, _.assign(props, { key })));
  }
}

export class Parcel<P, S> extends Good<P & ParcelProps, S & ParcelState> {
  routeChildren;
  addedOnStore: EventStore[] = [];
  acceptable: any = {};

  listen (to: (key: string, eventName: string, callback: Function)=>void): void {}

  componentWillUnmount () {
    const removed = this.addedOnStore.map(({ eventName, callback }:EventStore) => {
      this.emitter.removeListener(eventName, callback);
      return eventName;
    });
    super.componentWillUnmount();
  }

  componentWillMount () {
    this.listen((key: string, eventName: string, callback: Function) => {
      console.log(eventName);
      this.addedOnStore.push({ eventName, callback });
      this.acceptable[key] = true;
      if (key) {
        this.emitter.on(eventName, (...args) => {
          this.acceptable[key] && callback(...args);
        });
      } else {
        this.emitter.on(eventName, callback);
      }
    });
    super.componentWillMount();
  }

  lock (key: string) {
    this.acceptable[key] = false;
  }

  unlock (key: string) {
    this.acceptable[key] = true;
  }

  constructor (props) {
    super(props);
  }

  get children () {
    if (this.routeChildren) {
      return this.routeChildren;
    }

    const { children } = this.props;
    return children.map ? children : [children];
  }

  render () {
    return (<div className="context-wrapper">
      {this.relay(this.children)}
    </div>);
  }
}

