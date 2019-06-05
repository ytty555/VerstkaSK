import React from "react";
import Page from "./Page";

function PagePair(props) {
  const left = 0;
  const right = 1;

  return (
    <div className="page-pair">
      <img
        className="page-pair-background"
        src={require("../../img/pair.svg")}
        alt="Изображение разворота полос"
      />
      <Page
        position={left}
        pageState={props.statePage.left}
        onClickMakeup={props.handleOnClickMakeup("left")}
        onClickPhoto={props.handleOnClickPhoto("left")}
        onClickDelegated={props.handleOnClickDelegated("left")}
      />
      <Page
        position={right}
        pageState={props.statePage.right}
        onClickMakeup={props.handleOnClickMakeup("right")}
        onClickPhoto={props.handleOnClickPhoto("right")}
        onClickDelegated={props.handleOnClickDelegated("right")}
      />
    </div>
  );
}

export default PagePair;
