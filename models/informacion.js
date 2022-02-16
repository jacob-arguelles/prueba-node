const { model, Schema } = require("mongoose");
const infoSchema = new Schema({
  nombre: String,
  apellido: String,
  referencia: String,
  descripcion: String,
  email: String,
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
