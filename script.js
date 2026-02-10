let projetos = JSON.parse(localStorage.getItem("projetos")) || [];
let pendencias = JSON.parse(localStorage.getItem("pendencias")) || [];
let reunioes = JSON.parse(localStorage.getItem("reunioes")) || [];

let projetoEditandoId = null;

/* ================== SALVAR ================== */
function salvar() {
  localStorage.setItem("projetos", JSON.stringify(projetos));
  localStorage.setItem("pendencias", JSON.stringify(pendencias));
  localStorage.setItem("reunioes", JSON.stringify(reunioes));
}

/* ================== PROJETOS ================== */
function addProjeto() {
  if (
    nome.value.trim() === "" ||
    cliente.value.trim() === "" ||
    status.value.trim() === "" ||
    valor.value === ""
  ) {
    alert("Preencha todos os campos");
    return;
  }

  if (projetoEditandoId) {
    const p = projetos.find(p => p.id === projetoEditandoId);
    p.nome = nome.value;
    p.cliente = cliente.value;
    p.status = status.value;
    p.valor = Number(valor.value);
    projetoEditandoId = null;
  } else {
    projetos.push({
      id: Date.now(),
      nome: nome.value,
      cliente: cliente.value,
      status: status.value,
      valor: Number(valor.value),
      pago: false
    });
  }

  salvar();
  listarTudo();
  limparCampos();
}

function editarProjeto(id) {
  const p = projetos.find(p => p.id === id);
  if (!p) return;

  nome.value = p.nome;
  cliente.value = p.cliente;
  status.value = p.status;
  valor.value = p.valor;

  projetoEditandoId = id;
}

function alternarPago(id) {
  const p = projetos.find(p => p.id === id);
  if (!p) return;

  p.pago = !p.pago;
  salvar();
  listarProjetos();
}

function listarProjetos() {
  listaProjetos.innerHTML = "";
  pendenciaProjeto.innerHTML = "";

  projetos.forEach(p => {
    listaProjetos.innerHTML += `
      <li>
        <strong>${p.nome}</strong> | ${p.cliente} | ${p.status} | R$ ${p.valor}
        | <b>${p.pago ? "PAGO" : "NÃO PAGO"}</b><br>
        <button onclick="editarProjeto(${p.id})">✏️ Editar</button>
        <button onclick="alternarPago(${p.id})">
          ${p.pago ? "Marcar Não Pago" : "Marcar Pago"}
        </button>
      </li>
    `;

    pendenciaProjeto.innerHTML += `
      <option value="${p.id}">${p.nome}</option>
    `;
  });
}

function limparCampos() {
  nome.value = "";
  cliente.value = "";
  status.value = "";
  valor.value = "";
}

/* ================== PENDÊNCIAS ================== */
function addPendencia() {
  if (pendenciaTexto.value.trim() === "") return;

  pendencias.push({
    id: Date.now(),
    texto: pendenciaTexto.value,
    projetoId: pendenciaProjeto.value
  });

  salvar();
  pendenciaTexto.value = "";
  listarPendencias();
}

function listarPendencias() {
  listaPendencias.innerHTML = "";

  pendencias.forEach(p => {
    listaPendencias.innerHTML += `
      <li>
        ${p.texto}
        <button onclick="concluirPendencia(${p.id})">✔ OK</button>
      </li>
    `;
  });
}

function concluirPendencia(id) {
  pendencias = pendencias.filter(p => p.id !== id);
  salvar();
  listarPendencias();
}

/* ================== REUNIÕES ================== */
function addReuniao() {
  if (!reuniaoData.value || !reuniaoHora.value) return;

  reunioes.push({
    id: Date.now(),
    data: reuniaoData.value,
    hora: reuniaoHora.value,
    obs: reuniaoObs.value
  });

  salvar();
  reuniaoData.value = "";
  reuniaoHora.value = "";
  reuniaoObs.value = "";
  listarReunioes();
}

function listarReunioes() {
  listaReunioes.innerHTML = "";

  reunioes.forEach(r => {
    listaReunioes.innerHTML += `
      <li>
        ${r.data} ${r.hora} - ${r.obs}
        <button onclick="excluirReuniao(${r.id})">🗑️</button>
      </li>
    `;
  });
}

function excluirReuniao(id) {
  reunioes = reunioes.filter(r => r.id !== id);
  salvar();
  listarReunioes();
}

/* ================== FINANCEIRO ================== */
function calcularTotal() {
  const totalValor = projetos
    .filter(p => p.pago)
    .reduce((soma, p) => soma + p.valor, 0);

  total.innerText = "Total recebido: R$ " + totalValor;
}

/* ================== INIT ================== */
function listarTudo() {
  listarProjetos();
  listarPendencias();
  listarReunioes();
}

listarTudo();
