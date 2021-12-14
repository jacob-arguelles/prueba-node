const { model, Schema } = require("mongoose");
const infoSchema = new Schema({
  nombre: String,
  apellido: String,
  edad: String,
  celular: Array,
});
infoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const modelInfo = new model("Info", infoSchema);
module.exports = modelInfo;

//referencia de una creacion a la base de datos

/* modelInfo.find({}).then((result) => {
  console.log(result);
  mongoose.connection.close();
}); */

/* const newInformacion = new modelInfo({
  nombre: "Adriana",
  apellido: "Gutierrez",
  edad: "18 años",
  celular: ["04146698579", "02682527046"],
});

newInformacion
  .save()
  .then((result) => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
  });
 
 */
