const bodyParser = require("body-parser");
const express = require("express")
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function (req,res) {
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function (req,res) {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }
    
    const jsonData =JSON.stringify(data)
    const url = "https://us11.api.mailchimp.com/3.0/lists/38ad8047da"
    const options = {
        method:"POST",
        auth:"shivang:bee4d00f0858906b218de20fd822b11-us11"
    }
    const request = https.request(url,options,function (response) {
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("" ,function (data) {
            console.log(JSON.parse(data))
        })
    })
    
    request.write(jsonData);
    request.end();
})
app.post("/failure", function (req,res) {
    res.redirect("/")
})

app.listen(3000,function () {
    console.log("Server is running at port 3000")
})



//apiKey: 11bfe57e5009bb97e1fda107705e0727-us11
//listId: 38ad8047da 38ad8047da
