const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/keeperDB', {useNewUrlParser: true, useUnifiedTopology: true});

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Note must have a title"]
    },
    content: {
        type: String,
        required: [true, "Note must have a content"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model("Note", noteSchema);

app.route("/notes")
    .get((req,res)=>{
        Note.find({}, (err, notes)=>{
            if(err){
                console.log(err)
                res.send(err)
            }else{
                console.log("Get operation successfully")
                res.send(notes.reverse())
            }
        });
    })
    .delete((req, res)=>{
        Note.deleteMany({}, (err)=>{
            if(err){
                console.log(err)
                res.send(err)
            }else{
                console.log("Successfully deleted all notes");
                res.send({
                    success: "Successfully deleted all notes"
                })
            }
        });
    });

app.route("/note")
    .post((req, res)=>{
        const{title, content} = req.body;
        const note = new Note({
            title: title,
            content: content
        });
        note.save((err, doc)=>{
            if(err) {
                console.log(err)
                res.send(err)
            }else{
                console.log({
                    success: "Note created successfully",
                    data: doc
                })
                res.send({
                    success: "Note created successfully",
                    data: doc
                });
            }
        });
    })
    .delete((req, res)=>{
        console.log(req.body)
        const {_id} = req.body
        if (_id){
            Note.findByIdAndRemove(_id, (err)=>{
                if(err){
                    console.log(err)
                    res.send(err)
                }else{
                    console.log("Note deleted successfully")
                    res.send({
                        success: "Note deleted successfully",
                        data: _id
                    })
                }
            });
        }else res.send("Note doesn't exists")
        
    });


app.listen(3001, ()=>{
    console.log("Server running on port 3001")
}) 