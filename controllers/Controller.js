import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import userModel from "../models/model.js";

class Controller{

   static dashboard_get = (req,res)=>{

      // Handle the Valid User case
      /*
             req.session.valid_msg = "Cogratulation As a Valid User"
             req.session.valid_name = user_matched.name

      */

     const valid_msg = req.session.valid_msg
     delete  req.session.valid_msg

     const valid_name = req.session.valid_name
     delete req.session.valid_name

      res.render("dashboard.ejs",{valid_msg,valid_name})
   }

   static test_get = (req,res)=>{

         res.send("From Controller")
   

   }

   static signup_get =(req,res)=>{

      // Handle signup of a new user 
      /*
         req.session.signup_msg = "Plese Signup First"
            req.session.signup_usr_email = form_data.email
      */

            const signup_msg = req.session.signup_msg

            delete req.session.signup_msg

            const  signup_usr_email = req.session.signup_usr_email

            delete req.session.signup_usr_email

      res.render("signup.ejs",{signup_msg,signup_usr_email})
   }

   static signup_post = async (req,res)=>{

      //name=&email=&pwd=
        try{

            const form_data = req.body

            console.log(form_data)

            const user_matched = await userModel.findOne({email:form_data.email})

            if(!user_matched){
               
                  const hashed_pwd = await bcrypt.hash(form_data.pwd,12)

                  console.log(hashed_pwd)


                  const user_to_save = new userModel({
                        name : form_data.name ,
                        email : form_data.email ,
                        pwd   : hashed_pwd
                  })

                  const user_saved = await user_to_save.save()

                  // These session Variables will be used in login_get

                  req.session.msg_new = "Welcome As a new User !!!"
                  req.session.usr_new = user_saved.name
                  res.redirect('/login')






               //   res.send("User is a Brand New user")
            }
            else{
                 
               
                  

                  req.session.ex_msg   = "This is an Existing User" 
                 
                  req.session.ex_usr_name = user_matched.name

                  // These session Variables will be used in login_get
                  
                  res.redirect("/login")
            }








         //   res.send(form_data)

        }catch(err){

            console.log(`Can not save User due to the Error Below \n ${err}`)
        }
       



   }

   static login_get = (req,res)=>{  

       // Handle the case of Existing User

       /*
                req.session.ex_msg   = "This is an Existing User" 
                 
                  req.session.ex_usr_name = user_matched.name

       */
       const ex_msg = req.session.ex_msg

       delete req.session.ex_msg

       const ex_usr_name = req.session.ex_usr_name

       delete  req.session.ex_usr_name

       // Handle the new User Case

       /*
                 req.session.msg_new = "Welcome As a new User !!!"
                  req.session.usr_new = user_saved.name
       */

         const  msg_new = req.session.msg_new
         
         delete req.session.msg_new

         const  usr_new = req.session.usr_new
         delete req.session.usr_new

       // Handle the Wrong Password case

       /*
         req.session.pwd_msg = "Please Enter Correct Password"
         req.session.name_wrong_pwd = user_matched.name
       */

         const pwd_msg = req.session.pwd_msg
         delete req.session.pwd_msg

         const name_wrong_pwd = req.session.name_wrong_pwd

      res.render('login.ejs',{ex_msg,ex_usr_name,usr_new,msg_new,pwd_msg,name_wrong_pwd})
   }
   static login_post = async (req,res)=>{
      
      try{
      
            const form_data = req.body

            const user_matched = await userModel.findOne({email:form_data.email})

           if(!user_matched){

            req.session.signup_msg = "Plese Signup First"
            req.session.signup_usr_email = form_data.email

            // use these session variables in signup_get 

            res.redirect("/signup")
           }
           else{

             const pwd_matched = await bcrypt.compare(form_data.pwd,user_matched.pwd)

             if(pwd_matched){
             
           //  res.send("User is Validated Login Successfull !!!")

             req.session.valid_msg = "Cogratulation As a Valid User"
             req.session.valid_name = user_matched.name

             // use these variables in dashboard_get

             res.redirect("/dashboard")
             }
             else{

               //   res.send("Please Enter Correct Password !!!")
               req.session.pwd_msg = "Please Enter Correct Password"
               req.session.name_wrong_pwd = user_matched.name

               // use these variables in login_get

               res.redirect("/login")
             }

           }


      }
      catch(err){
            console.log(`Can not Verify User Details due to the error below\n ${err}`)
      }



   }


}

export default Controller