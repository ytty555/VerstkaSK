import React from "react";
import statePage from "../../decorators/statePage";
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
        onClick={props.handleOnMakeup(left)}
      />
      <Page
        position={right}
        pageState={props.statePage.right}
        onClick={props.handleOnMakeup(right)}
      />
    </div>
  );
}

export default statePage(PagePair);
