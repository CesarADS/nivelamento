import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProdutos = () => {
  const [options, setOptions] = useState([{
    id: 1,
    nome: "Café com leite",
    quantidade: 1,  
    preco: 10,
  }]);

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/produtos?status=ativo");
        setOptions(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    buscarProdutos();
  }, []);

  return { options };
};