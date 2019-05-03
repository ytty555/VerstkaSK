import React from "react";
import Page from "./Page";

function PagePair(props) {

    const pageStateLeft = {
      pageId: 14,
      pageColor: true,
      pageMakeUp: false,
      pagePhoto: false,
      pageDelegated: true,
    };

    const pageStateRight = {
      pageId: 15,
      pageColor: false,
      pageMakeUp: true,
      pagePhoto: true,
      pageDelegated: false,
    };

    return (
      <div className="page-pair">
        <img
          className="page-pair-background"
          src={require("../../img/pair.svg")}
          alt="Изображение разворота полос"
        />
        <Page
          position={0}
          pageState={pageStateLeft}
        />
        <Page
          position={1}
          pageState={pageStateRight}
        />
      </div>
    );
}

export default PagePair;
