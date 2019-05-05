import React, { Component } from "react";
import PagePair from "./PagePair";

class MainBlock extends Component {
  constructor(props) {
    super(props);

    this.state = this.generateStateArray(this.getPageQuantity());
  }

  getPageQuantity = () => 24;

  generateStateArray = pageQuantity => {
    const pairs = pageQuantity / 2;
    let resArr = {};

    (() => {
      for (let i = 1; i <= pairs; i++) {
        const keyObj = this.toTwo(i);
        const numForPair = this.numForPair(pageQuantity, i);
        const currPair = {
          left: {
            pageId: numForPair[0],
            pageColor: true,
            pageMakeup: false,
            pagePhoto: false,
            pageDelegated: false
          },
          right: {
            pageId: numForPair[1],
            pageColor: false,
            pageMakeup: false,
            pagePhoto: false,
            pageDelegated: false
          }
        };
        resArr[keyObj] = currPair;
      }
    })();

    return resArr;
  };

  // Переводит num в струку из двух символов
  toTwo = num => (num < 10 ? "0" + String(num) : String(num));

  numForPair = (pageQuantity, pairNumber) => {
    // Функция возвращает номера полос разворота в виде массива номеров полос (левая и правая)
    // Массив из номеров полос: левая полоса и правая
    let res = [null, null];

    if (pairNumber === 1) {
      res[0] = this.toTwo(pageQuantity);
      res[1] = this.toTwo(pairNumber);
    } else {
      res[0] = this.toTwo(pairNumber * 2 - 2);
      res[1] = this.toTwo(pairNumber * 2 - 1);
    }
    return res;
  };

  render() {
    return (
      <main className="main-block">
        <section className="page-section">
          <h1 className="visually-hidden">Раскладка полос</h1>
          <div className="page-grid-container">
            {this.renderPagePairList(this.getPageQuantity())}
          </div>
        </section>
      </main>
    );
  }

  renderPagePairList = PageQuantity => {
    const state = this.state;
    let elList = [];
    let el = null;

    for (let i = 1; i <= PageQuantity / 2; i++) {
      el = (
        <PagePair
          key={this.toTwo(i)}
          statePage={state[this.toTwo(i)]}
          handleOnClickMakeup={this.handleOnClickMakeUp(i)}
          handleOnClickPhoto={this.handleOnClickPhoto(i)}
          handleOnClickDelegated={this.handleOnClickDelegated(i)}
        />
      );
      elList.push(el);
    }

    return elList;
  };

  handleOnClickMakeUp = pagePairNumber => posLR => ev => {
    const pagePairNumStr = this.toTwo(pagePairNumber);
    const state = this.state[pagePairNumStr];
    const stateTmp = Object.assign({}, state);
    stateTmp[posLR].pageMakeup = !state[posLR].pageMakeup;
    this.setState({
      [state]: stateTmp
    });
  };

  handleOnClickPhoto = pagePairNumber => posLR => ev => {
    const pagePairNumStr = this.toTwo(pagePairNumber);
    const state = this.state[pagePairNumStr];
    const stateTmp = Object.assign({}, state);
    stateTmp[posLR].pagePhoto = !state[posLR].pagePhoto;
    this.setState({
      [state]: stateTmp
    });
  };
  
  handleOnClickDelegated = pagePairNumber => posLR => ev => {
    const pagePairNumStr = this.toTwo(pagePairNumber);
    const state = this.state[pagePairNumStr];
    const stateTmp = Object.assign({}, state);
    stateTmp[posLR].pageDelegated = !state[posLR].pageDelegated;
    this.setState({
      [state]: stateTmp
    });
  };
}

export default MainBlock;
