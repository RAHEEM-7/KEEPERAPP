import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const View = (props) => {
    const [note, setNote] = useState({
      title: props.til,
      content: props.con
    });
    function handleChange(event) {
        const {name, value} = event.target;
        setNote((prevNote) => {
          return (
            {
             ...prevNote,
              [name] : value
            });
        });
    }
    function submitNote(event) {
        props.onSave(note);
        event.preventDefault();
    }
    const myStyle = {
        // background: "#f5ba13",
        // borderRadius: 10,
        height: "50px",
        // color: "white",
        fontWeight: "bold",
        fontSize: "40px"
    };
    return (
        <div>
            <form className="create-note">
                <input style={myStyle}
                    name="title" 
                    value={note.title} 
                    placeholder="Title" 
                    onChange={handleChange}
                />
                <textarea 
                    name="content" 
                    value={note.content} 
                    placeholder="Add a Note" 
                    onChange={handleChange} 
                    rows = {15}
                />  
                <Fab onClick={submitNote}>
                    <AddIcon />
                </Fab>
            </form>
        </div>
    );
}

export default View;