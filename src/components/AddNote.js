import React, { useContext,useState } from 'react'
import noteContext from"../context/notes/noteContext"
const AddNote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    // eslint-disable-next-line
    const [note,setNotes]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
      // page reload na hu
      e.preventDefault();
     addNote(note.title,note.description,note.tag);
    //  agr hum khali kary notes ko
     setNotes({title:"",description:"",tag:""})
     props.showAlert("Added  Successfully","success");  
  }

    const onChange=(e)=>{
   setNotes({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">    Title</label>
          <input type="text" className="form-control" id="title" name="title"aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag"  value={note.tag} onChange={onChange} minLength={5} required />
        </div>
        {/* jab tab validation puri na hu button ko disable kar du jab tak title aur description k lenght bari na hu 5 say */}
        <button  disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
    </div>
  )
}

export default AddNote
