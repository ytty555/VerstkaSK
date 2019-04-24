import React from 'react';

function ElDelegated(props) {
    let classN = 'page__el-delegated ' + props.valueState;
    return (
        <button className={classN} onClick={props.onClickDelegated}></button>
    );
}

export default ElDelegated