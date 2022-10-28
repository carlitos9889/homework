import { useState, useEffect } from "react";
import { Categoria, Marca, Producto, RespDataJSON } from "../models/dataModel";
import datajson from "../../data/data.json";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";

const useSelectConexion = () => {
  const dataJson = datajson as RespDataJSON;

  // let { data, options } = useGraphic([1, 2, 3, 4]);

  // ------------------- manejadores de estado ----------------------//

  const [arrGrafico, setarrGrafico] = useState(
    dataJson.categorias[0].productos[0].marcas[0].ventas
  );

  const [categorias] = useState<Categoria[]>(dataJson.categorias);
  const [categoriaName, setcategoriaName] = useState<string>("comida");

  const [productos, setproductos] = useState<Producto[]>(
    categorias[0].productos
  );
  const [productoName, setproductoName] = useState<string>("banana");

  const [marcas, setmarcas] = useState<Marca[]>(
    categorias[0].productos[0].marcas
  );
  const [marcaName, setmarcaName] = useState<string>("Cubana");

  // -------- Funciones auxilaires --------------------//
  const arrProductosforCategorias = () => {
    const categoria = categorias.find((cat) => cat.categoria === categoriaName);
    setproductos(categoria!.productos);
  };
  const arrMarcasforProductos = () => {
    const producto = productos.find((prod) => prod.producto === productoName);
    setmarcas(producto!.marcas);
  };
  const arrValoresForMarca = () => {
    const marca = marcas.find((m) => m.marca === marcaName);
    setarrGrafico(marca!.ventas);
  };

  // -------------- handlesChaneges ---------------------------//
  const handleChangeCategoria = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setcategoriaName(event.target.value);
  };

  const handleChangeProducto = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setproductoName(event.target.value);
  };

  const handleChangeMarca = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setmarcaName(event.target.value);
  };

  useEffect(() => {
    arrProductosforCategorias();
  }, [categoriaName]);

  useEffect(() => {
    // esta no es la mejor solución pero fue lo que se me ocurrió en el momento
    // por la estructura que creé de json, no es muy óptimo recorrer un arreglo
    // para devolver el primer elemento, esa información deberia tenerla implementada
    // en alguna otra funcion que ya me devuelva el valor
    setproductoName(productos.map((prod) => prod.producto)[0]);
  }, [productos]);

  useEffect(() => {
    arrMarcasforProductos();
  }, [productoName]);

  useEffect(() => {
    setmarcaName(marcas.map((marca) => marca.marca)[0]);
  }, [marcas]);

  useEffect(() => {
    arrValoresForMarca();
  }, [marcaName]);

  //  ----------------------Datos refernetes a la grafica -----------------------------------//
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Sales Buy Month for:",
      },
    },
  };

  const labels = ["January", "February", "March", "April"];

  const data = {
    labels,
    datasets: [
      {
        label: "Ventas",
        data: arrGrafico,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return {
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
  };
};

export default useSelectConexion;
