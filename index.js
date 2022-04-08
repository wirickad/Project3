// Group Project 3
// IS 303 - Winter 2022
// Alex Wirick, Barrett Banfield, Quinn Karpowitz

const listenPort = process.env.PORT || 3000; //use port 3000

//require modules
let express = require("express");
let path = require("path");
let app = express(); //set app equal to express

//config express
app.set("view engine", "ejs");
app.use(express.static('images'));
app.use(express.urlencoded({extended: true}));

//Activate listener port
app.listen(listenPort, function() 
    {console.log(`Listener active on port: ${listenPort}`); 
});

//setup knex
// const knex = require(path.join(__dirname + '/knex/knex.js'));     
let knex = require("knex")({
    client: "pg",
    connection: {
        host : 'localhost',
        server : 'PostgreSQL 13',
        user : 'postgres',
        password : 'password',
        database : 'postgres',
        port: 5432
    },
    useNullAsDefault: true
});  

//Route to index
app.get("/", (req,res) => {
    res.render("index");
});

//Route to vehicledb
app.get("/vehicledb",(req,res) => {
    knex('Vehicle').orderBy('vehicle_id')
    .then(inventoryInfo => {
        res.render("displayVehicle",{myInventory: inventoryInfo});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err}); 
    });
});

//get and post for adding a vehicle
app.get("/addVehicle",(req,res) => { 
    res.render("addVehicle");
});

app.post("/addVehicle", (req,res) => {
    console.log(req.body);
    knex("Vehicle").insert({
        vDescription:req.body.vDescription,
        vType:req.body.vType,
        vYear:req.body.vYear,
        vMilage:req.body.vMilage,
        vStillUsing:req.body.vStillUsing
    }).then( () => {
        res.redirect("/vehicledb");
    });
});

//Route for deleting vehicles from db
app.get("/deleteVehicle/:vehicle_id", (req,res) => {      
    knex('Vehicle').where('vehicle_id', req.params.vehicle_id).del()
    .then ( () =>{
        res.redirect("/vehicledb");
    })
});

//get and post for editing vehicles
app.get("/editVehicle/:vehicle_id",(req,res) => {
    knex('Vehicle').where('vehicle_id', req.params.vehicle_id)
    .then (inventoryInfo => {
        res.render("editVehicle",{myInventory: inventoryInfo});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    })
});

app.post("/editVehicle", (req,res) => {
    console.log(req.body);
    knex("Vehicle").update({
        vDescription:req.body.vDescription,
        vType:req.body.vType,
        vYear:req.body.vYear,
        vMilage:req.body.vMilage,
        vStillUsing:req.body.vStillUsing
    }).where({'vehicle_id': parseInt(req.body.vehicle_id)}).then( () => {
        res.redirect("/vehicledb");
    });
})