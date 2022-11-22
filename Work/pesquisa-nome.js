const { Table, Form } = ReactBootstrap;
const { useState } = React;
// Documentação do Bootstrap utilizado: https://react-bootstrap.github.io/

function App() {
  let itensTabela = [
    {
      id: 1,
      nome: "Fulano da Silva",
      telefone: "(27) 993234-4353",
      email: "fulanodasilva@hotmail.com",
    },
    {
      id: 2,
      nome: "João da Costa Silva",
      telefone: "(27) 994354-4365",
      email: "joaozinho@hotmail.com",
    },
    {
      id: 3,
      nome: "Beltrano Souza",
      telefone: "(27) 998475-1456",
      email: "beltrano@gmail.com",
    },
    {
      id: 4,
      nome: "Luiz Beltrano da Silva",
      telefone: "(27) 998847-9854",
      email: "luizbs@codenapp.com",
    },
    {
      id: 5,
      nome: "Washington Oliverita",
      telefone: "(27) 999432-1453",
      email: "woliveira@yahoo.com",
    },
    {
      id: 6,
      nome: "Pedro Álvares Cabral",
      telefone: "(27) 999847-1432Ω",
      email: "pedroalvarescabral@descobrimento.com.br",
    },
  ];

  const [itensListados, setItensListados] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  function filtrar(pesquisa) {
    setPesquisa(pesquisa);

    if (pesquisa.length > 2) {
      const itensListados = itensTabela.filter(({ nome }) =>
        nome.toUpperCase().includes(pesquisa.toUpperCase())
      );
      setItensListados(itensListados);
    } else if (itensListados !== []) {
      setItensListados([]);
    }
  }

  function handleChange(e) {
    const pesquisa = e.target.value;
    e.preventDefault();

    filtrar(pesquisa);
  }

  function detectarEnter(e) {
    const pesquisa = e.target.value;

    if (e.key === "Enter") {
      filtrar(pesquisa);
    }
  }

  return (
    <div>
      <Form>
        <Form.Group style={{ marginBottom: "20px" }}>
          <Form.Control
            type="text"
            placeholder="Digite um nome e pesquise por ele"
            onKeyPress={handleChange}
            onBlur={handleChange}
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {itensListados.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.telefone}</td>
                <td>{item.email}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
