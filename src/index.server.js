const mongoose = require("mongoose");
const express = require("express");
const app = express();
var cors = require('cors')
const env = require("../envobj")

const signatureRoutes = require("./Routes/route");
// const adminRoutes = require("./Routes/auth");
const verifyTransition = require("./Routes/verifyTransition");



// this configration for local database not for mongo atlas
// // mongoose.connect(`mongodb://localhost/${env.MONGO_DB_DATABASE}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });
mongoose.connect(`mongodb://localhost/${env.MONGO_DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
var connect = mongoose.connection.once('open', function () {
    console.log("Database Connected")
}).on('error', function (error) {
    console.log(error)
})


// this configration for mongo atlas
// mongoose
//     .connect(
//         //jattesh13@gmail.com
//         // mongodb+srv://root:<password>@cluster0.doaxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//         `mongodb+srv://root:admin@cluster0.g0zuq.mongodb.net/icici?retryWrites=true&w=majority`,

//         //`mongodb+srv://${env.MONGO_DB_USER}:${env.MONGO_DB_PASSWORD}@cluster0.g0zuq.mongodb.net/${env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
//         //password = admin

//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true
//         }
//     )
//     .then(() => {
//         console.log("Database is connected");
//     });

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));

// app.use('/static', express.static(path.join(`${__dirname}/public`)));
app.use(express.json());
app.use("/api", signatureRoutes);
// app.use("/api", adminRoutes);
app.use("/api", verifyTransition);


app.listen(env.PORT, () => {
    console.log(`server is running on port ${env.PORT} `)
})