import React, { Component } from "react";
import PagePair from "./PagePair";
import {
  toTwo,
  getPageQuantity,
  getPageInfo,
  generateStateArray
} from "./proglogic";

class MainBlock extends Component {
  constructor(props) {
    super(props);

    this.state = generateStateArray(getPageQuantity());
  }

  

  render() {
    const info = getPageInfo(this.state);
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
              {this.renderPagePairList(getPageQuantity())}
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
          key={toTwo(i)}
          statePage={state[toTwo(i)]}
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
    const pagePairNumStr = toTwo(pagePairNumber);
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
    const pagePairNumStr = toTwo(pagePairNumber);
    const state = this.state[pagePairNumStr];
    const stateTmp = Object.assign({}, state);
    if (!stateTmp[posLR].pageMakeup) return;
    stateTmp[posLR].pagePhoto = !state[posLR].pagePhoto;
    this.setState({
      [state]: stateTmp
    });
  };

  handleOnClickDelegated = pagePairNumber => posLR => ev => {
    const pagePairNumStr = toTwo(pagePairNumber);
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
}

export default MainBlock;
