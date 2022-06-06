const express = require("express");
const app = express();
const {Note} = require("./database");
const passport = require("passport");
const session = require("express-session");
const port = 5000;

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
	cookie: {
		// secure: true,
		maxAge: 1000 * 60 * 60 * 1 // 1 hour
	}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(Note.createStrategy());
passport.serializeUser(Note.serializeUser());
passport.deserializeUser(Note.deserializeUser());

app.get("/all", (req, res) => {
  console.log("ok");
	if(req.isAuthenticated()) {
		Note.findByUsername(req.user.username, (err, user)=>{    
			// console.log(user.notes);
      res.json(user.notes);
		});
	}
});
// app.get("/addNote", (req, res) => {
//   console.log("addNote");
// 	if(req.isAuthenticated()) {
// 		Note.findByUsername(req.user.username, (err, user)=>{  
//       console.log(user.notes);
//       res.json(user.notes);
// 		});
// 	}
//   console.log("AddNote");

// });
// app.get("/delNote", (req, res) => {
//   console.log("delete");
// 	if(req.isAuthenticated()) {
// 		Note.findByUsername(req.user.username, (err, user)=>{    
// 			res.json(user.notes);
// 		});
// 	}
// });
// app.get("/editNote", (req, res) => {
//   console.log("edit");
// 	if(req.isAuthenticated()) {
// 		Note.findByUsername(req.user.username, (err, user)=>{    
// 			res.json(user.notes);
// 		});
// 	}
// });

app.post("/add", (req, res) => {
	if(req.isAuthenticated()) {
		const note = {
			title: req.body.title,
			content: req.body.content
		};
	
		Note.findByUsername(req.user.username, (err, user)=>{
			user.notes.push(note);
			user.save();
      res.json(user.notes);
			console.log(user.notes);
		});
	}
});

app.post("/del", (req,res) => {
  Note.findByUsername(req.user.username, (err, user)=>{
    user.notes = user.notes.filter((note, index) => {
      return index !== req.body.id
    });
    user.save();
    res.json(user.notes);
  });
});

app.post("/edit", (req,res) => {
  Note.findByUsername(req.user.username, (err, user)=>{
      user.notes.map((note, index)=>{
        if(index === req.body.noteId) {
          note.title = req.body.title;
          note.content = req.body.content;
        }
      });
      user.save();
      res.json(user.notes);
  });
});

app.post("/register", (req, res) => {
    Note.register({username: req.body.username}, req.body.password, (err, user) => {
      if(err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, ()=>{
          res.end();
        });
      }
    });
});

app.post("/login", passport.authenticate('local', {failureRedirect: "/"}), (req, res) => {
  res.end();
});

app.get("/api/verify", (req, res) => {
    if(req.isAuthenticated) {
      res.send(req.user.username);
    }else {
      res.status(403).send("Session Expired");
    }
});
app.post("/api/logout", (req, res) => {
    req.logout();
    res.end();
});

app.listen(port, function(){
  console.log("Server started on port " + port);
});