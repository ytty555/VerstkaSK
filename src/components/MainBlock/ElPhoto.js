import React from 'react';

function ElPhoto(props) {
  let classN = 'page__el-photo ' + props.valueState;

  return (
    <button className={classN} onClick={props.onClickPhoto}>
    </button>
  );
}

export default ElPhoto