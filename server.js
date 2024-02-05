const express = require("express");
const students = require("./students");
const mongoose = require("mongoose");
const Item = require("./models/Item");
var app = express();

// app.get('/',(req,res)=>{
//     res.send("<h1>Hello World bbb</h1>");
// })

// app.get('/students',(req,res)=>{
//     res.send(students)
// });

// app.get('/students/:id',(req,res)=>{
//     res.send(students.filter(el=>el.id==req.params.id))
// });

// app.use((req,res,next)=>{
//     console.log("Time",Date.now())
//     var date=new Date;
//     var day=date.getDay();
//     var hour=date.getHours();
//     console.log("date ",date,"Hours ",hour,"Day ",day)
//     if(hour>9 && hour<17 && day>0 && day < 6) {next()} else {

//         res.send("<h1>oups it is closed come back later</h1>")
//     }

// })
// express middleware
app.use(express.static("pages"));
app.use(express.json());

// const requestTime = function (req, res, next) {
//     req.requestTime = Date.now()
//     console.log(Date.now())
//     next()
//   }

//   app.use(requestTime)

//   app.get('/', (req, res) => {
//     let responseText = 'Hello World!<br>'
//     responseText += `<small>Requested at: ${req.requestTime}</small>`
//     res.send(responseText)
//   })

mongoose
  .connect("mongodb://my-mongo-work:27017/my-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err.message));

app.get("/items", (req, res) => {
  Item.find()
    .then((items) => res.send({ items }))
    .catch((err) => res.status(500).json({ err }));
});

app.post("/items/add", async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
    });
    await newItem.save();
    console.log(newItem)
    res.send({ message: "item saved successfully", newItem });
  } catch (error) {
    (err) => res.status(500).json({ err: err.message });
  }
});

var PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server running on port ${PORT}`)
);
