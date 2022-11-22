const { Form } = ReactBootstrap;
const { useState } = React;
// Documentação do Bootstrap utilizado: https://react-bootstrap.github.io/

const incial = {
  cep: "",
  logradouro: "",
  complemento: "",
  bairro: "",
  localidade: "",
  uf: "",
  ibge: "",
  gia: "",
  ddd: "",
  siafi: ""
};

function App() {
  const [camposTocados, setCamposTocados] = useState(incial);
  const [dadosCep, setDadosCep] = useState(incial);
  const [cep, setCep] = useState();

  async function fetchCep() {
    const dadosCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(
      (response) => 
        response.json()
    );
    setCamposTocados(dadosCep);
    setDadosCep(dadosCep);
  }

  return (
    <div>
      <Form>
        <Form.Group style={{ marginBottom: "10px" }}>
          <Form.Label>CEP:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite um CEP válido"
            value={cep}
            onBlur={fetchCep}
            onChange={(e) => {
              e.preventDefault();
              setCep(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "10px" }}>
          <Form.Label>Endereço:</Form.Label>
          <Form.Control
            readOnly={camposTocados.logradouro}
            value={dadosCep.logradouro}
            type="text"
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "10px" }}>
          <Form.Label>Bairro:</Form.Label>
          <Form.Control
            readOnly={camposTocados.bairro}
            value={dadosCep.bairro}
            type="text"
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "10px" }}>
          <Form.Label>Cidade:</Form.Label>
          <Form.Control
            readOnly={camposTocados.localidade}
            value={dadosCep.localidade}
            type="text"
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "10px" }}>
          <Form.Label>UF:</Form.Label>
          <Form.Control
            readOnly={camposTocados.uf}
            value={dadosCep.uf}
            type="text"
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "10px" }}>
          <Form.Label>País:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Form>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
