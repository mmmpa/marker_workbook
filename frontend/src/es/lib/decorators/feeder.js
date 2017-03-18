import { EventEmitter } from 'events';
import React from 'react';
import ReactDOM from 'react-dom';

export function feeder (ReactComponent) {
  return class extends ReactComponent {
    addedOnStore = [];

    static get childContextTypes () {
      return { emitter: React.PropTypes.any };
    }

    componentWillUnmount () {
      super.componentWillUnmount && super.componentWillUnmount();

      this.addedOnStore.map(({ eventName, callback }) => {
        this.emitter.removeListener(eventName, callback);
        return eventName;
      });
    }

    componentWillMount () {
      super.componentWillMount && super.componentWillMount();

      if (!this.emitter) {
        this.emitter = this.context.emitter || new EventEmitter();
        this.listen((eventName, callback) => {
          this.addedOnStore.push({ eventName, callback });
          this.emitter.on(eventName, callback);
        });
      }
    }

    getChildContext () {
      const base = super.getChildContext ? super.getChildContext() : {};

      return Object.assign(base, { emitter: this.context.emitter || this.emitter });
    }

    get children () {
      const { children } = this.props;

      if (!children) {
        return [];
      }

      return children.map
        ? children
        : [children]
    }

    render () {
      const rendered = super.render && super.render();
      if (rendered) {
        return rendered;
      }

      const props = Object.assign({}, this.props, this.state);
      delete props.children;

      return (
        <div className="context-wrapper">
          {this.children.map((child, i) => React.cloneElement(child, Object.assign(props, { key: i })))}
        </div>
      );
    }
  };
}

export function eater (ReactComponent) {
  return class extends ReactComponent {
    dispatch (event, ...args) {
      super.dispatch && super.dispatch();
      return this.context.emitter.emit(event, ...args);
    }
  };
}

