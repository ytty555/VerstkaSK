import React, { Component } from "react";
import PagePair from "./PagePair";
import { toTwo, getPagesState } from "./proglogic";


export default class PagesBlock extends Component {
  constructor(props) {
    super(props);
    this.state = getPagesState(this.props.pagesQuantity);
  }

  resetState = () => {
    const { pagesQuantity } = this.props;
    this.setState((state, props) => getPagesState(pagesQuantity));
  }

  pBlock = pagesQuantity => {
    if (pagesQuantity) {
      // this.state = generateStateArray(this.props.pagesQuantity);
      return (
        <React.Fragment>
          <h1 className="visually-hidden"> Раскладка полос </h1>
          <div className="page-grid-container">
            {this.renderPagePairList(this.props.pagesQuantity)}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h1> Раскладка полос не сформирована </h1>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <main className="main-block">
          <section className="page-section">
            {this.pBlock(this.props.pagesQuantity)}
          </section>
        </main>
      </React.Fragment>
    );
  }

  renderPagePairList = pagesQuantity => {
    let elList = [];
    let el = null;
    for (let i = 1; i <= pagesQuantity / 2; i++) {
      el = (
        <PagePair
          key={toTwo(i)}
          statePage={this.state[toTwo(i)]}
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
