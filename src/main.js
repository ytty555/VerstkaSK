import React, { Component } from 'react';
import './css/style.css';

function ElMakeUp(props) {
  let classN = 'page__el-make-up ' + props.value;
  return (
    <button className={classN}></button>
  );
}

function ElPhoto(props) {
  let classN = 'page__el-photo ' + props.value;

  return (
    <button className={classN}></button>
  );
}

function ElDelegated(props) {
  let classN = 'page__el-delegated ' + props.value;
  return (
    <button className={classN}></button>
  );
}

function Page(props) {
  let classN = 'page ' + props.pos + ' ' + (props.pageState.pageColor ? 'page_color' : '');
  return (
    <div className={classN}>
      <div className="page__el-background"></div>
      <div className="page__el-color"></div>
      <div className="page__el-number">{props.pageState.pageID}</div>
      <ElMakeUp value={props.pageState.makeup ? 'page_make-up' : ''} />
      <ElPhoto value={props.pageState.photo ? 'page_photo' : ''} />
      <ElDelegated value={props.pageState.delegated ? 'page_delegated' : ''} />
    </div>
  );
}

function PagePair(props) {
  let stateLeftPage = props.stateLeftPage;
  let stateRightPage = props.stateRightPage;

  return (
    <div className="page-pair">
      <img className="page-pair-background" src={require('./img/pair.svg')} alt="Изображение разворота полос" />
      <Page pos='page_pos_left' pageState={stateLeftPage} />
      <Page pos='page_pos_right' pageState={stateRightPage} />
    </div>
  );
}

class MainBlock extends Component {
  generateEmptyStateArray(pageQuantity) {
    let resArr = [];
    let pageInfoObj = {
      pageID: null,
      pageColor: 0,
      pageState: {
        makeup: 0,
        photo: 0,
        delegated: 0,
      },
    };

    for (let i = 1; i <= pageQuantity; i++) {
      pageInfoObj.pageID = i < 10 ? '0' + i : String(i);
      pageInfoObj.pageColor = 0;
      pageInfoObj.pageState.makeup = 0;
      pageInfoObj.pageState.photo = 0;
      pageInfoObj.pageState.delegated = 0;

      resArr.push(pageInfoObj);
    }

    return resArr;
  }

  constructor(props) {
    super(props);
    this.state = this.generateEmptyStateArray(28);
  }

  arrPagesPair(count) {
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
        let allPageState = this.state;
        for (let i = 0; i < allPageState.length; i++) {
          if (allPageState[i].pageID === pID) {
            return allPageState[i];
          }
        }
        return -1;
      }

      let lPS = getCurrentPageStatus(leftP);
      let rPS = getCurrentPageStatus(rightP);
      return <PagePair leftPage={leftP} rightPage={rightP} stateLeftPage={lPS} stateRightPage={rPS} />
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
