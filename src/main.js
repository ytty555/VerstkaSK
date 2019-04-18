import React, { Component } from 'react';
import './css/style.css';

function ElMakeUp(props) {
  return (
    <button className="page__el-make-up"></button>
  );
}

function ElPhoto(props) {
  let classN = 'page__el-photo';

  if (props.value) {
    classN += ' page_photo';
  }

  return (
    <button className="page__el-photo"></button>
  );
}

function ElDelegated(props) {
  return (
    <button className="page__el-delegated"></button>
  );
}

function Page(props) {
  let classN = 'page ' + props.pos + ' ' + props.color;
  return (
    <div className={classN}>
      <div className="page__el-background"></div>
      <div className="page__el-color"></div>
      <div className="page__el-number">{props.pageNum}</div>
      <ElMakeUp value={props.makeup} />
      <ElPhoto value={props.photo} />
      <ElDelegated value={props.delegated} />

    </div>
  );
}

function PagePair(props) {
  return (
    <div className="page-pair">
      <img className="page-pair-background" src={require('./img/pair.svg')} alt="Изображение разворота полос" />
      <Page pageNum={props.leftPage} pos='page_pos_left' color='page_color' delegated='page_delegated' makeup='' photo={1} />
      <Page pageNum={props.rightPage} pos='page_pos_right' color='' delegated='' makeup='page_make-up' />
    </div>
  );
}

class MainBlock extends Component {
  numForPair(count, pair) {
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

  arrPagesPair(count) {
    let arr = [];
    for (let i = 1; i <= (count / 2); i++) {
      arr.push(i);
    }
    const listItems = arr.map((pair) =>
      this.renderPagePair(this.numForPair(count, pair)[0], this.numForPair(count, pair)[1])
    );
    return (
      listItems
    );
  }

  renderPagePair(leftP, rightP) {
    return <PagePair leftPage={leftP} rightPage={rightP} />
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
