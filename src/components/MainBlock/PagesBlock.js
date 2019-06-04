import React from "react";
import PagePair from "./PagePair";
import { toTwo } from "./proglogic";

function PagesBlock(props) {
  const renderPagePairList = pagesQuantity => {
    let elList = [];
    let el = null;
    for (let i = 1; i <= pagesQuantity / 2; i++) {
      el = (
        <PagePair
          key={toTwo(i)}
          statePage={props.pagesState[toTwo(i)]}
          handleOnClickMakeup={props.handleOnClickMakeUp(i)}
          handleOnClickPhoto={props.handleOnClickPhoto(i)}
          handleOnClickDelegated={props.handleOnClickDelegated(i)}
        />
      );
      elList.push(el);
    }

    return elList;
  };

  let pBlock = pagesQuantity => {
    if (pagesQuantity) {
      // this.state = getPagesState(this.props.pagesQuantity);
      return (
        <React.Fragment>
          <h1 className="visually-hidden"> Раскладка полос </h1>
          <div className="page-grid-container">
            {renderPagePairList(pagesQuantity)}
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

  return (
    <React.Fragment>
      <main className="main-block">
        <section className="page-section">
          {pBlock(props.pagesQuantity)}
        </section>
      </main>
    </React.Fragment>
  );
}

export default PagesBlock;
