var path = require("path");
var fs = require("fs");
var express =require("./node_modules/express");
var app=express();
var bodyParser = require('./node_modules/body-parser');
var formidable = require('./node_modules/formidable');
const child_process = require('child_process');
var FormData = require('form-data');
var url = require('url');
var axios = require('axios');
var pic = 2;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.urlencoded());
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/face', function (req, res) {
  res.render('index');
})
app.post('/facedetection', function (req, res) {
  //console.log("facedetection");
  //var params = url.parse(req.url, true).query;
		//hostServer = params.url;

    hostServer=req.body.url;
    picnum= req.body.name;
    picfps= req.body.fpsrate;
    picsize= req.body.datasize;
    picdes= req.body.destiation;

    //console.log(picdes);

    var form = new FormData();
    		//form.append('upload', fs.readFileSync(__dirname+"/public/extract/"+picfps+"fps/test1_"+picnum+".jpg"),"test1_"+picnum+".jpg");
    		//form.append('upload', fs.readFileSync(__dirname+"/public/extract/"+picfps+"/test1_"+picnum+".jpg"),"test1_"+picnum+".jpg");
        form.append('upload', fs.readFileSync(__dirname+"/public/extract/"+picfps+"fps/"+picsize+"/test1_"+picnum+".jpg"),"test1_"+picnum+".jpg");
		var formHeaders = form.getHeaders();
    		var start_T = new Date().getTime();
      //  console.log("http://"+hostServer+"/"+picdes);
    		//axios.post("http://"+hostServer+"/"+picdes, form, {
        axios.post("http://"+hostServer+"/"+picdes, form, {
    		  headers:formHeaders,
    		}).then(function (response){
          //console.log("success");
    			var end_T = new Date().getTime();
    			cost = end_T-start_T;
          //console.log(cost);
    			res.write(cost+":");
    			res.write(response.data);
    			res.end();
      //    console.log(response.data);
    		}).catch(function (error){
          //console.log("fail");
    			var end_T = new Date().getTime();
    			cost = end_T-start_T;
    			res.write(cost+":");
    			res.write("fail");
    			res.end();
          //console.log(response.data);
    		})
})

app.listen(3000, function () {
  console.log('app listening on port 3000!')
})
