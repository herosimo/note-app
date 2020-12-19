import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Content from "./components/content/Content";
import Alert from "./components/UI/Alert";

function App() {
    const [noteBar, setNoteBar] = useState(false);
    const [noteLists, setNoteLists] = useState([]);
    const [activeNote, setActiveNote] = useState();
    const [activeNoteId, setActiveNoteId] = useState();
    const [alert, setAlert] = useState();

    const apiUrl = "https://note-app-9a9fe.firebaseio.com";

    // Add note handler
    const addNoteHandler = () => {
        setNoteBar(true);
        setActiveNote();
        setActiveNoteId();
    };

    // Save note handler
    const saveNoteHandler = (notes) => {
        fetch(`${apiUrl}/notes.json`, {
            method: "POST",
            body: JSON.stringify(notes),
            headers: { "Content-Type": "application/json" },
        })
            .then(() => {
                setAlert();
                setNoteBar(false);
                setAlert("save");
            })
            .catch((error) => setAlert("error"));
    };

    // Edit note handler
    const editNoteHandler = (id) => {
        let noteDetail = noteLists.filter((noteList) => {
            return noteList.id === id;
        });
        setActiveNoteId(id);
        setActiveNote(noteDetail);
        setNoteBar(true);
    };

    // Save after editing note handler
    const saveEditNoteHandler = (notes) => {
        fetch(`${apiUrl}/notes/${activeNoteId}.json`, {
            method: "PATCH",
            body: JSON.stringify(notes),
            headers: { "Content-Type": "application/json" },
        })
            .then(() => {
                setAlert();
                setAlert("save");
            })
            .catch((error) => setAlert("error"));
    };

    // Delete note
    const deleteNoteHandler = () => {
        fetch(`${apiUrl}/notes/${activeNoteId}.json`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then(() => {
                setAlert();
                setNoteBar(false);
                setActiveNote();
                setActiveNoteId();
                setAlert("delete");
            })
            .catch((error) => setAlert("error"));
    };

    // Get notes
    useEffect(() => {
        fetch(`${apiUrl}/notes.json?orderBy="date"&startAt=0`)
            .then((response) => response.json())
            .then((data) => {
                const updatedNoteLists = [];
                for (const key in data) {
                    updatedNoteLists.push({
                        id: key,
                        title: data[key].title,
                        note: data[key].note,
                        date: data[key].date,
                    });
                }
                // SetNoteList with reverse order, higher date will appear first
                setNoteLists(updatedNoteLists.reverse());
            })
            .catch((error) => setAlert("error"));
    }, [alert]);

    // Check if content bar is open
    let contentBar;
    if (noteBar) {
        // Check if content bar is new or edit mode
        let saveNoteFunction;
        activeNoteId
            ? (saveNoteFunction = saveEditNoteHandler)
            : (saveNoteFunction = saveNoteHandler);

        contentBar = (
            <Content
                saveNoteHandler={saveNoteFunction}
                activeNote={activeNote}
                deleteNoteHandler={deleteNoteHandler}
            />
        );
    }

    return (
        <div className="App">
            <div className="container-fluid py-3">
                <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <Navbar
                            addNoteHandler={addNoteHandler}
                            noteLists={noteLists}
                            editNoteHandler={editNoteHandler}
                            activeNoteId={activeNoteId}
                        />
                    </div>
                    <div className="col-md-8">{contentBar}</div>
                </div>
            </div>

            {/* ALERT NOTIFICATION */}
            <Alert message={alert} />
        </div>
    );
}

export default App;
