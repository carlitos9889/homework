import Header from "./components/Header";
import useGraphic from "./hooks/useGraphic";
import { Bar } from "react-chartjs-2";
import useSelectConexion from "./hooks/useSelectConexion";

export const App = () => {
  // informacion para las graficas

  const {
    categoriaName,
    categorias,
    data,
    handleChangeCategoria,
    handleChangeMarca,
    handleChangeProducto,
    marcaName,
    marcas,
    options,
    productoName,
    productos,
  } = useSelectConexion();

  return (
    <div>
      {/* Header donde se muestra el Menu, User Name y Sales Resport  */}
      <Header />
      {/* Container de los campos de filtrado */}
      <div className="container_filter">
        {/* Filtro Categoria */}
        <label>
          Categoria:
          <select
            onChange={handleChangeCategoria}
            name="cat"
            value={categoriaName}
            id="cat"
          >
            {categorias.map((cat) => (
              <option key={cat.categoria}>{cat.categoria}</option>
            ))}
          </select>
        </label>
        {/* Filtro Producto */}
        <label>
          Producto:
          <select
            onChange={handleChangeProducto}
            name="producto"
            value={productoName}
            id="producto"
          >
            {productos.map((prod) => (
              <option key={prod.producto}>{prod.producto}</option>
            ))}
          </select>
        </label>
        {/* Filtro Marca */}
        <label>
          Marca:
          <select
            onChange={handleChangeMarca}
            name="marca"
            value={marcaName}
            id="marca"
          >
            {marcas.map((marca) => (
              <option key={marca.marca}>{marca.marca}</option>
            ))}
          </select>
        </label>
      </div>
      {/* Grafica */}
      <div className="container_grafica">
        <Bar options={options} data={data} height={300} width={400} />
      </div>
    </div>
  );
};
