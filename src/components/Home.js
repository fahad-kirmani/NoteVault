import React,{useContext, useState, useRef} from 'react'
import NotesContext from '../context/Notecontext'
import { Noteitem } from "./Noteitem";
import { Additem } from "./Additem";

export default function Home(props) {
    const {showmsg} = props

    const ref = useRef("")
    const refclose = useRef("")

    const arr= useContext(NotesContext)

    const {editnote}=arr
    const [note, setnote] = useState({id:"" ,etitle:"", edescription:"", etag:""})

    const update=(currentnote)=>{
        ref.current.click()
        console.log(currentnote._id);
        setnote({id:currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag})
        
    }


    const handleclick=(e)=>{
        refclose.current.click()  
        editnote(note.id, note.etitle, note.edescription , note.etag)
        props.showmsg(" Note has been Updated!", "success")
    }

    const handlechange=(e)=>{
        setnote({...note, [e.target.name]:e.target.value} )
    }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <div className="mb-3">
        <label htmlFor="title" className="form-label titl">Title</label>
        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handlechange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label descr">Description</label>
        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handlechange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label descr">tag</label>
        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handlechange}/>
      </div>
      </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary bl"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button type="button"  className="btn btn-primary bl" onClick={handleclick}>
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-10">
        <div className="container">
          <Additem showmsg={showmsg}/>
          <Noteitem update={update} showmsg={showmsg}/>
        </div>
      </div>
    </>
  );
}
