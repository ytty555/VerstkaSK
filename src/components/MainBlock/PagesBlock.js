import React from "react";
import PagePair from "./PagePair";
import { getPageQuantity, toTwo } from "./proglogic";

export default function PagesBlock(props) {
  return (
    <React.Fragment>
      <main className="main-block">
        <section className="page-section">
          <h1 className="visually-hidden"> Раскладка полос </h1>
          <div className="page-grid-container">
            {renderPagePairList(getPageQuantity(), props)}
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}

const renderPagePairList = (PageQuantity, props) => {
  const {
    state,
    handleOnClickMakeUp,
    handleOnClickPhoto,
    handleOnClickDelegated
  } = props;
  let elList = [];
  let el = null;

  for (let i = 1; i <= PageQuantity / 2; i++) {
    el = (
      <PagePair
        key={toTwo(i)}
        statePage={state[toTwo(i)]}
        handleOnClickMakeup={handleOnClickMakeUp(i)}
        handleOnClickPhoto={handleOnClickPhoto(i)}
        handleOnClickDelegated={handleOnClickDelegated(i)}
      />
    );
    elList.push(el);
  }

  return elList;
};
