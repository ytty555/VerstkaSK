import React, { Component } from 'react';
import ElMakeUp from './ElMakeUp';
import ElPhoto from './ElPhoto';
import ElDelegated from './ElDelegated';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makeup: false,
      photo: false,
      delegated: false,
    }
    this.handleClickMakeUp = this.handleClickMakeUp.bind(this);
    this.handleClickPhoto = this.handleClickPhoto.bind(this);
  }

  handleClickMakeUp() {
    const currState = Object.assign({}, this.state);
    currState.makeup = !this.state.makeup;
    this.setState((state) => ({
      makeup: currState.makeup,
    }));
  }

  handleClickPhoto() {
    const currState = Object.assign({}, this.state);
    currState.photo = !this.state.photo;
    this.setState((state) => ({
      photo: currState.photo,
    }));
  }

  render() {
    return (
      <div className={'page ' + this.props.pos + ' ' + (this.props.pageState.pageColor ? 'page_color' : '')} >
        <div className="page__el-background"></div>
        <div className="page__el-color"></div>
        <div className="page__el-number">{this.props.pageState.pageID}</div>
        <ElMakeUp
          valueState={this.state.makeup ? 'page_make-up' : ''}
          onClickMakeUp={() => this.handleClickMakeUp()}
        />
        <ElPhoto
          valueState={this.state.photo ? 'page_photo' : ''}
          onClickPhoto={() => this.handleClickPhoto()}
        />
        <ElDelegated valueState={this.state.delegated ? 'page_delegated' : ''} />
      </div>
    );
  }
}

export default Page