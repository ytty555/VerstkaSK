import React, { Component } from 'react';
import ElMakeUp from './ElMakeUp';
import ElPhoto from './ElPhoto';
import ElDelegated from './ElDelegated';

class Page extends Component {
  render() {
    const idPage = this.props.pageNum;
    return (
      <div className={'page ' + this.props.pos + ' ' + (this.props.pageState.pageColor ? 'page_color' : '')} >
        <div className="page__el-background"></div>
        <div className="page__el-color"></div>
        <div className="page__el-number">{this.props.pageNum}</div>
        <ElMakeUp
          valueState={this.props.pageState.makeup ? 'page_make-up' : ''}
          onClickMakeUp={() => this.props.onClickMakeUp()}
        />
        <ElPhoto
          valueState={this.props.pageState.photo ? 'page_photo' : ''}
          onClickPhoto={() => this.props.onClickPhoto()}
        />
        <ElDelegated 
          valueState={this.props.pageState.delegated ? 'page_delegated' : ''} 
          onClickDelegated={() => this.props.onClickDelegated()}
        />
      </div>
    );
  }
}

export default Page