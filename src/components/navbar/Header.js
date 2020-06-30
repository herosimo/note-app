import React from "react";

const Header = ({ addNoteHandler }) => {
    return (
        <React.Fragment>
            <div className="d-flex justify-content-between align-items-center rounded text-white bg-dark p-3 mb-3">
                <h5 className="m-0">Simple Note</h5>
                <button type="button" className="btn btn-sm btn-success" onClick={addNoteHandler}>
                    Add Note
                </button>
            </div>
        </React.Fragment>
    );
};

export default Header;
