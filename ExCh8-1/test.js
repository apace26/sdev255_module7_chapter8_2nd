const { response } = require("express");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mydb_test");
mongoose.connection.on("error", function() {
 console.log("mydb_test database connection error")
});
mongoose.connection.on("open", function() {
 console.log("Successful connection to mydb_test database");
});
var clientSchema = mongoose.Schema({
 lastname : String,
 firstname : String,
 address : String
});
// creation of the Client class associated with the clients 
// collection
var Client = mongoose.model("clients", clientSchema);
Client.deleteOne({ lastname : "Clinton" })
.exec()     // exec() mandatory!
.then(response => {
    console.log("After Clinton's removal");
    console.log("response = ", response);
    return Client.find().exec()
})
.then(clients => {
    console.log("clients = ", clients);
})
.catch(err => {
    console.error(err);
})
console.log("Record was successfully deleted");