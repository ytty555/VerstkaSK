import React, { Component } from "react";
import PagePair from "./PagePair";
import { isColorPage } from "./proglogic";

class MainBlock extends Component {
  constructor(props) {
    super(props);

    this.state = this.generateStateArray(this.getPageQuantity());
  }

  getPageQuantity = () => 28;

  generateStateArray = pageQuantity => {
    const pairs = pageQuantity / 2;
    let resArr = {};

    // Первичное заполнение состояния
    (() => {
      for (let i = 1; i <= pairs; i++) {
        const keyObj = this.toTwo(i);
        const numForPair = this.numForPair(pageQuantity, i);
        const currPair = {
          left: {
            pageId: numForPair[0],
            pageColor: isColorPage(pageQuantity, numForPair[0]),
            pageMakeup: false,
            pagePhoto: false,
            pageDelegated: false
          },
          right: {
            pageId: numForPair[1],
            pageColor: isColorPage(pageQuantity, numForPair[1]),
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
    const info = this.getPageInfo();
    const pQuantity = info.pagesQuantity;
    const pMakeUp = info.pagesMakeUp;
    const pDelegated = info.pagesDelegated;

    return (
      <React.Fragment>
        <header className="header-main">
          <p className="header__info">
            Всего полос в номере: <span>{pQuantity}</span>
          </p>
          <p className="header__info">
            Сверстано полос: <span>{pMakeUp + pDelegated}</span>
          </p>
          <p className="header__info">
            Осталось сверстать:{" "}
            <span>{pQuantity - (pMakeUp + pDelegated)}</span>
          </p>
        </header>
        <main className="main-block">
          <section className="page-section">
            <h1 className="visually-hidden"> Раскладка полос </h1>
            <div className="page-grid-container">
              {" "}
              {this.renderPagePairList(this.getPageQuantity())}
            </div>
          </section>
        </main>
        <section className="control-panel">
          <ul>
            <li className="choose-pages">
              <input
                name="pages"
                type="radio"
                className="choose-pages__radio"
                id="24"
              />
              <label htmlFor="24">24 полос</label>
            </li>
            <li className="choose-pages">
              <input
                name="pages"
                type="radio"
                className="choose-pages__radio"
                id="28"
              />
              <label htmlFor="28">28 полос</label>
            </li>
            <li className="choose-pages">
              <input
                name="pages"
                type="radio"
                className="choose-pages__radio"
                id="32"
              />
              <label htmlFor="32">32 полос</label>
            </li>
          </ul>
          <button>Создать раскладку</button>
        </section>
      </React.Fragment>
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
    stateTmp[posLR].pageDelegated =
      stateTmp[posLR].pageDelegated && stateTmp[posLR].pageMakeup
        ? false
        : stateTmp[posLR].pageDelegated;
    stateTmp[posLR].pagePhoto = !stateTmp[posLR].pageMakeup
      ? false
      : stateTmp[posLR].pagePhoto;
    this.setState({
      [state]: stateTmp
    });
  };

  handleOnClickPhoto = pagePairNumber => posLR => ev => {
    const pagePairNumStr = this.toTwo(pagePairNumber);
    const state = this.state[pagePairNumStr];
    const stateTmp = Object.assign({}, state);
    if (!stateTmp[posLR].pageMakeup) return;
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
    stateTmp[posLR].pageMakeup =
      stateTmp[posLR].pageMakeup && stateTmp[posLR].pageDelegated
        ? false
        : stateTmp[posLR].pageMakeup;
    stateTmp[posLR].pagePhoto = !stateTmp[posLR].pageMakeup
      ? false
      : stateTmp[posLR].pagePhoto;
    this.setState({
      [state]: stateTmp
    });
  };

  // получаем сводную информацию по полосам из state
  getPageInfo = () => {
    const currState = this.state;
    let pagesDelegated = 0;
    let pagesMakeUp = 0;
    let pagesPhoto = 0;
    let res = {};
    console.log("State --", currState);

    for (let pair in currState) {
      if (pair === "[object Object]") break;
      for (let page in currState[pair]) {
        const currPage = currState[pair][page];
        pagesDelegated += currPage.pageDelegated ? 1 : 0;
        pagesMakeUp += currPage.pageMakeup ? 1 : 0;
        pagesPhoto += currPage.pagePhoto ? 1 : 0;
      }
    }

    res.pagesQuantity = this.getPageQuantity();
    res.pagesDelegated = pagesDelegated;
    res.pagesMakeUp = pagesMakeUp;
    res.pagesPhoto = pagesPhoto;

    return res;
  };
}

export default MainBlock;
