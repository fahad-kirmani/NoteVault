import React,{useContext, useState} from 'react'
import NotesContext from '../context/Notecontext'

export const Additem = (props) => {
    const arr= useContext(NotesContext)
    const {additem}=arr
    const [note, setnote] = useState({title:"", description:"", tag:""})
    const handleclick=(e)=>{
        e.preventDefault()
        additem(note.title, note.description , note.tag)
        props.showmsg("Note Added Successfully", "success")
    }
    const handlechange=(e)=>{
        setnote({...note, [e.target.name]:e.target.value} )
    }

      return (
        <>
        <div className="continer my-3">
        <h1 className="addnote my-4">Add Your Notes</h1>
        <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label titl">Title</label>
        <input type="text" className="form-control" id="title" name="title" onChange={handlechange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label descr">Description</label>
        <input type="text" className="form-control" id="description" name="description" onChange={handlechange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label descr">tag</label>
        <input type="text" className="form-control" id="tag" name="tag" onChange={handlechange}/>
      </div>
      <div className="btn my-2" disabled={note.title.length<=3 || note.description.length <= 10 } onClick={handleclick}>Add! <i className="fa-solid fa-plus "></i></div>
    </form>
    </div>
 </>
      )
}
