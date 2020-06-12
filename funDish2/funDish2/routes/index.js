
// bsassam and MA
var express = require('express');
var router = express.Router();
var fs = require("fs");
const jwt = require('jsonwebtoken');
var request = require('request');
var uniqid = require('uniqid');





let authToken = (req,res,next)=>{

	// logic 
	// req.header['authobbb'];
	// looop in the josn  check it exists
	// if yest call next.()
	// if no 
	// res.send("not autorheized");

}
console.log("\n *START* \n");
var content = fs.readFileSync("resipeObject.json");
var listr = JSON.parse(content);
/* GET home page. */
router.get('/', function (req, res, next) {
// 	request('http://localhost:4000', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:',JSON.parse(body).data, body['data']); // Print the HTML for the Google homepage.
// });
// request.post({url:'http://localhost:4000/upload', form: {username:'123123'}}, function(err,httpResponse,body){ 
// 	console.log(JSON.parse(body).token)
// 	/* ... */ 
// })

	res.render('fun-Dishes');
});

/* GET about page. */
router.get('/about', function (req, res, next) {
	res.render('About');
});

router.get('/login',function (req, res, next) {
	res.render('login');
});
// login submit
//isAuth,
var TToken;
router.post('/login',function (req, res, next) {


	//res.setHeader("authorization-token",body.token);
/*
	if (json == req.body.Username)
		if (req.body.Password === "admin")
			return res.redirect("/admin/recipie")
*/
	var logged = false
	data = fs.readFileSync('users.json')
	json = JSON.parse(data);
	let token = null;
	
	for (var i = 0; i < json.length; i += 1) {
		if (json[i]["username"] == req.body.Username) {
			if (json[i]["password"] == req.body.Password) {
				logged = true;
				token
				break;

			}
		}
	}
	if (logged) {
	let user = { username: json[i]['username'], id:json[i]["uniqId"] };
	//	let user = {username:'nouser',password:'nopassword'};
		jwt.sign({ user }, 'secretkey', { expiresIn: '1h' }, (er, tkn) => {
			if (er) { return null }
			else {
				TToken = tkn;
				// res.redirect("/admin/recipie")
				
				
	// 			 var userk = {
	// 				tkkn: tkn,
	// 				id:user.id
	// 			}
	// 			 datak = fs.readFile('token.json')
	// objk = JSON.parse(datak);
	// objk.push(userk);
	// var json = JSON.stringify(objk);
	// fs.writeFile('token.json', json);
				 request.post({url:'http://localhost:4000/upload', form: {username:tkn}}, function(err,httpResponse,body){ 
	console.log(JSON.parse(body).token)
	var decode  = jwt.decode(JSON.parse(body).token);

	console.log(decode);
	
	res.redirect('http://localhost:4000/');
	

	
	
	/* ... */ 
});

				//console.log("create token successfully: \n " + tkn);


			}
		});
	}
	else
		 res.send('logging failed');
		//console.log("logging failed");

});

router.post("/upload", (req, res) =>{
	console.log(req.body.username);
	tooooken(req.body.username, res)
	
	
	
// var backToken = req.body.username;
// dataTkn = fs.readFileSync('token.json')
// 	objtkn = JSON.parse(dataTkn);
// 	loop2: for (i in objtkn){
// 		if (objtkn[i]["tkken"] === backToken){
// 			res.send({token:true});
// 			break loop2;
// 		}
// 	}
});
function tooooken(tokennn, res){
	if (TToken === tokennn){
	return	res.send({H :"true"})
	}else{
	return	res.send({H :"false"})
	}
}



/*
router.get('/login/token', verifyToken,function (req, res, next) {

	
		if (json == req.body.Username)
			if (req.body.Password === "admin")
				return res.redirect("/admin/recipie")
	
		var logged = false
		data = fs.readFileSync('users.json')
		json = JSON.parse(data);
		let token = null;
		for (var i = 0; i < json.length; i += 1) {
			if (json[i]["username"] == req.body.Username) {
				if (json[i]["password"] == req.body.Password) {
					logged = true;
					token
					break;
	
				}
			}
		}
		if (logged) {
			let user = { username: json[i]['username'], password: json[i]['password'] };
			jwt.sign({ user }, 'secretkey', { expiresIn: '1h' }, (er, tkn) => {
				if (er) { return null }
				else {	
					console.log("authorization");
					//res.send("authorization");
					//console.log(" logged in successfully \n" + tkn);
					//console.log(" \n logged in successfully create token successfully: \n " + tkn);
					///res.redirect("/admin/recipie")

	
	
				}
			});
		}else
			 //res.send('logging failed');
			 {
			console.log("not authorization");
			 }
			//res.err("/admin/recipie")

		
	});
	*/
	//router.post('/admin/recipie',function (req, res, next) {

	function verifyToken(req, res, next){
		// get auth header value
		const beareHeader = req.headers['authorization'];
	// cheak if bearer is undefined 
	if(typeof beareHeader !== 'undefined'){
	// split at the space 
	const bearer = beareHeader.split(' ');
	// get token from array 
	const beareToken = bearer[1];
	// set token from array 
	req.token = beareToken;
	// next middleware
	next();
	}else {
		//forbidden
		res.sendStatus(403);
		console.log("authorization "+tkn);
	}
	}
