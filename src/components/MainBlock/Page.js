import React from "react";
import PropTypes from "prop-types";

function Page({ position, pageState, onClick }) {
  const el = getElementsClassNames(position);
  const pageColor = pageState.pageColor ? " page_color" : "";
  const pageMakeUp = pageState.pageMakeUp ? " page_make-up" : "";
  const pagePhoto = pageState.pagePhoto ? " page_photo" : "";
  const pageDelegated = pageState.pageDelegated ? " page_delegated" : "";
  const pageClassName =
    "page" +
    el.pagePosition +
    pageColor +
    pageMakeUp +
    pagePhoto +
    pageDelegated;
  const { pageId } = pageState;

  return (
    <div className={pageClassName}>
      <div className="page__el-background" />
      <div className="page__el-color" />
      <div className="page__el-number">{pageId}</div>
      {/* controls */}
      <button className="page__el-make-up" onClick={onClick} />
      <button className="page__el-photo" />
      <button className="page__el-delegated " />
    </div>
  );
}

function getElementsClassNames(position) {
  if (position === 0) {
    // левая полоса
    return {
      pagePosition: " page_pos_left"
    };
  } else if (position === 1) {
    // правая полоса
    return {
      pagePosition: " page_pos_right"
    };
  }
}

// Page.propTypes = {
//   position: PropTypes.number.isRequired,
//   pageState: PropTypes.shape({
//     pageId: PropTypes.number.isRequired,
//     pageColor: PropTypes.bool.isRequired,
//     pageMakeUp: PropTypes.bool.isRequired,
//     pagePhoto: PropTypes.bool.isRequired,
//     pageDelegated: PropTypes.bool.isRequired
//   })
// };

export default Page;
