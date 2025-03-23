import React from "react";

function onEditar(item) {
  alert("Editar:", item);
}

function onExcluir(item) {
  alert("Excluir:", item);
}

const TabelaDefault = ({ colunas, dados }) => {
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
            <tr key={rowIndex}>
              <td>
                <button
                  className="btn btn-dark btn-sm me-1"
                  onClick={() => onEditar(item)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => onExcluir(item.id)}
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
