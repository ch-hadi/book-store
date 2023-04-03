const {User} = require('./../Models/User')
const Async = require('express-async-handler');

const addUser = Async(async(req,res)=>{
    // console.log(req.body)
    // return
    const {name,priority , status}=(req.body);
    let user = new User();
    user.name=name;
    user.priority=priority;
    user.status=status;
    user.save()
    console.log(user.createdAt)
    res.send({status:200, data:user, message:'Action completed'});
})

const getUsers = Async(async(req,res)=>{

    const user = await User.find();
    res.send({status:200, data:user})

})

const removeUser = Async(async(req,res)=>{
    const {id}=(req.body);
    
    const user = await User.findOne({_id:id})
    if(!user) return res.send({statue:200, error:'User not found'})
    user.deleteOne({_id:'63fb488c1b1a3dd248bea82c'})
    res.send({statue:200, success:'User deleted',id:id})

})
const updateUser = Async(async(req,res)=>{
    const {id , text}=(req.body.data);
    const user = await User.find({_id:id})
    if(!user) return res.send({statue:200, error:'User not found'})
    await User.updateOne({_id:id},{$set:{name:text}})
    let data = {id,text}
    res.send({statue:200, success:'User updated',data:data})

})
module.exports={addUser, removeUser , updateUser, getUsers}