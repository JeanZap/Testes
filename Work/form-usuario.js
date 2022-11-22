import * as yup from "https://cdn.skypack.dev/yup@0.32.11";

const { useState } = React;

const ValidarForm = yup.object().shape({
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email(),
  telefone: yup.string().required("Campo obrigatório"),
  senha: yup.string().min(8).required("Campo obrigatório"),
});

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  function mascaraTelefone(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");

    return valor.replace(/(\d)(\d{4})$/, "$1-$2");
  }

  async function submeter(evento) {
    evento.preventDefault();
    const valores = { nome, telefone, email, senha, confirmarSenha };

    if (senha !== confirmarSenha) {
      setErro("Senhas diferem.");
      return;
    }

    try {
      await ValidarForm.validate(valores);
      setSucesso(true);
    } catch (erro) {
      setErro(erro.errors[0]);
    }
  }

  return sucesso ? (
    <h1>Cadastrado com sucesso</h1>
  ) : (
    <form onSubmit={submeter}>
      <h4>Editando Registro</h4>
      <div className="ContainerForm">
        <div className="ContainerInputLabel">
          <label>Nome</label>
          <input
            name="nome"
            type="text"
            value={nome}
            onChange={(e) => {
              e.preventDefault();
              setNome(e.target.value);
            }}
          />
        </div>

        <div className="ContainerInputLabel">
          <label>E-mail</label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="ContainerInputLabel">
          <label>Telefone</label>
          <input
            name="telefone"
            type="text"
            value={mascaraTelefone(telefone)}
            onChange={(e) => {
              e.preventDefault();
              setTelefone(e.target.value);
            }}
          />
        </div>

        <div className="ContainerInputLabel">
          <label>Senha</label>
          <input
            name="senha"
            type="password"
            value={senha}
            onChange={(e) => {
              e.preventDefault();
              setSenha(e.target.value);
            }}
          />
        </div>

        <div className="ContainerInputLabel">
          <label>Confirmar senha</label>
          <input
            name="confirmarSenha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => {
              e.preventDefault();
              setConfirmarSenha(e.target.value);
            }}
          />
        </div>
      </div>

      <p>{erro}</p>

      <div>
        <button type="submit">Confirmar</button>
      </div>
    </form>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

// form {
//   display: flex;
//   flex-direction: column;
//   margin: 0.5rem;
// }

// button {
//   margin: 0.5rem;
// }

// p {
//   color: red;
//   margin: 0.5rem;
// }

// h1 {
//   color: green;
// }

// .ContainerForm {
//   display: flex;
//   flex-wrap: wrap;
//   margin: 1rem 0 0.5rem 0.5rem;
//   gap: 0.5rem;
// }

// .ContainerInputLabel {
//   display: flex;
//   flex-direction: column;
//   width: 16rem;
// }
