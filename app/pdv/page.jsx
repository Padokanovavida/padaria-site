// pdv_padaria_completo.jsx
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const categorias = [
  "Pães", "Bolos", "Biscoitos", "Doces", "Salgados",
  "Bebidas", "Naturais", "Especiais", "Sem Glúten", "Congelados"
];

const gerarProdutos = (categoria) => {
  return Array.from({ length: 12 }, (_, i) => ({
    nome: `${categoria} ${i + 1}`,
    preco: parseFloat((Math.random() * 10 + 2).toFixed(2)),
    id: `${categoria}-${i}`
  }));
};

const todosProdutos = categorias.reduce((acc, cat) => {
  acc[cat] = gerarProdutos(cat);
  return acc;
}, {});

export default function PDVPadaria() {
  const [venda, setVenda] = useState([]);

  const adicionarItem = (produto) => {
    setVenda((prev) => [...prev, produto]);
  };

  const total = venda.reduce((acc, item) => acc + item.preco, 0);

  const finalizarVenda = () => {
    alert("Venda finalizada: R$" + total.toFixed(2));
    setVenda([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Ponto de Venda</h1>

      <Tabs defaultValue="Pães">
        <TabsList className="flex flex-wrap gap-2 justify-center">
          {categorias.map((cat) => (
            <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
          ))}
        </TabsList>

        {categorias.map((cat) => (
          <TabsContent key={cat} value={cat} className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2">
            {todosProdutos[cat].map((prod) => (
              <Card key={prod.id} onClick={() => adicionarItem(prod)} className="cursor-pointer hover:shadow-lg">
                <CardContent className="p-2">
                  <p className="font-semibold">{prod.nome}</p>
                  <p className="text-sm text-gray-500">R$ {prod.preco.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <div className="text-center mt-6">
        <p className="text-xl font-medium">Total: R${total.toFixed(2)}</p>
        <Button className="mt-2 bg-yellow-500 hover:bg-yellow-600" onClick={finalizarVenda}>
          Finalizar Venda
        </Button>
      </div>
    </div>
  );
}
