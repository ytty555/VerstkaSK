import React from 'react';

function ElMakeUp(props) {
  let classN = 'page__el-make-up ' + props.valueState;
  return (
    <button className={classN} onClick={props.onClickMakeUp}></button>
  );
}

export default ElMakeUp