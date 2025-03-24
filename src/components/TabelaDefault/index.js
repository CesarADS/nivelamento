import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TabelaDefault = ({ colunas, dados }) => {
  const location = useLocation();
  const navigate = useNavigate();

  function verLocal() {
    if (location.pathname === "/visualizar-usuarios") {
      const url = "http://localhost:3001/usuarios";
      return url;
    }
  }

  function onEditar(item) {
    alert("Editar:", item);
  }

  function onExcluir(item, rowIndex) {
    const url_rota = verLocal();

    axios
      .put(`${url_rota}/${item.id}`, { status: "excluido" })
      .then((response) => {
        alert("Item excluído com sucesso!");
        console.log(response.data);

        const row = document.getElementById(`row-${rowIndex}`);
        if (row) {
          row.remove();
        }
      })
      .catch((error) => {
        alert("Erro ao excluir:", error);
      });
  }

  return (
    <div className="container mt-4">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col"></th>
            {colunas.map((coluna, index) => (
              <th key={index} scope="col">
                {coluna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((item, rowIndex) => (
            <tr key={rowIndex} id={`row-${rowIndex}`}>
              <td>
                <button
                  className="btn btn-dark btn-sm me-1"
                  onClick={() => onEditar(item)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => onExcluir(item, rowIndex)}
                >
                  🗑
                </button>
              </td>
              {colunas.map((coluna, colIndex) => (
                <td key={colIndex}>{item[coluna]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaDefault;
