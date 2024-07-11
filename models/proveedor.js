const mongoose = require("mongoose");

const ProveedorSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    razonSocial:{type: String,},
    nombreComercial:{type: String,},
    rfc:{type: String,},
    curp:{type: String,},
    calle:{type: String,},
    numero:{type: Number},
    colonia:{type: String,},
    municipio:{type: String,},
    estado:{type: String,},
    pais:{type: String,},
    telefono:{type: String,},
    email:{type: String,},
    codigopostal:{type: String,},
    giroempresa:{type: String,},
    condicionespago:{type: String,},
    contactopago:{type: String,},
    correopago:{type: String,},
    telefonopago:{type: String,},
    nombrecorroborador:{type: String,},
    cargocorroborador:{type: String,},
  },
  { timestamps: true }
);

const Proveedor = mongoose.models.Proveedor || mongoose.model("Proveedor", ProveedorSchema);
module.exports = Proveedor;
