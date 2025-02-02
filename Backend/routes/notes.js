const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
// Route1:Get all Notes using :GET "/api/notes/getuser"  login required
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
   const notes=await Note.find({user:req.user.id})
    res.json(notes)
})
// Route2:Add a new Note  using :POST "/api/notes/addnote"   login required
router.post('/addnote',fetchuser,[
   body('title','Enter a valid title').isLength({min:3}),
   body('description','description must be atleast 5 characters').isLength({min:5}),

],async (req,res)=>{
   try {
      const {title,description,tag}=req.body;
      console.log(req.body);
      // errors is array multiple fresult gives if there are errors returns bad request and the errors
      const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({errors:errors.array()});
     }
   const note=new Note({
   title,description,tag,user:req.user.id
   })
   const savedNote=await note.save()

    res.json(savedNote)
   }
 catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error occured");
    }
   })
// Route3:Update  an existing Note  using :POST "/api/notes/updatenote"   login required
// update a note tab kar sakhty jab ap wuhi user hu yeh na hu koi aur user usy update kar day
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
  const {title,description,tag}=req.body;
 //  create a newNote object
 const newNote={};
 // agr title arh as part of request tab mein isy newNote mein add kar dun ga warna
 if(title){newNote.title=title};
 if(description){newNote.description=description};
 if(tag){newNote.tag=tag};
 // Find the note to be updated and update it update karny kay liya find karna hu ga
 // req.params.id  is '/updatenote/:id' this one id mention in route put 
  let  note= await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}
 //  check karny kay liya user yehi hai ju note likha
 if(note.user.toString()!==req.user.id){
   return res.status(401).send("Not Allowed")

 }
note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note});


})
// Route4:Delete  an existing Note  using :Delete "/api/notes/deletenote"   login required
// delete a note tab kar sakhty jab ap wuhi user hu yeh na hu koi aur user usy update kar day
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
 // Find the note to be deleted and delete  it delete karny kay liya find karna hu ga
 // req.params.id  is '/updatenote/:id' this one id mention in route put 
  let  note= await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}
 //  Allow deletion only if user owns it 
 if(note.user.toString()!==req.user.id){
   return res.status(401).send("Not Allowed")

 }
note =await Note.findByIdAndDelete(req.params.id)
res.json({"Success": "note has been deleted",note:note});


})



   module.exports=router