// signup
router.get('/signup', function (req, res, next) {
	res.render('signup');
});
// submitted signup
router.post('/signup', function (req, res, next) {
	var user = {
		username: req.body.Username,
		email: req.body.Email,
		password: req.body.Password,
		uniqId: uniqid(req.body.Username+"-")
	}
	console.log(req.body);
	data = fs.readFileSync('users.json')
	obj = JSON.parse(data);
	obj.push(user);
	var json = JSON.stringify(obj);
	fs.writeFileSync('users.json', json);
	res.redirect('login');
});
// gallery all
router.get('/recipie/all', function (req, res, next) {
	res.render('recipies', { "recps": listr })
});
// gallery filtered
router.get('/recipie/:qry', function (req, res, next) {
	var newlist = [];
	listr.forEach(function (dish) {
		if (dish["Title"].toLowerCase().indexOf(req.params.qry.toLowerCase()) > -1)//req.params["qry"])
			newlist.push(dish)
	});
	res.render('recipies', { "recps": newlist })
});
// search request
router.post('/recipie/filter', function (req, res, next) {
	res.redirect('/recipie/' + req.body.qry)
});

// details
router.get('/recipie/details/:id', function (req, res, next) {
	listr.forEach(function (x) {
		if (x["Id"] === req.params.id) {
			return res.render('details', { "dish": x })
		}
	})
	res.send("Not found")
});


// Admin
router.get('/admin/recipie', function (req, res, next) {
	res.render('admin', { "rcps": listr })
});
// add
router.get('/admin/recipie/add', function (req, res, next) {
	res.render("addRecp")
});
router.post('/admin/recipie/add', function (req, res, next) {
	var dish = {
		"Id": req.body.Title + Math.floor(Math.random() * Math.floor(1000)),
		"Title": req.body.Title,
		"Description": req.body.Description,
		"Ingredients": req.body.Ingredients.split("\n"),

		"Time": {
			"Prep Time": req.body.prepTime,
			"Cook Time": req.body.cookTime,
			"Total Time": req.body.totalTime
		},
		"LevelOfDiffculty": req.body.Diffculty,

		"NutritionalFacts": req.body.NutritionalFacts.split("\n"),
		"Rference": req.body.refrences.split("\n"),
		"image": req.body.image.split("\n")
	}
	listr.push(dish)
	res.redirect("/admin/recipie")
});
// edit 
router.get('/admin/recipie/edit/:id', function (req, res, next) {
	i = 0
	for (i = 0; i < listr.length; i += 1) {
		if (listr[i]['Id'] == req.params.id)
			break;
	}
	res.render('updateRecp', { 'dish': listr[i] })
});

router.post('/admin/recipie/update/:id', function (req, res, next) {
	i = 0
	for (i = 0; i < listr.length; i += 1) {
		if (listr[i]['Id'] == req.params.id)
			break;
	}
	var dish = {
		"Id": req.body.Title + Math.floor(Math.random()),
		"Title": req.body.Title,
		"Description": req.body.Description,
		"Ingredients": req.body.Ingredients.split("\n"),

		"Time": {
			"Prep Time": req.body.prepTime,
			"Cook Time": req.body.cookTime,
			"Total Time": req.body.totalTime
		},
		"LevelOfDiffculty": req.body.Diffculty,

		"NutritionalFacts": req.body.NutritionalFacts.split("\n"),
		"Rference": req.body.refrences.split("\n"),
		"image": req.body.image.split("\n")
	}
	listr[i] = dish
	res.redirect('/admin/recipie/')
});


router.get('/admin/recipie/delete/:id', function (req, res, next) {
	var i = 0
	listr.forEach(function (dish) {
		if (dish["Id"] == req.params.id) {
			return;
		}
		i++;
	})
	delete listr[i]
	console.log(listr)
	//fs.writeFile("resipeObject.json", listr)
	res.redirect("/admin/recipie")
});
module.exports = router;
