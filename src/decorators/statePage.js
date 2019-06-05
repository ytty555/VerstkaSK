import React from "react";

export default OrigComponent =>
  class StatePage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        left: {
          pageId: 14,
          pageColor: false,
          pageMakeUp: false,
          pagePhoto: false,
          pageDelegated: false
        },
        right: {
          pageId: 15,
          pageColor: false,
          pageMakeUp: false,
          pagePhoto: false,
          pageDelegated: false
        }
      };
    }

    render() {
      return (
        <OrigComponent
          {...this.props}
          statePage={this.state}
          handleOnMakeup={this.handleOnMakeup}
        />
      );
    }

    handleOnMakeup = i => ev => {
      const objKey = i ? "right" : "left";
      const statePage = Object.assign({}, this.state[objKey]);
      statePage.pageMakeUp = !statePage.pageMakeUp;
      this.setState({
        [objKey]: statePage
      });
    };
  };
