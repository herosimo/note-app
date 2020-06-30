import React from "react";
import RecentNote from "./RecentNote";

const RecentNotes = ({ noteLists, editNoteHandler, activeNoteId }) => {
    return (
        <div className="card w-100 overflow-recentNotes">
            <ul className="list-group list-group-flush">
                {noteLists.map((noteList) => (
                    <RecentNote
                        key={noteList.id}
                        noteList={noteList}
                        editNoteHandler={editNoteHandler}
                        activeNoteId={activeNoteId}
                    />
                ))}
            </ul>
        </div>
    );
};

export default RecentNotes;
