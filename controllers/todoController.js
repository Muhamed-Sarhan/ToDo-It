var bodyParser = require('body-parser');
var mongoose = require('mongoose');

require('dotenv').config({ path : 'variables.env'});


mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology: true});

var todoSchema = new mongoose.Schema({
item: String
});
var Todo = mongoose.model('Todo' , todoSchema);



//var data = [{item:'horse'} , {item:'cars'} ,{item:'tennis'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports = function(app){
 
app.get( '/' , function(req , res){
   Todo.find({} , function(err,data){
      if (err) throw err ; 
      res.render('todo' , {todos : data});
   });
});
app.post('/' , urlencodedParser , function(req,res){
   var newTodo = Todo(req.body).save(function(err,data){
     if (err) throw err ;
     res.json(data);
   });
});

app.delete( '/:item' , function(req , res){
   Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
      if (err) throw err ;
      res.json(data);
   });
});
};