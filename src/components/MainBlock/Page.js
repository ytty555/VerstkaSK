import React from "react";
import PropTypes from "prop-types";

function Page({ position, pageState }) {
  const el = getElementsClassNames(position);
  const pageColor = pageState.pageColor ? " page_color" : "";

  return (
    <div className={el.pagePosition}>
      <div className={"page__el-color" + pageColor} />
      <div className="page__el-number">{pageState.pageId}</div>
      <button className="page__el-make-up" />
      <button className="page__el-photo" />
      <button className="page__el-delegated " />
    </div>
  );
}

function getElementsClassNames(position) {
  if (position === 0) {
    // левая полоса
    return {
      pagePosition: "page_pos_left"
    };
  } else if (position === 1) {
    // правая полоса
    return {
      pagePosition: "page_pos_right"
    };
  }
}

Page.propTypes = {
  position: PropTypes.number.isRequired,
  pageState: PropTypes.shape({
    pageId: PropTypes.number.isRequired,
    pageColor: PropTypes.bool.isRequired,
    pageMakeUp: PropTypes.bool.isRequired,
    pagePhoto: PropTypes.bool.isRequired,
    pageDelegated: PropTypes.bool.isRequired
  })
};

export default Page;
