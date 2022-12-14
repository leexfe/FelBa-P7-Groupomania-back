// invoque la librairie jsonwebtoken pour maintenir la session côté client au lieu de stocker les sessions sur le serveur
const jwt = require("jsonwebtoken");

// Regarde s'il ya un token dans la requète, puis vérifie s'il est valide,il décode le token pour passer à la suite:
function checkToken(req, res, next) {
  console.log("req.body-checkToken :", req.body);
  const token = req.headers.authorization.split(" ")[1];
  if (token == null) return res.status(401).send({ error: "token manquant" });

  jwt.verify(token, process.env.MDP, (error, decoded) => {
    console.log("decoded", decoded);
    if (error) return res.status(401).send({ error: "token invalide" });
    //rajoute une propriété sur la requète (req.email) qui représente ce qu'il a reçu dans le decoded
    //affilie l'email decodé  à req.emaildans le token:
    req.email = decoded.email;
    //affilie l'id decodé  à req.userId ldans le token:
    req.userId = decoded.id;
    next();
  });
}
console.log("checkToken dans token.js", checkToken);

module.exports = { checkToken };
