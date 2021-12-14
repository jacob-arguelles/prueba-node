module.exports = (error, req, res, next) => {
  console.log(
    "Se ha tenido que usar el midleware 'HandleError' para manejar el error"
  );
  //console.log("se ha tenido que usar el midleware status 405");
  if (error.name === "CastError") {
    console.log(
      "El fallo ha sido: CastError. respondiendo con statusCode: 405"
    );
    res.status(405).end();
  } else {
    console.log(
      "Por ahora no conocemos lo que causo el fallo. Respondiendo con un statusCode: 500"
    );
    res.status(500).end();
  }
};
