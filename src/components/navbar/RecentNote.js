import React from "react";

const RecentNote = ({ noteList, editNoteHandler, activeNoteId }) => {
    // Check if activeItem, then give activeClass
    let className = "list-group-item text-left note-list";
    if (activeNoteId === noteList.id) {
        className = "list-group-item text-left note-list  border-success bg-light";
    }

    return (
        <li className={className} onClick={() => editNoteHandler(noteList.id)}>
            <h6 className="my-0">{noteList.title}</h6>
            <small className="text-muted">{noteList.date}</small>
        </li>
    );
};

export default RecentNote;
