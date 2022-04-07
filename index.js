// Group Project 3
// IS 303 - Winter 2022
// Alex Wirick, Barrett Banfield, Quinn Karpowitz

const listenPort = 3000; //use port 3000

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
let knex = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        server: "PostgreSQL 14",
        user: "postgres",
        password: "Admin",
        database: "Inclasswork",
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
    knex("Vehicle").insert({
        vDescription:req.body.vDescription,
        vType:req.body.vType,
        vYear:req.body.vYear,
        vMilage:req.body.vMilage,
        vStillusing:req.body.vStillusing
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
        res.render("edititem",{myInventory: inventoryInfo});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    })
});

app.post("/editVehicle", (req,res) => {
    knex("Vehicle").where('vehicle_id', req.body.vehicle_id)
        .update({
        vDescription:req.body.vDescription,
        vType:req.body.vType,
        vYear:req.body.vYear,
        vMilage:req.body.vMilage,
        vStillusing:req.body.vStillusing
    }).then( () => {
        res.redirect("/vehicledb");
    });
})