import React, { useContext, useEffect } from "react";
import NotesContext from "../context/Notecontext";
import Notecard from "./Notecard";
import { useNavigate } from "react-router-dom";

export const Noteitem = (props) => {
  const arr = useContext(NotesContext);
  const { notes, getallnotes } = arr;
  const {update,showmsg} = props
  let navigate = useNavigate();
  useEffect(() => {
    
    if(localStorage.getItem("token"))
    {
    getallnotes()
    
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <div className="row ">
        <h1 className="notes my-4">Your Notes</h1>
        {notes.map((notes) => {
          return <Notecard key={notes._id} notes={notes} update={update} showmsg={showmsg}/>;
        })}
      </div>
    </>
  );
};
