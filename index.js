require("dotenv").config();
require("./mongo");
const express = require("express");
const modelInfo = require("./models/informacion");
const cors = require("cors");
const notFound = require("./middleware/notFound");
const handleError = require("./middleware/handleError");
const app = express();

const xml = require('xml');
const Autoprint = require("./Autoprint");

app.use(cors());
app.use(express.json());

//Metodos GET

app.get("/", (req, res) => {
  res.send("<h1 >Hola, te saluda Jacob</h1>").end();
});

app.get("/informacion", (req, res) => {
  modelInfo.find({}).then((respuesta) => {
    console.log(`Han solicitado toda la informacion`);
    res.json(respuesta).end();
  });
});

//Busqueda por id y respondiendo con xml

app.get("/vicente/:id", (req, res, next) => {
  //obteniendo la id de la solicitud
  const { id } = req.params;
  console.log(`Han hecho una busqueda por id`);
  //buscando la id en la base de datos
  modelInfo
    .findById(id)
    .then((note) => {
      if (note) {
        console.log(`se ha encontrado la id:${id}`);
        console.log(note)

        const Enviando = [
          {informacion:[
            {nombre:note.nombre},
            {apellido:note.apellido},
            {edad:note.edad},
            {celular:[{Primer: note.celular[0]},{Segundo: note.celular[1]}]},
            {ID:note.id}
          ]}
        ]

        console.log(Enviando)
        const enviar = xml(Enviando,{declaration:true})
        console.log(enviar)
        res.type('application/xml')
        res.send(enviar)
        
      } else {
        console.log(`No se ha encontrado ninguna coincidencia para id:${id}`);
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(
        `La id:${id} no cumple con las caracteristicas segun la base de datos`
      );
      console.log('Utilizando "next" para ir al middlewares');
      next(err);
    });
});

//fin del codigo


app.get("/informacion/:id", (req, res, next) => {
  //obteniendo la id de la solicitud
  const { id } = req.params;
  console.log(`Han hecho una busqueda por id`);
  //buscando la id en la base de datos
  modelInfo
    .findById(id)
    .then((note) => {
      if (note) {
        console.log(`se ha encontrado la id:${id}`);
        res.json(note);
      } else {
        console.log(`No se ha encontrado ninguna coincidencia para id:${id}`);
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(
        `La id:${id} no cumple con las caracteristicas segun la base de datos`
      );
      console.log('Utilizando "next" para ir al middlewares');
      next(err);
    });
});

//Metodo DELETE

app.delete("/informacion/:id", (req, res) => {
  const { id } = req.params;
  console.log(`han solicitado un .DELETE para la id:${id}`);
  const infoBorrado = modelInfo.findById(id);
  modelInfo
    .findByIdAndDelete(id)
    .then((resultado) => {
      console.log(`Se ha borrado con exito la informacion ${infoBorrado}`);
      res.status(202).end();
    })
    .catch((error) => {
      console.log("ha fallado el .DELETE, respondiendo con un statusCode: 400");
      res.status(400).end();
    });
});

//Metodo PUT

app.put("/informacion/:id", (req, res) => {
  console.log("Han realizado un .PUT");

  const { id } = req.params;
  const info_update = req.body;

  const newInfoToUpdate = {
    nombre: info_update.nombre,
    apellido: info_update.apellido,
    edad: info_update.edad,
    celular: info_update.celular,
  };
  modelInfo
    .findByIdAndUpdate(id, newInfoToUpdate, { new: true })
    .then((update) => {
      res.status(200).json(update);
      console.log(`se ha actualizado la siguiente informacion: ${update}`);
    });
});

//Metodo POST
app.post(Autoprint)
app.post("/informacion", (req, res) => {
  console.log("Han realizado un .POST");
  const infor = req.body;
  if (!infor.nombre || !infor.celular || !infor.apellido || !infor.edad) {
    console.log("Ha fallado el .POST");
    console.log("respondiendo con un statusCode: 400");
    return res.status(400).end();
  } else {
    console.log("se esta procesando el .POST");
    const newinfo = new modelInfo({
      nombre: infor.nombre,
      apellido: infor.apellido,
      edad: infor.edad,
      celular: infor.celular,
    });
    newinfo.save().then((infoSave) => {
      console.log("se ha guardado la siguente informacion:");
      console.log(infoSave);
    });

    res.status(201).json(infor);
  }
});

//middleware
app.use(notFound);
app.use(handleError);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("El servidor se esta ejecutando en el puerto:" + PORT);
  console.log("Se esta conectando la base de datos, espere unos segundos");
});
