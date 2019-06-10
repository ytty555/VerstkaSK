import React from "react";

function ProgressBar(props) {
    const value = props.percentMakeUp;
    return (
        <React.Fragment>
            <div className="progress_bg">
                <div className="progress_bar">

                </div>
            </div>
            <p className="progress_percent">{value}</p>
        </React.Fragment>
    );
}

export default ProgressBar;