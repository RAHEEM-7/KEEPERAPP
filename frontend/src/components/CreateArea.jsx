import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
function CreateArea(props) {
    const [note, setNote] = useState({
      title: "",
      content: ""
    });

    const [isExpanded, setExpanded] = useState(false);
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
      props.onAdd(note);
      setNote({
        title: "",
      content: ""
      });
      event.preventDefault();
    }
    return (
      <div>
        <form className="create-note">
          { isExpanded && (<input 
            name="title" 
            value={note.title} 
            placeholder="Title" 
            onChange={handleChange}
            />
          )}
          <textarea 
            name="content" 
            value={note.content} 
            placeholder="Add a Note" 
            onChange={handleChange} 
            onClick={() => setExpanded(true)}
            rows={isExpanded ? 3 : 1}
          />
          <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </div>
    );
}

export default CreateArea;