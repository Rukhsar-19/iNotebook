const mongoose = require('mongoose');
const { Schema } = mongoose;
// use field user when user add notes dusra user na dekh saky notes ko

const NotesSchema = new Schema({
    user:{
        // using foreign key as objectid means User.js mein koi user k entry hu g user k jga userid store kary ga notes say user link 
    //    doing this type of we can store user
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'

    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    },
  });
  module.exports=mongoose.model('notes',NotesSchema);