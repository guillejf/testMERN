import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

let ENDPOINT_PRODUCTOS = "http://localhost:8080/api/productos/";

function App() {
  const [productos, setProductos] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [foto, setFoto] = useState("");

  function handleBorrar(_id) {
    fetch(ENDPOINT_PRODUCTOS + _id, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((result) => {
        cargarProductos();
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }

  function handleEditar() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({ nombre, descripcion, precio, stock, foto });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(ENDPOINT_PRODUCTOS + id, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        cargarProductos();
      })
      .catch((error) => console.log("error", error));
  }

  function cargarProductos() {
    fetch(ENDPOINT_PRODUCTOS)
      .then((res) => res.json())
      .then((json) => setProductos(json.data.productos));
  }

  function handleNuevo() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({ nombre, descripcion, precio, stock, foto });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(ENDPOINT_PRODUCTOS, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        cargarProductos();
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  function handleSetProperties(prod) {
    setId(prod._id);
    setNombre(prod.nombre);
    setDescripcion(prod.descripcion);
    setPrecio(prod.precio);
    setStock(prod.stock);
    setFoto(prod.foto);
  }

  return (
    <div className="App">
      <button onClick={() => setId("")}>+</button>
      {productos &&
        productos.length > 0 &&
        productos.map((prod) => (
          <div>
            "_id": {prod._id}
            <br />
            "timestamp": {prod.timestamp}
            <br />
            "nombre": {prod.nombre}
            <br />
            "descripcion": "nos salva a todos", "codigo": {prod.descripcion}
            <br />
            <img style={{ width: "200px" }} src={prod.foto} alt={prod.nombre} />
            "precio": {prod.precio}
            <br />
            "stock": {prod.stock}
            <br />
            <button onClick={() => handleBorrar(prod._id)}>borrar</button>
            <button onClick={() => handleSetProperties(prod)}>Editar</button>
            <hr />
          </div>
        ))}
      <div>
        {id ? "EDITANDO " + id : "INGRESE UNO NUEVO"}
        <br />
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="nombre"
        />
        <br />
        <input
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="descripcion"
        />
        <br />
        <input
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="precio"
        />
        <br />
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="stock"
        />
        <br />
        <input
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          placeholder="foto"
        />
      </div>

      {!id && <button onClick={handleNuevo}>Nuevo</button>}
      {id && <button onClick={handleEditar}>Editar</button>}
    </div>
  );
}

export default App;
