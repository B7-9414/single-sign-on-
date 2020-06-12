var e = require("express");
var a = e();

var b = require("body-parser");
var jwt = require('jsonwebtoken');
var request = require('request');
// var fs = require("fs");

a.use(b.urlencoded({ extended: true }));
var lastTkn;
a.post("/upload", (req, res) => {
    console.log(req.body.username);
      tkn = req.body.username;
    var decode = jwt.decode(tkn, 'secretkey');
    console.log(decode);
    
    res.send({Token :"Hi"});
    // console.log(virfayToken(tkn))
    lastTkn = tkn;
})

a.get("/", (req, res) => {

    console.log(lastTkn)
     var decode = jwt.decode(lastTkn, 'secretkey');
     var user = decode.user.username;

    request.post({url:'http://localhost:8080/upload', form: {username:lastTkn}}, function(err,httpResponse,body){ 
        console.log(JSON.parse(body).H);

        if(JSON.parse(body).H === "true"){
            res.send("welcome "+user)
        }else{
            res.send("Faild")
        }
        // var Id =decode.user.id
        // checkId(Id)
        
});
  

// if(virfayToken(tkn)){
//     var decode = jwt.decode(tkn, 'secretkey');

//     res.send("welcom"+decode.user.username);

// }else{

//     res.send("Login Faild");
// }
   
});


// function virfayToken(tkn){
//     request.post({url:'http://localhost:8080/upload', form: {username:tkn}}, function(err,httpResponse,body){ 
//         check = JSON.parse(body);
// });
 
// if (check){
//     return true;
// }else{
//     return false;
// }
// }


// function checkId(id){
  
//     data = fs.readFileSync('id.json')
//     obj = JSON.parse(data);
//     obj.push(id);
// 	var json = JSON.stringify(obj);
// 	fs.writeFileSync('id.json', json);
    
// }
a.listen(4000, () => {
    console.log(4000);
}
)
