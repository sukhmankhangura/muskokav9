var express = require('express');
var router = express.Router();
// reference this model for CRUDNESS
let Camp = require('../models/camp');



/* GET /staff-camper-registration*/
router.get('/staff-camper-registration', function(req, res, next) {

Camp.find(function(err, queryResults){
  if (err){
    console.log(err);
      res.render('error');
    // res.end(err);
    return;
  }
else{
  console.log(queryResults);
  res.render('staff-camper-registration', {
    Camp: queryResults,
    title:'Add Camps'
  });

}
  });
});


//add-camp-day
router.get('/add-camp-day', function(req, res, next){
    res.render('add-camp-day', { title:'Add camp day'});
});


/// POST /add-camp-day
router.post('/add-camp-day', function(req, res, next) {
    // use the camper model to add a new camper to mongodb
    Camp.create({
        campName: req.body.campName,
        date: req.body.date
    },function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('staff-camper-registration');
    });
});






//GET /edit/_id show edit form
router.get('/camp-edit/:_id', function(req, res, next) {
    // look at the selected camper
    Camp.findById(req.params._id, function (err, camp) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.render('camp-edit', {
            Camp: camp
        });
    });
});


//POST /_id to save updates
router.post('/camp-edit/:_id', function(req, res, next) {
    // create an fill a camp object
    let camp = new Camp({
        _id: req.params._id,
        campName: req.body.campName,
        date: req.body.date,
    });

    //call mongoose update method, passing the id and then the updated camp

    Camp.update({ _id: req.params._id }, camp, function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/staff-camper-registration')
    })

});

//GET /camp-delete/_id to delete the camp
router.get('/camp-delete/:_id', function(req, res, next) {
    //delete a camp and redirect
    Camp.remove({ _id: req.params._id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        //no error so show updated camp list
        res.redirect('/staff-camper-registration')
    });
});




// make public
module.exports = router;
