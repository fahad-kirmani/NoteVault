import React, { useContext } from "react";
import NotesContext from "../context/Notecontext";

export default function Notecard (props)  {
  const context = useContext(NotesContext);
  const { deletenote } = context;
  const { notes,update,showmsg } = props;
  return (
    <div className="col-md-3 my-2">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{notes.title}</h5>
        <p className="card-text">
         {notes.description}
        </p>
        <div className="d-flex">
        <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(notes._id);
          showmsg(" Note has been Deleted !", "danger")
        }}></i>
        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{ update(notes) }}></i>
        </div>
      </div>
    </div>
    </div>
  );
};