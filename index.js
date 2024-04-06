const Port=process.env.PORT || 3000
const express=require('express')
const bodyParser=require('body-parser')
const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
const db=require('./config/mongoose');
const optionsController= require('./controller/OptionsController');
const question_controller=require('./controller/QuestionsController')
// Routes

app.post('/api/questions/create',question_controller.create);
app.get('/api/questions/:id',question_controller.showDetails)
app.post('/api/questions/:id/options/create',question_controller.add_option)
app.delete('/api/questions/:id/delete',question_controller.deleteQues)


app.delete('/api/options/:id/delete',optionsController.delete)
app.post("/api/options/:id/add_vote",optionsController.add_vote);

   
app.listen(Port,function(err){
    if(err){
        console.log(err);
    }
    console.log("server is runing ...",Port);
})
