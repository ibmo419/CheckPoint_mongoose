const mongoose =require ('mongoose');
const express=require ('express')
const personController=require('./controllers/personController')
require('dotenv').config()
mongoose.connect("mongodb://localhost:27017/mongoose_app", {useNewUrlParser: true,useUnifiedTopology: true,})
     
      .then(() => {
        console.log("Connected to DB")

        const app=express()
        //insert person1:"Rym" by adding (/insert) to the path 
        app.get('/insert',personController.insertPerson); 
        //insert ManyPersons:"Rym" by adding (/insertMany) to the path 
        app.get('/insertMany',personController.insertManyPersons)
        // Find person using given name ,by adding (/searchByName) to the path
        app.get('/searchByName',personController.findPersons)
        // Find only one person using a food name,by adding(/findOne) to the path
        app.get('/findOne',personController.findPersons)
        // Find only one person using id ,by adding (/personID/:id) to the path
        app.get('/personID/:id',personController.findByID)
        // Find person by id ,edit favorite food and save it ,by adding (/toBeUpdated/:id)  to the path
        app.get('/toBeUpdated/:id',personController.toBeUpdated)
        //Find a person by name and ,edit age and save it ,by adding (/personAge) to the path
        app.get('/personAge',personController.findOneAndUpdate)
        // Find a person by id and delete it ,by adding (/FindPersonAndDelete/:id) to the path
        app.get('/FindPersonAndDelete/:id',personController.findByIdAndRemove)
        //Delete person's name Mary,by adding (/deleteMary) to the path
        app.get('/deleteMary',personController.DeleteMary)
        //find person who like burrito and use query helpers ,by adding () to the path
        app.get('/burrito',personController.queryHelpers)

        
        // add port to the localhost adress
        app.listen(5008, (error) =>
        error
        ? console.log("error while the running of server", error)
        : console.log("sever is running...")
        );
      })
      .catch((err) => console.error("DB not connected", err));