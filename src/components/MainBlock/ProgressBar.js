import React from "react";

function ProgressBar(props) {
  const value = props.percentMakeUp;

  return (
    <React.Fragment>
      <div className="progress_bg">
        <div className="progress_border">
          <div className="progress_bar" style={{ width: value }}>
            <p className="progress_percent">{value}</p>
          </div>
        </div>
      </div>
    </React.Fragment >
  );
}

export default ProgressBar;