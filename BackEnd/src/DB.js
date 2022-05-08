const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://llherrera:BackEndp@cluster0.jf51l.mongodb.net/BackEnd_DB_P1?retryWrites=true&w=majority"
    )
.then(() => {
    console.log("Exito");
})
.catch((e) => {
    console.log("Jumbo")
})