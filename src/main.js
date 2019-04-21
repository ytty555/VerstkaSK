import React, { Component } from 'react';
import './css/style.css';

function ElMakeUp(props) {
  let classN = 'page__el-make-up ' + props.valueState;
  return (
    <button className={classN} onClick={props.onClickMakeUp}></button>
  );
}

function ElPhoto(props) {
  let classN = 'page__el-photo ' + props.valueState;

  return (
    <button className={classN} onClick={props.onClickPhoto}></button>
  );
}

function ElDelegated(props) {
  let classN = 'page__el-delegated ' + props.valueState;
  return (
    <button className={classN}></button>
  );
}

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

function PagePair(props) {
  return (
    <div className="page-pair">
      <img className="page-pair-background" src={require('./img/pair.svg')} alt="Изображение разворота полос" />
      <Page
        pos='page_pos_left'
        pageState={props.stateLeftPage}
      />
      <Page
        pos='page_pos_right'
        pageState={props.stateRightPage}
      />
    </div>
  );
}

class MainBlock extends Component {
  constructor(props) {
    super(props);
    this.state = this.generateEmptyStateArray(28);
  }


  generateEmptyStateArray(pageQuantity) {
    let resArr = [];
    let pageInfoObj = {
      pageID: null,
      pageColor: null,
      pageState: {
        makeup: null,
        photo: null,
        delegated: null,
      },
    };
    for (let i = 1; i <= pageQuantity; i++) {
      pageInfoObj.pageID = i < 10 ? '0' + i : String(i);
      pageInfoObj.pageColor = 1;
      pageInfoObj.pageState.makeup = 1;
      pageInfoObj.pageState.photo = 1;
      pageInfoObj.pageState.delegated = 1;
      let tempObj = Object.assign({}, pageInfoObj);

      resArr.push(tempObj);
    }
    return resArr;
  }

  arrPagesPair(count) {
    let self = this;
    function numForPair(count, pair) {
      let res = [null, null];

      function toTwo(num) {
        return num < 10 ? '0' + String(num) : String(num);
      }

      if (pair === 1) {
        res[0] = toTwo(count);
        res[1] = toTwo(pair);
      } else {
        res[0] = toTwo(pair * 2 - 2);
        res[1] = toTwo(pair * 2 - 1);
      }
      return res;
    }

    function renderPagePair(leftP, rightP) {
      function getCurrentPageStatus(pID) {
        let allPageState = self.state;
        for (let i = 0; i < allPageState.length; i++) {
          if (allPageState[i].pageID === pID) {
            return allPageState[i];
          }
        }
        return -1;
      }

      let lPS = getCurrentPageStatus(leftP);
      let rPS = getCurrentPageStatus(rightP);
      return (<PagePair stateLeftPage={lPS} stateRightPage={rPS} />);
    }

    let arr = [];
    for (let i = 1; i <= (count / 2); i++) {
      arr.push(i);
    }
    const listItems = arr.map((pair) =>
      renderPagePair(numForPair(count, pair)[0], numForPair(count, pair)[1])
    );
    return (
      listItems
    );
  }


  render() {
    return (
      <main className="main-block">
        <section className="page-section">
          <h1 className="visually-hidden">Раскладка полос</h1>
          <div className="page-grid-container">
            {this.arrPagesPair(28)}
          </div>
        </section>
      </main>
    );
  }
}

export default MainBlock;
