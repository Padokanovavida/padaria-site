'use client';
import { useState } from 'react';

const categorias = {
  'Pães Franceses': ['Pão Francês', 'Pão Integral', 'Pão Sovado'],
  'Pães Doces': ['Pão de Leite', 'Rosca Doce', 'Pão Recheado'],
  'Bolos': ['Bolo de Cenoura', 'Bolo de Milho', 'Bolo de Chocolate'],
  'Biscoitos': ['Biscoito de Polvilho', 'Cookies', 'Biscoito Doce'],
  'Salgados': ['Coxinha', 'Empada', 'Pão de Queijo'],
  'Tortas': ['Torta de Frango', 'Torta de Limão', 'Torta de Morango'],
  'Bebidas': ['Café', 'Suco Natural', 'Refrigerante'],
  'Linha Fit': ['Pão Proteico', 'Bolo Integral', 'Suco Verde'],
  'Linha Vegana': ['Pão Vegano', 'Bolo Sem Leite', 'Coxinha de Jaca'],
  'Combos': ['Combo Café da Manhã', 'Combo da Tarde', 'Combo Especial'],
};

export default function PDV() {
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);

  const adicionar = (produto) => {
    const preco = 3 + Math.random() * 10;
    setPedido([...pedido, { nome: produto, preco }]);
    setTotal((t) => t + preco);
  };

  const finalizar = () => {
    const resumo = pedido.map(p => `- ${p.nome} R$${p.preco.toFixed(2)}`).join('\n');
    alert(`Pedido finalizado:\n${resumo}\nTotal: R$${total.toFixed(2)}`);
    setPedido([]);
    setTotal(0);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>PDV da Padaria</h1>
      {Object.entries(categorias).map(([categoria, produtos]) => (
        <div key={categoria}>
          <h2>{categoria}</h2>
          {produtos.map((p) => (
            <button key={p} onClick={() => adicionar(p)} style={{ margin: 4, padding: 8 }}>
              {p}
            </button>
          ))}
        </div>
      ))}
      <hr />
      <h3>Resumo do Pedido:</h3>
      <ul>
        {pedido.map((p, i) => (
          <li key={i}>{p.nome} - R${p.preco.toFixed(2)}</li>
        ))}
      </ul>
      <strong>Total: R${total.toFixed(2)}</strong><br />
      <button onClick={finalizar} style={{ marginTop: 10 }}>Finalizar Pedido</button>
    </div>
  );
}
