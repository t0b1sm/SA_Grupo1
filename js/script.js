// ============ USUÁRIOS ============
function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios") || "[]");
  }
  
  function setUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
  
  function cadastrarUsuario() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  
    let usuarios = getUsuarios();
    if (usuarios.find(u => u.email === email)) {
      alert("Esse email já está cadastrado!");
      return;
    }
  
    usuarios.push({ nome, email, senha });
    setUsuarios(usuarios);
    alert("Usuário cadastrado com sucesso!");
    window.location = "login.html";
  }
  
  function loginUsuario() {
    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;
    const usuarios = getUsuarios();
  
    const user = usuarios.find(u => u.email === email && u.senha === senha);
    if (user) {
      localStorage.setItem("usuarioLogado", JSON.stringify(user));
      alert("Login bem-sucedido!");
      window.location = "veiculos.html";
    } else {
      alert("Email ou senha incorretos!");
    }
  }
  
  function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location = "login.html";
  }
  
  function recuperarSenha() {
    const email = document.getElementById("emailRec").value;
    const usuarios = getUsuarios();
    const user = usuarios.find(u => u.email === email);
    if (user) {
      alert("Link de redefinição enviado (simulado)!");
    } else {
      alert("Email não encontrado!");
    }
  }
  
  // ============ VEÍCULOS ============
  function getVeiculos() {
    return JSON.parse(localStorage.getItem("veiculos") || "[]");
  }
  
  function setVeiculos(v) {
    localStorage.setItem("veiculos", JSON.stringify(v));
  }
  
  function adicionarVeiculo() {
    const placa = document.getElementById("placa").value;
    const modelo = document.getElementById("modelo").value;
  
    let veiculos = getVeiculos();
    if (veiculos.find(v => v.placa === placa)) {
      alert("Placa já cadastrada!");
      return;
    }
  
    veiculos.push({ placa, modelo });
    setVeiculos(veiculos);
    document.getElementById("formVeiculo").reset();
    carregarVeiculos();
  }
  
  function carregarVeiculos() {
    const lista = document.getElementById("listaVeiculos");
    if (!lista) return;
    const veiculos = getVeiculos();
  
    lista.innerHTML = "";
    veiculos.forEach((v, i) => {
      const li = document.createElement("li");
      li.textContent = `${v.placa} - ${v.modelo}`;
      const btn = document.createElement("button");
      btn.textContent = "Excluir";
      btn.onclick = () => {
        veiculos.splice(i, 1);
        setVeiculos(veiculos);
        carregarVeiculos();
      };
      li.appendChild(btn);
      lista.appendChild(li);
    });
  }
  
  // ============ RELATÓRIO ============
  function gerarRelatorio() {
    const div = document.getElementById("relatorio");
    const veiculos = getVeiculos();
    if (!veiculos.length) {
      div.innerHTML = "<p>Nenhum veículo cadastrado.</p>";
      return;
    }
  
    let html = "<table border='1' style='margin:auto'><tr><th>Placa</th><th>Modelo</th></tr>";
    veiculos.forEach(v => {
      html += `<tr><td>${v.placa}</td><td>${v.modelo}</td></tr>`;
    });
    html += "</table>";
    div.innerHTML = html;
  }
  