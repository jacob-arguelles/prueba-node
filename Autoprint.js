module.exports = "/clienteAutoprint", (req, res) => {
  console.log("Han realizado un .POST");
  const infor = req.body;
  if (!infor.nombre || !infor.referencia || !infor.apellido || !infor.email || !infor.descripcion) {
    console.log("Ha fallado el .POST");
    console.log("respondiendo con un statusCode: 400");
    return res.status(400).end();
  } else {
    console.log("se esta procesando el .POST");
    const newinfo = new modelInfo({
      nombre: infor.nombre,
      apellido: infor.apellido,
      referencia: infor.referencia,
      email: infor.email,
      descripcion: infor.descripcion
    });
    newinfo.save().then((infoSave) => {
      console.log("se ha guardado la siguente informacion:");
      console.log(infoSave);
    });

    res.status(201).json(infor);
  }
};