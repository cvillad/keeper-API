const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
const Note = require("../models/Note");

//get all the notes
router.get("/", (req, res)=>{
    Note.find({}, (err, notes)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log("Get operation successfully")
            res.send(notes.reverse())
        }
    });
});

//create a new note
router.post("/", (req, res)=>{
    const{title, content} = req.body;
    const note = new Note({
        title: title,
        content: content
    });
    note.save((err, doc)=>{
        if(err) {
            console.log(err)
            res.send(err);
        }else{
            console.log({
                success: "Note created successfully",
                data: doc
            });
            res.send({
                success: "Note created successfully",
                data: doc
            });
        }
    });
});

router.delete("/:_id", (req, res) => {
    const {_id} = req.params;
    console.log(req.params)
    console.log(_id)
    Note.findByIdAndRemove(_id, (err)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log("Note deleted successfully");
            res.send({
                success: "Note deleted successfully",
                data: _id
            });
        }
    });

});

router.patch("/:_id", (req, res) => {
    const {_id} = req.params;
    console.log(req.body)
    Note.findByIdAndUpdate(_id, {$set: req.body}, (err, doc)=>{
            if(err){
                console.log("Note not found");
                res.send(err);
            }else{
                console.log({
                    success: "Note updated successfully",
                });
                res.send({
                    success: "Note updated successfully",
                    data: doc
                });
            }
        })
})

module.exports = router;