import { useState } from "react";

export default function SelecionarProdutos({ options, produtos, setProdutos }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [qntd, setQntd] = useState("");

  const adicionarAoCarrinho = () => {
    if (!selectedOption || !qntd || qntd <= 0) {
      alert("Selecione um item e defina uma quantidade válida.");
      return;
    }

    const itemSelecionado = options.find((item) => item.id === selectedOption);

    const novoItem = {
      id: itemSelecionado.id,
      nome: itemSelecionado.nome,
      quantidade: parseInt(qntd, 10),
      preco: itemSelecionado.preco,
    };

    setProdutos([...produtos, novoItem]);
    setSelectedOption("");
    setQntd("");
  };

  const removerDoCarrinho = (id) => {
    const produtosAtualizados = produtos.filter((item) => item.id !== id);
    setProdutos(produtosAtualizados);
  };

  return (
    <div className="mt-3">
      <h4 className="mb-3">Adicionar produtos ao pedido</h4>

      <div className="row">
        <div className="col-md-6">
          <label htmlFor="dropdown" className="form-label">
            Produto:
          </label>
          <select
            id="dropdown"
            className="form-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Selecione um produto</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.nome} | R${option.preco}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="inputQntd" className="form-label">
            Quantidade:
          </label>
          <input
            type="number"
            id="inputQntd"
            className="form-control"
            placeholder="Digite a quantidade"
            value={qntd}
            onChange={(e) => setQntd(e.target.value)}
          />
        </div>

        <div className="col-md-2 d-flex align-items-end">
          <button
            className="btn btn-dark w-100"
            type="button"
            onClick={adicionarAoCarrinho}
          >
            ➕ Adicionar
          </button>
        </div>
      </div>

      {produtos.length > 0 && (
        <div className="mt-4">
          <h5>Produtos do pedido:</h5>
          <ul className="list-group">
            {produtos.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.nome} - {item.quantidade} UN - R$
                {item.preco * item.quantidade}
                <button
                  className="btn btn-danger btn-sm ms-3"
                  onClick={() => removerDoCarrinho(item.id)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
