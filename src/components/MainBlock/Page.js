import React from "react";

function Page({
  position,
  pageState,
  onClickMakeup,
  onClickPhoto,
  onClickDelegated
}) {
  const el = getElementsClassNames(position);
  const pageColor = pageState.pageColor ? " page_color" : "";
  const pageMakeUp = pageState.pageMakeup ? " page_make-up" : "";
  const pagePhoto = pageState.pagePhoto ? " page_photo" : "";
  const pageDelegated = pageState.pageDelegated ? " page_delegated" : "";
  const pageClassName =
    "page" +
    el.pagePosition +
    pageColor +
    pagePhoto +
    pageMakeUp +
    pageDelegated;
  const { pageId } = pageState;

  return (
    <div className={pageClassName}>
      <div className="page__el-background" />
      <div className="page__el-color" />
      <div className="page__el-number">{pageId}</div>
      {/* controls */}
      <button className="page__el-make-up" onClick={onClickMakeup} />
      <button className={el.pageElPhoto} onClick={onClickPhoto} />
      <button className="page__el-delegated" onClick={onClickDelegated} />
    </div>
  );
}

function getElementsClassNames(position) {
  if (position === 0) {
    // левая полоса
    return {
      pagePosition: " page_pos_left",
      pageElPhoto: "page__el-photo_left"
    };
  } else if (position === 1) {
    // правая полоса
    return {
      pagePosition: " page_pos_right",
      pageElPhoto: "page__el-photo_right"
    };
  }
}

export default Page;
