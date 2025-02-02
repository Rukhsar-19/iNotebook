// import React, { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";



// aik bar context is tarha bna lya bar bar aesy h banan hai
const NoteState=(props)=>{
  const host="http://localhost:5000"
// value={state} provide by notestate syntax is ist create contextapi in noteContext 
//  context api use karny kay liya aik function bna du  ju cheez provide karna chahty hu wuh value={state} andar dal du
//  in NoteState make method to update usestate
const notesInitial=[]
  const [notes,setNotes]=useState(notesInitial);
// get all notes fetch 
const getNotes=async ()=>{
  // call a fetch api  todo api call fetch all notes api call
  
  const response=await fetch(`${host}/api/notes/fetchallnotes`,{
    method:'GET',
    headers:{
    'Content-Type':'application/json',
     "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5YmM0MDVmOGU0YWQ3YTQ2MDZmOWQ0In0sImlhdCI6MTczODI2MTUwOX0.yyqAXL6M488BkL7cUB5NqhFypn5DC-kHefb9Yl5fX9k"
     
    // "auth-token":localStorage.getItem('token')
   },
    
    });
    // asychronus function hai
     const json=await response.json()
  
    //   setNotes(json.notes)
  
    setNotes(json)
   }
  

// add a note function  notes array ko push karna hu ga ju b note push karna chahty hu push karu
// date,id ,user automatically generate database user is also automatically generarte becaz hum token bejay gay header kay andar
const addNote=async (title,description,tag)=>{
// call a fetch api  todo api call

const response=await fetch(`${host}/api/notes/addnote`,{
  method:'POST',
  headers:{
  'Content-Type':'application/json',
   'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4NjZiY2UxYzAyZmUxZTJhMWVlNzI5In0sImlhdCI6MTczNzAzNDcwMX0.rV1wasTXfTzGUS8g8Kqa68MTBV6gWtq80Z_caB0N6mk"
// "auth-token":localStorage.getItem('token')
 },
  body:JSON.stringify({title,description,tag})
  });
   const note=await response.json();
 
 setNotes(notes.concat(note))
}



// Delete a note make a function noteid lay ga delete karny 
const deleteNote=async(id)=>{
  // TODO:Api call
  const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
    method:'DELETE',
    headers:{
    'Content-Type':'application/json',
  //    "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5YmM0MDVmOGU0YWQ3YTQ2MDZmOWQ0In0sImlhdCI6MTczODI2MTUwOX0.yyqAXL6M488BkL7cUB5NqhFypn5DC-kHefb9Yl5fX9k"
     
   "auth-token":localStorage.getItem('token')
   }
    
    });
    // asychronus function hai
    const json=await response.json();
    console.log(json)
  
  
  
console.log("deleting the node with id" +id);
const newNotes=notes.filter((note)=>{return note._id!==id})
setNotes(newNotes)
}



// Edit a note function
const editNote=async(id,title,description,tag)=>{
// Api call
const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
  method:'PUT',
  headers:{
  'Content-Type':'application/json',
    'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4NjZiY2UxYzAyZmUxZTJhMWVlNzI5In0sImlhdCI6MTczNzAzNDcwMX0.rV1wasTXfTzGUS8g8Kqa68MTBV6gWtq80Z_caB0N6mk"
  // // "auth-token":localStorage.getItem('token')
},
  body:JSON.stringify({title,description,tag})
  });
   const json= await response.json();
   console.log(json)
  // deep copy ban jay g
  let newNotes=JSON.parse(JSON.stringify(notes))
  


// Edit to logic in client
for (let index = 0; index < notes.length; index++) {
  const element = newNotes[index];
  if(element._id===id){
    // element is constant function k varaiable  mujay i mein change karna hainotes[index]
    newNotes[index].title=title;
    newNotes[index].description=description;
    newNotes[index].tag=tag;
    break; 
  }

}  
console.log(newNotes,id);
setNotes(newNotes);
}


return(
    // NoteContext jab b kis cheez ko wrap karu gay us kay andar sary kay sary children ajay gay
<NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>
{props.children}
</NoteContext.Provider>
)
}
export default NoteState;