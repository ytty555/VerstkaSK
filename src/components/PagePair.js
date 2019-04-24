import React from 'react';
import Page from './Page';

function PagePair(props) {
    return (
        <div className="page-pair">
            <img className="page-pair-background" src={require('../img/pair.svg')} alt="Изображение разворота полос" />
            <Page
                pos='page_pos_left'
                pageState={props.stateLeftPage}
            />
            <Page
                pos='page_pos_right'
                pageState={props.stateRightPage}
            />
        </div>
    );
}

export default PagePair