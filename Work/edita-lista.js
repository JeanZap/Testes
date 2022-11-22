let { Form, Table, Button } = ReactBootstrap;
// Documentação do Bootstrap utilizado: https://react-bootstrap.github.io/

const { useState } = React;

function App() {
  let itensTabelaLista = [
    {
      id: 1,
      dataCadastro: "2020-12-01",
      valor: 34.5,
      telefone: "27998874625",
      permiteEdicao: false,
    },
    {
      id: 2,
      dataCadastro: "2020-12-04",
      valor: 31.56,
      telefone: "27998534625",
      permiteEdicao: true,
    },
    {
      id: 3,
      dataCadastro: "2021-01-23",
      valor: 124.1,
      telefone: "32998544641",
      permiteEdicao: true,
    },
    {
      id: 4,
      dataCadastro: "2021-04-18",
      valor: 242.99,
      telefone: "2733199546",
      permiteEdicao: true,
    },
  ];

  const [showForm, setShowForm] = useState(false);
  const [valueID, setValueID] = useState(0);
  const [valueDataCadastro, setValueDataCadastro] = useState("00/00/0000");
  const [valueTelefone, setValueTelefone] = useState("");
  const [valueValor, setValueValor] = useState("");
  const [itensTabela, setItensTabela] = useState(itensTabelaLista);

  function submeter() {
    const indice = itensTabela.findIndex((a, b) => a.id === b.id);

    itensTabelaLista[indice].telefone = valueTelefone;
    itensTabelaLista[indice].valor = valueValor;

    setItensTabela(itensTabelaLista);
  }

  return (
    <>
      <Form className={!showForm && "hidden"} style={{ marginBottom: "25px" }}>
        <h4>Editando Registro</h4>
        <div className="row mb-2">
          <div className="col-sm-2">
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" value={valueID} readOnly />
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>Data de Cadastro</Form.Label>
              <Form.Control type="text" value={valueDataCadastro} readOnly />
            </Form.Group>
          </div>
          <div className="col-sm-2">
            <Form.Group>
              <Form.Label>Valor (R$)</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setValueValor(e.target.value);
                }}
                value={valueValor.toFixed}
              />
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group>
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setValueTelefone(e.target.value);
                }}
                value={valueTelefone}
              />
            </Form.Group>
          </div>
          <div className="col-sm-2">
            <Button onClick={submeter} variant="success">
              Alterar
            </Button>
          </div>
        </div>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data de Cadastro</th>
            <th>Valor (R$)</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {itensTabela.map((item, index) => {
            function trata(valor) {
              valor = valor.replace(/\D/g, "");
              valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");

              return valor.replace(/(\d)(\d{4})$/, "$1-$2");
            }
            const valor = item.valor.toFixed(2);
            const telefone = trata(item.telefone);
            const dataCadastro = `${item.dataCadastro.substring(
              8,
              10
            )}/${item.dataCadastro.substring(
              5,
              7
            )}/${item.dataCadastro.substring(0, 3)}`;
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{dataCadastro}</td>
                <td>{valor}</td>
                <td>{telefone}</td>
                <td>
                  <Button
                    disabled={!item.permiteEdicao}
                    onClick={() => {
                      setShowForm(true);
                      setValueID(item.id);
                      setValueDataCadastro(item.dataCadastro);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pen"
                      viewBox="0 0 16 16"
                    >
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));



// td {
//   color: #4f4f4f;
//   font-family: sans-serif
// }

// th {
//   color: #4f4f4f;
//   font-family: sans-serif;
//   font-size: 16px;
// }