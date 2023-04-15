import NotesContext from "./Notecontext";
import { useState } from "react";
const Notestate = (props) => {
  const host = "https://notevault-real.onrender.com";
  const s1 = [];
  const [notes, setnotes] = useState(s1);



  //fetching notes code here

  const getallnotes = async()=>{
    const response = await fetch(`${host}/user/notes/getnotes`, {
        method: "GET",
        headers: {
          "auth-token":localStorage.getItem("token")
        }
      });
      const json = await response.json();
      setnotes(json)
  }





  //adding notes code here
  const additem = async (title, description, tag) => {

    const response = await fetch(`${host}/user/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token"),
        },
        body: JSON.stringify({title, description, tag}),
      });
      let note = await response.json();
      setnotes(notes.concat(note.savednotes));
  };





  //delete note code here
  const deletenote = async (id) => {
    const response = await fetch(`${host}/user/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
        }
      });
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
  };




  //editing note code here
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/user/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json);
    //code to edit note on client-side
    let newnotes= JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setnotes(newnotes)
  };

  return (
    <NotesContext.Provider value={{ notes, additem, deletenote, editnote, getallnotes }}>
      {props.children}
    </NotesContext.Provider>
  );
};

export default Notestate;
