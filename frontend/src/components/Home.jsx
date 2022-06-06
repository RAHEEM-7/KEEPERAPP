import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import axios from "axios";
import View from "./View";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isView, setView] = useState(0);
  const [id, setId] = useState("");
  const [titl, setTitl] = useState("");
  const [cont, setCont] = useState("");
  useEffect(() => {
    axios
      .get("/all")
      .then(res => setNotes(res.data))
      .catch(error => console.log(error));
  },[]);

  const addNote = (newNote) => {

    // const params = JSON.stringify({
    //   title: newNote.title,
    //   content: newNote.content
    // });
      axios
        .post("/add", {
          title: newNote.title,
          content: newNote.content
        }, {
          "headers": {
          "content-type": "application/json"
        },})
        .then(res => setNotes(res.data))
        .catch(error => console.log(error));     
  };

  const deleteNote = (id) => {
    axios
      .post("/del", {id: id})
      .then((res)=> setNotes(res.data))
      .catch(error => console.log(error));
  };

  const saveEditedNote = (editedNote) => {
    axios
      .post("/edit", {
        noteId: id,
        title: editedNote.title,
        content: editedNote.content
      }, {
        "headers": {
        "content-type": "application/json"
      },})
      .then(res => setNotes(res.data))
      .catch(error => console.log(error));
    
    setView((view) => !view);
  };
    
  const editNote = (id,titl,cont) => {
      setView((view) => !view);
      setId(id);
      setTitl(titl);
      setCont(cont);
  };

  return (
    <>
      <Header />
      { !isView && (<>
        <CreateArea onAdd={addNote}/>
        {notes.map((noteItem, index) => {
          return (
            <Note 
              key = {index}
              id = {index}
              title = {noteItem.title}
              content={noteItem.content}
              onDel={deleteNote}
              onEdit={editNote}
            />
          );
        })}
        </>
      )}
      { isView ? (
        <View 
          til = {titl}
          con = {cont}
          onSave = {saveEditedNote}
        />
      ) : null}
      <Footer />
    </>
  );
};

export default Home;