const express=require('express');
const { getAllBlogs, addBlog, updateBlog, getById, deleteById, getByUserId } = require('../controllers/Blog-controller');

const Blogrouter=express.Router();

Blogrouter.get('/',getAllBlogs);
Blogrouter.post("/add",addBlog);
Blogrouter.put('/update/:id',updateBlog);
Blogrouter.get("/:id",getById);
Blogrouter.delete('/:id',deleteById);
Blogrouter.get("/user/:id",getByUserId);
 








module.exports=Blogrouter;
