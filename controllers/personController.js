const person=require('../models/person')



//Create and Save a Record of a Model:
exports.insertPerson=(req,res)=>{
        const person1 = new person({
          name: "Rym",
          age: 28,
          favoriteFoods: ["Pizza", "Couscous"],
        });
      
        person1
          .save()
          .then((result) => res.send(result))
          .catch((error) => console.log("error while adding Rym", error));
      };

//Create Many Records with model.create()
exports.insertManyPersons=(req,res)=>{
    const arrayOfPeople = [
        { name: "Ahmed", age: 27, favoriteFoods: ["Banane", "Makloub"] },
        { name: "Ghofran", age: 20, favoriteFoods: ["Chips", "Sushi"] },
        { name: "Mohamed", age: 56, favoriteFoods: ["Melawi", "Pizza"] },
      ];
      person.create(arrayOfPeople)
      .then((result) => res.send(result))
      .catch((error) => console.log("error while insert many", error));
}
//Use model.find() to Search Your Database
exports.findPersons=(req,res)=>{
    person.find({name:"Rym"})
    .then((person)=>res.send(person))
    .catch(()=>console.log("error while searching for a person by name", error))
}
//Use model.findOne() to Return a Single Matching Document from Your Database
exports.findOne=(req,res)=>{
    person.findOne({favoriteFoods:"Pizza"})
    .then((person)=>res.send(person))
    .catch(()=>console.log("error while searching for person by favorite foods Pizza"))
}
//Use model.findById() to Search Your Database By _id
exports.findByID=(req,res)=>{
  const personId=req.params.id;
    person.findById({_id:personId})
    .then((person)=>res.send(person))
    .catch(()=>console.log("error while searching for a person by id"))
}
// Perform Classic Updates by Running Find, Edit, then Save
exports.toBeUpdated=(req,res)=>{
  const personId=req.params.id;
  person.findOne({_id:personId})
  .then((toBeUpdated)=>{
    toBeUpdated.favoriteFoods.push("Hamburger")
    toBeUpdated
    .save()
    .then((toBeUpdated)=>res.send(toBeUpdated))
    .catch(()=>console.log("error while updating"))
  })
  .catch(()=>console.log("error while searching for a person by id"))
}
//Perform New Updates on a Document Using model.findOneAndUpdate()
exports.findOneAndUpdate=(req,res)=>{
  const personName="Mohamed";
  person.findOneAndUpdate({name:personName},{age:20},{new:true})
  .then((result)=>{
    result
    .save()
    .then((result)=>res.send(result))
    .catch(()=>console.log("error while updating age"))
    })
  .catch(()=>console.log("error while searching for personName"))
}
// Delete One Document Using model.findByIdAndRemove
exports.findByIdAndRemove=(req,res)=>{
  const personId=req.params.id
  person.findByIdAndRemove({_id:personId})
  .then((result)=>res.send(result))
  .catch(()=>console.log("error while findingById "))
}
//MongoDB and Mongoose - Delete Many Documents with model.remove()
exports.DeleteMary=(req,res)=>{
  Person.remove({ name: "Mary" })
  .then((result) => res.send(result))
  .catch((error) => console.log("error whith delete all mary", error));
}
//Chain Search Query Helpers to Narrow Search Results
exports.queryHelpers=(res,req)=>{
  Person.find({ favoriteFoods: { $in: "burrito" } })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec()
    .then((result) => res.send(result))
    .catch((error) => console.log("error whith shearching burrito", error));
}
