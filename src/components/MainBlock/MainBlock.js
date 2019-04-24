import React, { Component } from 'react';
import PagePair from './PagePair';

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
      pageInfoObj.pageState.makeup = false;
      pageInfoObj.pageState.photo = false;
      pageInfoObj.pageState.delegated = false;
      let tempObj = Object.assign({}, pageInfoObj);

      resArr.push(tempObj);
    }
    return resArr;
  }

  arrPagesPair(count) {
    let self = this;

    // Функция возвращает номера полос разворота в виде массива номеров полос (левая и правая)
    function numForPair(count, pair) {
      // Массив из номеров полос: левая полоса и правая
      let res = [null, null];

      // Переводит num в струку из двух символов
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
      return (<PagePair key={lPS.pageID + rPS.pageID} stateLeftPage={lPS} stateRightPage={rPS} />);
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
