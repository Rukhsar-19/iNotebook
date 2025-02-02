const express=require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const  bcrypt = require('bcryptjs');
const fetchuser=require('../middleware/fetchuser');
const jwt = require('jsonwebtoken');


//Route1  create a User using:POST"/api/auth/createuser" end points auth request marni aur data bejna doesnot require auth no login
router.post('/createuser',[
   body('name','Enter a valid name').isLength({min:3}),
   body('email','Enter a valid email').isEmail(),
   body('password','password must be atleast 5 characters').isLength({min:5}),

],async (req,res)=>{
   
   console.log(req.body);
   // errors is array multiple fresult gives if there are errors returns bad request and the errors
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()});
  }
//   check whether the  user with this email exists already findone methiod yeh user day ga jis k email hu yeh
try{ 

let user= await User.findOne({email:req.body.email}); 
  if (user){
    // if user  with this email already exist return bad request
    return res.status(400).json({err:"Sorry a user with this email already exist"})
  }
  //  create a salt after this password generate with hash
  const salt= await bcrypt.genSalt(10);
 const  secPass=await bcrypt.hash(req.body.password,salt)
  // create a new user
   user=await User.create({
      name:req.body.name,
      email:req.body.email,
      //  create varible secPass for password install a jsonwebtoken authentication if user login give token we usejwt
    // aik tareqa user ko verify karnay ka jwt  client and server secure authenticationbar bar user id,password authenticate give user a token jwt(jwt.io)
      password:secPass
    });
   // .then(user=>res.json(user))
   //     .catch(err=>console.log(err),
   //     res.json({error:'please enter a unique value for email', message:err.message}))
   // //  const user=User(req.body);
   //  user.save()
   //  res.send(req.body);
   const data={
user:{
  id:user.id
}
   }
  //  use jwt for auththtication and generates a token 
   const jwt_secret = "your_secret_key";
   const authtoken= jwt.sign(data,jwt_secret);


  // console.log(jwtData);
   res.json({authtoken});
  }
  // error lock 
    catch(error){
      console.error(error.message);
      res.status(500).send("internal server error occured");
    }
    })

// Route2  authenticate a User using:POST"/api/auth/login"  name of end points is login no login required

router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  // body('password','password must be atleast 5 characters').isLength({min:5}),
  body('password','password can not be blank') .exists(),

],async (req,res)=>{

  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  // using destructing bahir nilku g eamil ,password requst.body say
  const {email,password}=req.body;
//  user ko niklun in try if user not exist email.paasword
  try{
    let user=await User.findOne({email});
    // agr user exist h nai karta tu bad request status send karu
    if(!user){
      
      return res.status(400).json({error:"plz try to login with correct credentials"});
    }
//  compare password with bcrypt using await promises
const passwordCompare= await bcrypt.compare(password,user.password);
if(!passwordCompare){
  
  return res.status(400).json({error:"plz try to login with correct credentials"});
}
// payload data hai user k ju beju ga

const data={
  user:{
    id:user.id
  }
     }
    //  use jwt for auththtication and generates a token 
     const jwt_secret = "your_secret_key";
     const authtoken= jwt.sign(data,jwt_secret);
  
     
    // console.log(jwtData);
     res.json({authtoken})
    }
   catch(error){
   console.error(error.message);
    res.status(500).send("internal server error occured");
   }
  });

// Route3 Get login User details using  POST"/api/auth/getuser" login required  means humy JWT token bejna hu ga

router.post('/getuser',fetchuser,async (req,res)=>{
// agr menay user k id lenay k code yahan likh diya  tu code har endpoints pay use karna hu ga jahan authentication k zaroorat hai 
// we use middle ware middleware is a function ju kay call kiya jay ga jab login waly routes pay request ay g tou fetchuser is a middleware
try {
   userId=req.user.id;
  //  select all fields except password authtoken decode kay bad userid nikalni pary g hum header bej day gay user authentication header mein say 
  // data nikal kar fetch kar lun ga
  const user= await User.findById(userId).select("-password")
    res.send(user)
  
} catch (error) {
  console.error(error.message);
    res.status(500).send("internal server error occured");
}
})
 module.exports=router
