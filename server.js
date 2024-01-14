const express = require ('express')
const students=require ('./students')

var app=express()

// app.get('/',(req,res)=>{
//     res.send("<h1>Hello World bbb</h1>");
// })


// app.get('/students',(req,res)=>{
//     res.send(students)
// });

// app.get('/students/:id',(req,res)=>{
//     res.send(students.filter(el=>el.id==req.params.id))
// });

app.use((req,res,next)=>{
    console.log("Time",Date.now())
    var date=new Date;
    var day=date.getDay();
    var hour=date.getHours();
    console.log("date ",date,"Hours ",hour,"Day ",day)
    if(hour>9 && hour<17 && day>0 && day < 6) {next()} else {

        res.send("<h1>oups it is closed come back later</h1>")
    }

})
// express middleware
 app.use(express.static("pages"))


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

var PORT=process.env.PORT || 5000;

app.listen(PORT,(err)=>err?console.log(err):console.log(`server running on port ${PORT}`))