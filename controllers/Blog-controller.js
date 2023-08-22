const Blogs=require('../model/Blog');
const User=require('../model/UserSchema')

const mongoose=require('mongoose');



const getAllBlogs=async(req,resp,next)=>{
     let blogs;

    try {
        
       blogs= await Blogs.find();

     } catch (error) {
        console.log(error);
    }

    if(!blogs){
        return resp.status(404).json({message:"No blogs found"});


    }

    return resp.status(200).json({blogs});




}

const addBlog=async(req,resp,next)=>{
    const{title,description,image,user}=req.body;

    let existingUser;
    try {
        existingUser=await User.findById(user);

        
    } catch (error) {
        return console.log(error);
    }

    if(!existingUser){
        return resp.status(400).json({message:"Uable to find the id"})    }

    const blog=new Blogs({
        title,description,image,user
    });

   try {
    //    await blog.save();
        let  session=await mongoose.startSession(); //comes from mongoose
        session.startTransaction({session});
        await blog.save();
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();



       
      } catch (error) {
    console.log(error);

    return resp.status(500).json({message:error})
     }
return resp.status(200).json({blog});


}

const updateBlog=async(req,resp,next)=>{
     const{title,description}=req.body;
     let  blogId=req.params.id;
         let updatedBlogs;
         try{
              
            updatedBlogs=await Blogs.findByIdAndUpdate(blogId,{
                title,description,
       
            })

         }
        catch(err){
           console.log(err);

        }

        if(!updatedBlogs){
            return resp.status(500).json({message:"Unable To update the Blog"});

        }

        return resp.status(200).json({updatedBlogs});



}




const getById=async(req,resp,next)=>{
    const id=req.params.id;

    let blog;
    try {
        blog= await Blogs.findById(id);


    } catch (error) {
         return   console.log(error);

    }
    if(!blog){
        return resp.status(404).json({message:"No Blog found"});

    }

    return resp.status(200).json({blog});


}

const deleteById=async(req,resp,next)=>{
    const id=req.params.id;
    let deletedblog;
    try {
        
        deletedblog=await Blogs.findByIdAndRemove(id).populate("user");
        await deletedblog.user.blogs.pull(deletedblog); //pull is the method of mongoose
        await deletedblog.save();

        

    } catch (error) {
        return console.log(error);

    }

    if(!deletedblog){
        return resp.status(400).json({message:"unable to delete"});

    }

    return resp.status(200).json({message:"SuccessFully deleted!!"});

}



   const getByUserId = async(req,resp,next)=>{
        const userId=req.params.id;
        let userBlog;
        try {
            userBlog=await User.findById(userId).populate("blogs");
        } catch (error) {

            return console.log(error);
            
        }

        if(!userBlog){
            return resp.status(404).json({message:"No Blog found"})
        }

        return resp.status(200).json({blogs:userBlog});

   }






module.exports={getAllBlogs,addBlog,updateBlog,getById,deleteById,getByUserId};
 