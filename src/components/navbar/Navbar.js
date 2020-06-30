import React from "react";
import Header from "./Header";
import RecentNotes from "./RecentNotes";

const Navbar = ({ addNoteHandler, noteLists, editNoteHandler, activeNoteId }) => {
    return (
        <div>
            <Header addNoteHandler={addNoteHandler} />
            <RecentNotes
                noteLists={noteLists}
                editNoteHandler={editNoteHandler}
                activeNoteId={activeNoteId}
            />
        </div>
    );
};

export default Navbar;
