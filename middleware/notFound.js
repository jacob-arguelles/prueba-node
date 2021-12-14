module.exports = (req, res) => {
  console.log(
    "se ha usado el middleware 'not found'. respondiendo con un statusCode: 404"
  );
  res.status(404).end();
};
