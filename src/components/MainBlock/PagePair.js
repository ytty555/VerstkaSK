import React, { Component } from 'react';
import Page from './Page';

class PagePair extends Component {
    constructor(props) {
        const pageState = {
            makeup: false,
            photo: false,
            delegated: false,
        }
        super(props);
        this.state = {
            stateLeftPage: pageState,
            stateRightPage: pageState,
        }
        this.handleClickMakeUp = this.handleClickMakeUp.bind(this);
        this.handleClickPhoto = this.handleClickPhoto.bind(this);
        this.handleClickDelegated = this.handleClickDelegated.bind(this);
    }

    handleClickMakeUp(PosMarker) {
        const currPairState = Object.assign({}, this.state);
        if (PosMarker === 0) {
            currPairState.stateLeftPage.makeup = !this.state.stateLeftPage.makeup;
            this.setState(() => ({
                stateLeftPage: currPairState.stateLeftPage,
            }));
        } else {
            currPairState.stateRightPage.makeup = !this.state.stateRightPage.makeup;
            this.setState(() => ({
                stateRightPage: currPairState.stateRightPage,
            }));
        }
    }

    handleClickPhoto(PosMarker) {
        // const currState = Object.assign({}, this.state);
        // currState.photo = !this.state.photo;
        // this.setState((state) => ({
        // photo: currState.photo,
        // }));
    }

    handleClickDelegated(PosMarker) {
        // const currState = Object.assign({}, this.state);
        // currState.delegated = !this.state.delegated;
        // this.setState((state) => ({
        // delegated: currState.delegated,
        // }));
    }

    render() {
        return (
            <div className="page-pair">
                <img className="page-pair-background" src={require('../../img/pair.svg')} alt="Изображение разворота полос" />
                <Page
                    pageNum={this.props.stateLeftPage.pageID}
                    pos='page_pos_left'
                    pageState={this.state.stateLeftPage}
                    onClickMakeUp={() => this.handleClickMakeUp(0)}
                    onClickPhoto={() => this.handleClickPhoto(0)}
                    onClickDelegated={() => this.handleClickDelegated(0)}
                />
                <Page
                    pageNum={this.props.stateRightPage.pageID}
                    pos='page_pos_right'
                    pageState={this.state.stateRightPage}
                    onClickMakeUp={(e) => this.handleClickMakeUp(1)}
                    onClickPhoto={() => this.handleClickPhoto(1)}
                    onClickDelegated={() => this.handleClickDelegated(1)}
                />
            </div>
        );
    }
}

export default PagePair