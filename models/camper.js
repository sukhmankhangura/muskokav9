// create camper model with mongo to do some CRUD

// mongoose
let mongoose = require('mongoose');

// json definition ( data types, properties, etc)
let camperSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: 'First Name is Required'
  },
  lastName:{
    type: String,
    required: 'Last Name is required'
  },
  age:{
    type: Number,
    required: 'Age is required'
  },
  note:{
    type: String,
  },
  fileupload:{
    type: String
  },
 parentFirstName:{
   type: String,
   required: 'Last Name is required'
 },
 parentLastName:{
   type: String,
   required: 'Last Name is required'
 },
phoneNum:{
  type: Number,
  required: 'number is required'
},
address:{
        type: String,
        required: 'address is required'
    },
email: {
  type: String
}

});

//make the model public
module.exports = mongoose.model('Camper', camperSchema);
