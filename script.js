let projetos = JSON.parse(localStorage.getItem("projetos")) || [];
let pendencias = JSON.parse(localStorage.getItem("pendencias")) || [];
let reunioes = JSON.parse(localStorage.getItem("reunioes")) || [];

// salvar tudo no localStorage
function salvar() {
  localStorage.setItem("projetos", JSON.stringify(projetos));
  localStorage.setItem("pendencias", JSON.stringify(pendencias));
  localStorage.setItem("reunioes", JSON.stringify(reunioes));
}

// ================== PROJETOS ==================
function addProjeto() {
  if (!nome.value || !cliente.value || !status.value || !valor.value) {
    alert("Preencha todos os campos do projeto");
    return;
  }

  projetos.push({
    id: Date.now(),
    nome: nome.value,
    cliente: cliente.value,
    status: status.value,
    valor: Number(valor.value),
    pago: false
  });

  salvar();
  listarTudo();

  // 🔹 LIMPAR CAMPOS AUTOMATICAMENTE
  nome.value = "";
  cliente.value = "";
  status.value = "";
  valor.value = "";
}

function listarProjetos() {
  listaProjetos.innerHTML = "";
  pendenciaProjeto.innerHTML = "";

  projetos.forEach(p => {
    listaProjetos.innerHTML += `
      <li>
        <strong>${p.nome}</strong> | ${p.cliente} | ${p.status} | R$ ${p.valor}
        | Pago: ${p.pago ? "Sim" : "Não"}
        <button onclick="pagar(${p.id})">✔</button>
      </li>
    `;

    pendenciaProjeto.innerHTML += `
      <option value="${p.id}">${p.nome}</option>
    `;
  });
}

function pagar(id) {
  const projeto = projetos.find(p => p.id === id);
  if (projeto) {
    projeto.pago = true;
    salvar();
    listarTudo();
  }
}

// ================== PENDÊNCIAS ==================
function addPendencia() {
  if (!pendenciaTexto.value) {
    alert("Informe a pendência");
    return;
  }

  pendencias.push({
    id: Date.now(),
    texto: pendenciaTexto.value,
    projetoId: pendenciaProjeto.value,
    feita: false
  });

  salvar();
  listarPendencias();

  // limpar campo
  pendenciaTexto.value = "";
}

function listarPendencias() {
  listaPendencias.innerHTML = "";
  pendencias.forEach(p => {
    listaPendencias.innerHTML += `
      <li>
        ${p.texto} | Concluída: ${p.feita ? "Sim" : "Não"}
        <button onclick="concluir(${p.id})">✔</button>
      </li>
    `;
  });
}

function concluir(id) {
  const p = pendencias.find(x => x.id === id);
  if (p) {
    p.feita = true;
    salvar();
    listarPendencias();
  }
}

// ================== REUNIÕES ==================
function addReuniao() {
  if (!reuniaoData.value || !reuniaoHora.value) {
    alert("Informe data e hora");
    return;
  }

  reunioes.push({
    id: Date.now(),
    data: reuniaoData.value,
    hora: reuniaoHora.value,
    obs: reuniaoObs.value
  });

  salvar();
  listarReunioes();

  // limpar campos
  reuniaoData.value = "";
  reuniaoHora.value = "";
  reuniaoObs.value = "";
}

function listarReunioes() {
  listaReunioes.innerHTML = "";
  reunioes.forEach(r => {
    listaReunioes.innerHTML += `
      <li>${r.data} ${r.hora} - ${r.obs}</li>
    `;
  });
}

// ================== FINANCEIRO ==================
function calcularTotal() {
  const totalValor = projetos
    .filter(p => p.pago)
    .reduce((soma, p) => soma + p.valor, 0);

  total.innerText = "Total recebido: R$ " + totalValor;
}

// ================== INIT ==================
function listarTudo() {
  listarProjetos();
  listarPendencias();
  listarReunioes();
}

listarTudo();
