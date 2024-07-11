const Proveedor = require("../models/proveedor");

// Add Proveedor
const addProveedor = (req, res) => {
  const newProveedor = new Proveedor({
    nombre: req.body.nombre,
    razonSocial: req.body.razonSocial,
    nombreComercial: req.body.nombreComercial,
    rfc: req.body.rfc,
    curp: req.body.curp,
    calle: req.body.calle,
    numero: req.body.numero,
    colonia: req.body.colonia,
    municipio: req.body.municipio,
    estado: req.body.estado,
    pais: req.body.pais,
    telefono: req.body.telefono,
    email: req.body.email,
    codigopostal: req.body.codigopostal,
    giroempresa: req.body.giroempresa,
    condicionespago: req.body.condicionespago,
    contactopago: req.body.contactopago,
    correopago: req.body.correopago,
    telefonopago: req.body.telefonopago,
    nombrecorroborador: req.body.nombrecorroborador,
    cargocorroborador: req.body.cargocorroborador,
  });

  newProveedor
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Proveedores
const getAllProveedores = async (req, res) => {
  const findAllProveedores = await Proveedor.find({}).sort({ _id: -1 });
  res.json(findAllProveedores);
};

// Delete Selected Proveedor
const deleteSelectedProveedor = async (req, res) => {
  const deleteProveedor = await Proveedor.deleteOne({ _id: req.params.id });
  res.json(deleteProveedor);
};

// Update Selected Proveedor
const updateSelectedProveedor = async (req, res) => {
  try {
    const updatedResult = await Proveedor.findByIdAndUpdate(
      { _id: req.body.proveedorID },
      {
        nombre: req.body.nombre,
        razonSocial: req.body.razonSocial,
        nombreComercial: req.body.nombreComercial,
        rfc: req.body.rfc,
        curp: req.body.curp,
        calle: req.body.calle,
        numero: req.body.numero,
        colonia: req.body.colonia,
        municipio: req.body.municipio,
        estado: req.body.estado,
        pais: req.body.pais,
        telefono: req.body.telefono,
        email: req.body.email,
        codigopostal: req.body.codigopostal,
        giroempresa: req.body.giroempresa,
        condicionespago: req.body.condicionespago,
        contactopago: req.body.contactopago,
        correopago: req.body.correopago,
        telefonopago: req.body.telefonopago,
        nombrecorroborador: req.body.nombrecorroborador,
        cargocorroborador: req.body.cargocorroborador,
      },
      { new: true }
    );
    res.json(updatedResult);
  } catch (error) {
    res.status(402).send("Error");
  }
};

// Search Proveedores
const searchProveedor = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const proveedores = await Proveedor.find({
    nombre: { $regex: searchTerm, $options: "i" },
  });
  res.json(proveedores);
};

module.exports = {
  addProveedor,
  getAllProveedores,
  deleteSelectedProveedor,
  updateSelectedProveedor,
  searchProveedor,
};
