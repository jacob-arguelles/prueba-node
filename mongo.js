const mongoose = require("mongoose");
const { model, Schema } = mongoose;
//const connectionString = process.env.MONGO_DB_URI;
const connectionString =
  "mongodb+srv://isrDev:12LW5gqEGLZLvVqA@cluster0.8cm36.mongodb.net/basededatos?retryWrites=true&w=majority";

//conexion a mongodb
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Se ha conectado a la base de datos con exito");
  })
  .catch((err) => {
    console.error(err);
    console.log("Ha fallado la conexion a la base de datos");
  });
process.on("uncaughtexception", () => {
  mongoose.connection.disconnect();
});
