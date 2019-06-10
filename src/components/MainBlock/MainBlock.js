import React, { Component } from "react";
import PagesBlock from "./PagesBlock";
import ChoosePages from "./ChoosePages";
import CommonInfo from "./CommonInfo";
import { toTwo, getPageInfo, getPagesState } from "./proglogic";

const nameStorage = "AllState";

class MainBlock extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialStateFromStorage(nameStorage)
  }

  initialStateFromStorage = nameStorage => {
    if (localStorage.getItem(nameStorage) !== null) {
      return JSON.parse(localStorage.getItem(nameStorage));
    } else {
      return {
        pagesState: getPagesState(0),
        pagesQuantity: 0,
      };
    }
  }

  setStateToStorage = nameStorage => {
    localStorage.setItem(nameStorage, JSON.stringify(this.state));
  }

  render() {
    const info = getPageInfo(this.state.pagesQuantity, this.state.pagesState);
    const pQuantity = this.state.pagesQuantity;

    return (
      <React.Fragment>
        <header className="header-main">
          <p className="header__info">
            Учет сверстанных полос
          </p>
        </header>
        <PagesBlock
          pagesQuantity={this.getPagesQuantity(this.state)}
          pagesState={this.state.pagesState}
          handleOnClickMakeUp={this.handleOnClickMakeUp}
          handleOnClickPhoto={this.handleOnClickPhoto}
          handleOnClickDelegated={this.handleOnClickDelegated}
        />
        <section className="control-panel">
          <ChoosePages handleNewPagesField={this.handleNewPagesField} />
          <CommonInfo pagesInfo={info} pagesQuantity={pQuantity} />
        </section>
      </React.Fragment>
    );
  }

  getPagesQuantity = state => {
    return parseInt(state.pagesQuantity);
  };

  handleNewPagesField = () => {
    const radio = document.getElementsByClassName("choose-pages__radio");
    let res = 0;

    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        res = parseInt(radio[i].id);
      }
    }
    this.setState({
      pagesState: getPagesState(res),
      pagesQuantity: res
    });

    this.setStateToStorage(nameStorage);
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
    this.setStateToStorage(nameStorage);
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
    this.setStateToStorage(nameStorage);
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
    this.setStateToStorage(nameStorage);
  };
}

export default MainBlock;
