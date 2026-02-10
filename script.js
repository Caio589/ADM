let projetos = JSON.parse(localStorage.getItem("projetos")) || [];

function salvar() {
  localStorage.setItem("projetos", JSON.stringify(projetos));
}

function adicionarProjeto() {
  const nome = document.getElementById("nome").value;
  const cliente = document.getElementById("cliente").value;
  const status = document.getElementById("status").value;
  const valor = Number(document.getElementById("valor").value);

  if (!nome || !cliente || !status || !valor) {
    alert("Preencha tudo");
    return;
  }

  projetos.push({
    id: Date.now(),
    nome,
    cliente,
    status,
    valor,
    pago: false
  });

  salvar();
  listarProjetos();
}

function listarProjetos() {
  const lista = document.getElementById("listaProjetos");
  lista.innerHTML = "";

  projetos.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.nome}</strong> | ${p.cliente} | ${p.status} | R$ ${p.valor}
      | Pago: ${p.pago ? "Sim" : "Não"}
      <button onclick="marcarPago(${p.id})">✔</button>
    `;
    lista.appendChild(li);
  });
}

function marcarPago(id) {
  const projeto = projetos.find(p => p.id === id);
  if (projeto) {
    projeto.pago = true;
    salvar();
    listarProjetos();
  }
}

function calcularTotal() {
  const total = projetos
    .filter(p => p.pago)
    .reduce((soma, p) => soma + p.valor, 0);

  document.getElementById("total").innerText =
    "Total recebido: R$ " + total;
}

listarProjetos();
