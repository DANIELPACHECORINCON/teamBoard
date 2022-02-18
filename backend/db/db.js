import mongoose from "mongoose";
// funcion para conectar con la base de datos
const dbconnection = async () => {
  try {
    // aca le damos el enlace de coneccion con la base datos 
    await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    console.log("connection with MongoDB: OK");
  } catch (e) {
    console.log("Error connecting to MongoDB: \n"+e);
  }
};

export default { dbconnection };
