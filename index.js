const listenPort = 3000; //use port 3000 to host my server
let express = require("express");
const res = require("express/lib/response");
let path = require("path");
let app = express(); //set app equal to express
app.set("view engine","ejs");//set is a method for the express object, here we set the view engine to ejs
app.use(express.static('images'));
app.use(express.urlencoded({extended: true}));

app.listen(listenPort, function() //Here I tell express which port to listen to
    {console.log("Listener active on port" + //this displays a console message letting me know it is listening
    listenPort); });

let knex = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        server: "PostgreSQL 13",
        user: "postgres",
        password: "R1c0chet",
        database: "postgres",
        port: 5432
    },
    useNullAsDefault: true
});  
    
app.get("/",(req,res)=>
    {res.render("/index");
});

app.get("/vehicledb",(req,res) => {
    knex('Vehicle').orderBy('vehicle_id')
    .then(inventoryInfo => {
        console.log(inventoryInfo);
        res.render("displayVehicle",{myInventory: inventoryInfo});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err}); 
    });    
});

//app.get("/addVehicle",(req,res) => { 
    //res.render("addVehicle");
//});

/*app.post("/addVehicle", (req,res) => {
    knex("Vehicle").insert({
        itemName:req.body.itemName,
        itemPrice:req.body.itemPrice
    }).then( () => {
        res.redirect("/vehicledb");
    });
});*/

/*app.get("/deleteItem/:itemID", (req,res) => {       //the /:itemId grabs the item ID from the page so it knows which item to delete from the db
    knex('Menu').where('itemID', req.params.itemID).del()
    .then ( () =>{
    res.redirect("/menulistdb");
    })
});*/

/*app.get("/editItem/:itemID",(req,res) => {
    knex('Menu').where('itemID', req.params.itemID)
    .then (menuInfo => {
        res.render("edititem",{theMenu: menuInfo});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    })
});*/

/*app.post("/editItem", (req,res) => {
    knex("Menu").where('itemID', req.body.itemID)
        .update({
        itemName:req.body.itemName,
        itemPrice:req.body.itemPrice
    }).then( () => {
        res.redirect("/menulistdb");
    });
})*/


