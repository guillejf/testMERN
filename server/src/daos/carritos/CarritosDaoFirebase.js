const ContenedorFirebase = require("../../contenedores/ContenedorFirebase");

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carritos");
  }
}

module.exports = CarritosDaoFirebase;
