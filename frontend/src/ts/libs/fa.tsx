import * as React from 'react'
import { Component } from 'react'

interface IFa{
  icon:string,
  scale?:number,
  fixedWidth?:boolean,
  list?:boolean,
  border?:boolean,
  pull?:string,
  animation?:string,
  rotate?:number,
  flip?:string
}

export default class Fa extends Component<IFa, {}> {
  render() {
    let p = this.props;
    let classes = ['fa'];
    classes.push("fa-" + p.icon);
    p.scale && classes.push("fa-" + p.scale + "x");
    (p.fixedWidth === undefined || p.fixedWidth === true) && classes.push('fa-fw');
    p.list && classes.push('fa-li');
    p.border && classes.push('fa-border');
    p.pull && classes.push("fa-pull-" + p.pull);
    p.animation && classes.push("fa-" + p.animation);
    p.rotate && classes.push("fa-rotate-" + p.rotate);
    p.flip && classes.push("fa-flip-" + p.flip);

    return <i className={classes.join(' ')}/>
  }
}
