const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const Note = require('../models/note');

router.get('/', (req, res) => {
    Note.find()
     .then((val) => {
        res.send(val);
     })
     .catch(err => {
        console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
     });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;

    Note.findById(id)
     .then((val) => {
        res.send(val);
     })
     .catch(err => {
        console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
     });
});


router.post('/', (req, res) => {
    var note = new Note({
        title: req.body.title,
        description: req.body.description
    }); 

    note.save()
     .then((val) => {
        res.send(val);
     })
     .catch(err => {
        console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
     });
});

router.put('/:id', (req, res) => { 
     var id = req.params.id;
 
     var note = {
        title: req.body.title,
        description: req.body.description
     }; 
 
     Note.findByIdAndUpdate(id, { $set: note }, { new: true })
      .then((val) => {
        res.send(val);
      })
      .catch(err => {
        console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
      });
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectId.isValid(id))
    {
       return res.status(404).send(`No record of ${id}`);
    }

    Note.findByIdAndRemove(id)
     .then((val) => {
        res.send(val);
     })
     .catch(err => {
        console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
     });
});

module.exports = router;