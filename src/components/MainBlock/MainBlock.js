import React, { Component } from "react";
import PagesBlock from "./PagesBlock";
import { toTwo, getPageInfo, getPagesState } from "./proglogic";

class MainBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagesState: getPagesState(0),
      pagesQuantity: 0
    };
  }

  render() {
    const info = getPageInfo(this.state.pagesQuantity, this.state.pagesState);
    const pQuantity = this.state.pagesQuantity;
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
            Осталось сверстать:
            <span>{pQuantity - (pMakeUp + pDelegated)}</span>
          </p>
        </header>
        <PagesBlock
          pagesQuantity={this.getPagesQuantity(this.state)}
          pagesState={this.state.pagesState}
          handleOnClickMakeUp={this.handleOnClickMakeUp}
          handleOnClickPhoto={this.handleOnClickPhoto}
          handleOnClickDelegated={this.handleOnClickDelegated}
        />
        {/* <PagesBlock pagesQuantity={28} /> */}
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
          <button onClick={this.handleNewPagesField}>Создать раскладку</button>
        </section>
      </React.Fragment>
    );
  }

  getPagesQuantity = state => {
    return parseInt(state.pagesQuantity);
  };

  handleNewPagesField = () => {
    const radio = document.getElementsByClassName("choose-pages__radio");
    let res = null;

    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        res = parseInt(radio[i].id);
      }
    }
    this.setState({
      pagesState: getPagesState(res),
      pagesQuantity: res
    });
  };

  handleOnClickMakeUp = pagePairNumber => posLR => ev => {
    const pagePairNumStr = toTwo(pagePairNumber);
    const state = this.state.pagesState[pagePairNumStr];
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
    const state = this.state.pagesState[pagePairNumStr];
    const stateTmp = Object.assign({}, state);
    if (!stateTmp[posLR].pageMakeup) return;
    stateTmp[posLR].pagePhoto = !state[posLR].pagePhoto;
    this.setState({
      [state]: stateTmp
    });
  };

  handleOnClickDelegated = pagePairNumber => posLR => ev => {
    const pagePairNumStr = toTwo(pagePairNumber);
    const state = this.state.pagesState[pagePairNumStr];
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
