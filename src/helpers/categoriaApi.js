const url = "https://backend-vesubio.onrender.com/api/categorias";
const token = JSON.parse(localStorage.getItem("token"));
const limite = 6;

export const getCategorias = async (desde = 0) => {
  try {
    const resp = await fetch(url + "?limite=" + limite + "&desde=" + desde, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo obtener la informacion!");
  }
};

//Traer categorías por el id
export const getCategoriaById = async (id) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo obtener la informacion!");
  }
};

//crear categoria
export const crearCategoria = async (datos) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "No se conecto al backend!" };
  }
};

//Actualizar Categoría
export const actualizarCategoria = async (id, datos) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "No se conecto al backend!" };
  }
};

//Borrar Categoría
export const borrarCategoria = async (id) => {
  try {
    const resp = await fetch(url + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "No se conecto al backend!" };
  }
};
