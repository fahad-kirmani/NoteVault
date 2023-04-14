const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const User = require("../models/User");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");



//ROUTE 1: to get all the notes that are save by the user
router.get("/getnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
});

//ROUTE 2: to add notes to the database
router.post("/addnote", fetchuser, [
  body("title", "Title cannot be blank ").isLength({min:1}),
  body("description", "description cannot be empty ").isLength({min:10})
], async (req, res) => {
    try{
    const {title, description, tag}= req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const notes = await new Notes({
        title,description,tag, user: req.user.id
    }
    )
    const savednotes= await notes.save()
    res.json({savednotes})
}
catch (err) {
    res.status(500).send({ error: "Internal server error", err: err });
}
});


//ROUTE 4: this route is to Update a note on /user/notes/deletenote
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const {title, description, tag} = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let noteid = await Notes.findById(req.params.id);
        if (!noteid) { return res.status(404).send("Not Found") }

    if(noteid.user.toString() !== req.user.id){
    
        return res.status(401).send("Not Allowed");
    }
        noteid = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ noteid });
    }    
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



//ROUTE 3: To Delete notes on /user/notes/deletenote 
router.delete('/deletenote/:id', fetchuser , async (req, res) => {
    try{
     let noteid = await Notes.findById(req.params.id)
     if(!noteid)
    { return res.status(404).send("Not found")
    }
     
    if(noteid.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Authorized, Please log in with your ID")
    }
    noteid = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Successfully Deleted" , noteid:noteid})
}
    catch(err) {
        res.status(500).send({ error: "Internal server error" });
    }
}
)


module.exports = router;
