/**
 * Created by GURBHEJ GILL on 3/8/2017.
 */

// create a Staff-account model with mongoose to do CRUD operations
let mongoose = require('mongoose');

//refrence passport-local-mongoose to make this model usable for managing staff members.
let plm = require('passport-local-mongoose');

//create the Staff-account schema. username and passport are include automatically
let accountStaffSchema = new mongoose.Schema({});


accountStaffSchema.plugin(plm);

// make this model public
module.exports = mongoose.model('Account', accountStaffSchema);
