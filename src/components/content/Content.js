import React, { useState, useEffect } from "react";

const Content = ({ saveNoteHandler, activeNote, deleteNoteHandler }) => {
    const [title, setTitle] = useState("New Note");
    const [note, setNote] = useState("");

    useEffect(() => {
        // Check if editing note, then give value from db
        if (activeNote) {
            setTitle(activeNote[0].title);
            setNote(activeNote[0].note);
        } else {
            setTitle("New Note");
            setNote("");
        }
    }, [activeNote]);

    const saveNote = () => {
        // Generate Date
        let time = new Date(new Date().toString().split("GMT")[0] + " UTC")
            .toISOString()
            .split(".")[0]
            .replace("T", " ");

        saveNoteHandler({
            title,
            note,
            date: time,
        });
    };

    // Check if editing note, then show the delete button
    let deleteButton;
    if (activeNote) {
        deleteButton = (
            <button type="button" className="btn btn-sm btn-danger" onClick={deleteNoteHandler}>
                Delete
            </button>
        );
    }

    return (
        <>
            <div className="card border-success mb-3 w-100 ">
                <div className="card-header border-success d-flex justify-content-between align-items-center">
                    <input
                        type="text"
                        className="input-title card-title my-0 mr-3 h5"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-sm btn-primary mr-2"
                        onClick={saveNote}
                    >
                        Save
                    </button>
                    {deleteButton}
                </div>
                <div className="card-body text-dark overflow-content">
                    <textarea
                        className="input-textarea"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        autoFocus
                    ></textarea>
                </div>
            </div>
        </>
    );
};

export default Content;
