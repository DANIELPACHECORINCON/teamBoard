import roleModel from "../models/role.js";

// metodo para registrar el role
// le ponemos async para que la funcion sea asincrona
const registerRole = async (req, res) => {
  // validamos si los datos vienen vacios, si es asi rompe el proceso y envia una respuesta
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "inconplete data" }); //respuesta de error cuando los datos vinen vacios

  // creamos una variable donde creamos el schema con los datos necesarios, deve ser igual a la que esta en models/rol.js
  let schemaRole = new roleModel({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  // guardamos la informacion en la base de datos
  // usamos await donde sabemos que el proceso se va a demorar un poco para que espere antes de seguir el proceso
  let result = await schemaRole.save();
  // verificamos que todo salga bien, si salio mal mostramos mensaje de error
  if (!result)
    return res.status(500).send({ message: "failed to register role" });
  // si todo sale vien devolvemos mensaje de exito y la variable result
  return res.status(200).send({ result });
};

// funcion para listar los roles
const listRole = async (req, res) => {
  // con .find() listamos todos los  documentos de la coleccion
  let roles = await roleModel.find();
  // verificamos que no venga vacio el array
  if (roles.length === 0)
    return res.status(400).send({ message: "No search results" });
  // devolvemos el array con los documentos de la coleccion
  return res.status(200).send({ roles });
};

export default { registerRole, listRole };
