const mongoose = require('mongoose');
 mongoose.connect('mongodb+srv://hiteshvkrish:vhitesh1*@cluster0.z5zfg8x.mongodb.net/todo-app-database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    username:String,
    email:String,
    password:String,
    
})

const todos = new Schema({
    userId:ObjectId,
    title:String,
    done:Boolean
});

const userModel = mongoose.model('users',user);
const todoModel = mongoose.model('todo',todos);

module.exports={
    userModel,
    todoModel
}