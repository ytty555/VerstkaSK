import React, { Component } from "react";
import PagesBlock from "./PagesBlock";
import { getPageInfo } from "./proglogic";

class MainBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagesQuantity: 0
    };
  }

  pBlock = (pagesQuantity) => {
    if (pagesQuantity) {
      return (
         <PagesBlock pagesQuantity={this.state.pagesQuantity} />
      )
    } else {
      return (
        <div></div>
      )
    }
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
            Осталось сверстать:
            <span>{pQuantity - (pMakeUp + pDelegated)}</span>
          </p>
        </header>
        {/* <PagesBlock pagesQuantity={this.state.pagesQuantity} /> */}
        {this.pBlock(this.state.pagesQuantity)}
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

  handleNewPagesField = () => {
    const radio = document.getElementsByClassName('choose-pages__radio');
    let res = null;

    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        res = parseInt(radio[i].id);
      }
    }

    this.setState({pagesQuantity: res});
  };
}

export default MainBlock;
