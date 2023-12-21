import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { requestApi } from "./components/@api/fetch";
import InputArea from "./components/ui/InputArea";
import YearPicker from "./components/ui/YearPicker";
import { readAndSplitColumns } from "./helpers/readColumns";
import "./components/ui/loadingProgressBar.css";
import { Modal, Step, StepLabel, Stepper } from "@mui/material";
import templateCsv from "../../../templates/template.csv";
import templatePdf from "../../../templates/template.pdf";
// import templatePdf from "../../../templates/template.pdf";

const styledButton = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
};

const CarregarDados: React.FC = () => {
  const [csvData, setCsvData] = useState<string | null>(null);
  const [selectedCSV, setSelectedCSV] = useState<File | null>(null);
  const [columnsArray, setColumnsArray] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCol = async () => {
      setColumnsArray(await readAndSplitColumns());
    };
    fetchCol();
  }, []);
  const [csvCompleted, setCsvCompleted] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined
  );
  const [viewCsv, setViewCsv] = useState<boolean>(false);

  return (
    <Layout id="loadCsv">
      <div
        style={{
          padding: "20px",
        }}
      >
        {
          //colocar instruções step by step  "Instruções: 1) Subir arquivo; 2) Selecionar ano; 3) Confira o cabeçalho do arquivo; "
        }

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            width: "100vw",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "20px",
              width: window.innerWidth < 600 ? "100%" : "50rem",

              backgroundColor: "#f0f0f0",
              padding: "10px 20px",
              border: "2px solid #ccc",
              borderRadius: "10px",
            }}
          >
            <Stepper
              alternativeLabel
              activeStep={
                !selectedCSV || selectedCSV === null
                  ? 0
                  : !selectedYear
                  ? 1
                  : loading || viewCsv
                  ? 3
                  : 2
              }
            >
              <Step>
                <StepLabel>Upload do arquivo</StepLabel>
              </Step>
              <Step>
                <StepLabel>Selecionar ano</StepLabel>
              </Step>
              <Step>
                <StepLabel>Confira o cabeçalho do arquivo </StepLabel>
              </Step>

              <Step>
                <StepLabel>
                  {" "}
                  Clique em "Enviar", e aguarde o processamento{" "}
                </StepLabel>
              </Step>
            </Stepper>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              gap: "1rem",
              //space between
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                justifyContent: "space-between",
              }}
            >
              <YearPicker
                disabled={loading}
                setSelectedYear={setSelectedYear}
                selectedYear={selectedYear}
              />
              <div
                style={{
                  //align in right
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <button
                  style={{
                    ...styledButton,
                    background: "rgba(200, 0, 0, 1.0)",
                    color: "#fff",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  Sair
                </button>
              </div>
            </div>
            <InputArea
              disabled={loading}
              setSelectedYear={setSelectedYear}
              csvData={csvData}
              setCsvData={setCsvData}
              setSelectedCSV={setSelectedCSV}
            />
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  style={{
                    ...styledButton,

                    background: "rgba(200, 0, 0, 1.0)",
                    color: "#fff",
                  }}
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Tem certeza que deseja excluir todos os dados?"
                      )
                    ) {
                      requestApi("/clear", "DELETE", null);
                      setCsvData(null);
                      setSelectedCSV(null);
                      setSelectedYear(undefined);
                    }
                  }}
                  disabled={loading}
                >
                  Excluir todos os dados
                </button>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                {
                  csvData &&
                    [
                      <button
                        style={{
                          ...styledButton,

                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          //break line

                          border: "2px solid #ccc",
                          borderRadius: "4px",
                          color: "#333",
                          //align left
                          justifyContent: "flex-start",
                        }}
                        onClick={() => setViewCsv(!viewCsv)}
                      >
                        {viewCsv ? "Ocultar CSV" : "Visualizar CSV"}
                      </button>,

                      <button
                        disabled={
                          !selectedYear || loading
                          //check if csvdata include (Columns) as <string>[]
                          // !columnsArray.some((column) => csvData.includes(column))
                        }
                        style={{
                          ...styledButton,
                          background:
                            !selectedYear || loading
                              ? // !columnsArray.some((column) => csvData.includes(column))
                                "#ccc"
                              : "#2754a8",

                          color: "#fff",
                          cursor: !selectedYear
                            ? // !columnsArray.some((column) => csvData.includes(column))
                              "not-allowed"
                            : "pointer",
                        }}
                        onClick={async () => {
                          //send as multipart/form-data file * string($binary)
                          const formData = new FormData();

                          formData.append("file", selectedCSV as File);
                          setLoading(true);

                          const response = await requestApi(
                            "/upload/" + selectedYear,
                            "POST",
                            formData,
                            true
                          );
                          setLoading(false);

                          if (response.statusCode === 200) {
                            setCsvCompleted(true);
                            //wait for 3 seconds
                            setTimeout(() => {
                              setCsvCompleted(false);
                            }, 3000);
                            setViewCsv(false);
                            setSelectedYear(undefined);
                            setCsvData(null);

                            setSelectedCSV(null);
                          } else if (response.statusCode >= 500) {
                            if (
                              response["message"]?.includes(
                                "invalid input syntax for type"
                              )
                            ) {
                              alert("O CSV enviado possui dados inválidos");
                            }
                            if (
                              response["message"]?.includes(
                                "is violated by some row"
                              )
                            ) {
                              alert(
                                "Revise o ano selecionado e tente novamente"
                              );
                            } else {
                              alert("Revise seu arquivo CSV e tente novamente");
                            }
                          } else {
                            if (
                              response["message"]?.includes("Empty CSV file")
                            ) {
                              alert("O CSV enviado está vazio");
                            } else if (
                              response["message"]?.includes("Invalid CSV file")
                            ) {
                              alert("O CSV enviado possui dados inválidos");
                            } else if (
                              response["message"]?.includes("Not a CSV file")
                            ) {
                              alert("O arquivo enviado não é um CSV");
                            } else {
                              alert(
                                "Ocorreu um erro inesperado, tente novamente mais tarde"
                              );
                            }
                          }
                        }}
                      >
                        {loading ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "10px",
                              color: "#333",
                            }}
                          >
                            <progress className="pure-material-progress-circular" />
                            Enviando
                          </div>
                        ) : (
                          "Enviar CSV"
                        )}
                      </button>,
                    ].map((button) => button as JSX.Element | null)
                  //make a circular progressbar
                  // <div style={{  gap: '10px',
                  // display: 'flex',
                  // alignItems: 'center',
                  // }}>
                  // </div>
                }
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: "100%",
                //center
                textAlign: "center",
              }}
            >
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <button
                  style={{
                    ...styledButton,
                    border: "2px solid #ccc",
                    background: "#fff",
                    color: "#333",
                  }}
                  type="button"
                  onClick={() => {
                    //download templateCsv
                    //"../../../templates/template.csv"
                    fetch(templateCsv).then((response) => {
                      response.blob().then((blob) => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.download = "template.csv";
                        a.click();
                      });
                    });
                  }}
                  disabled={loading}
                >
                  Baixar Template CSV
                </button>{" "}
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    style={{
                      ...styledButton,

                      background: "#fff",
                      border: "2px solid #ccc",
                      color: "#333",
                    }}
                    type="button"
                    onClick={() => {
                      fetch(templatePdf).then((response) => {
                        response.blob().then((blob) => {
                          let url = window.URL.createObjectURL(blob);
                          let a = document.createElement("a");
                          a.href = url;
                          a.download = "template.csv";
                          a.click();
                        });
                      });
                    }}
                    disabled={loading}
                  >
                    Baixar Dicionario de Dados
                  </button>
                </div>
              </div>
            </div>
            {csvCompleted ? (
              <p
                style={{
                  marginTop: "20px",
                  padding: "20px",
                  border: "3px solid rgba(0, 190, 0, 1.0) ",
                  borderRadius: "4px",
                  background: "#f5f5f5",
                  color: "rgba(0, 190, 0, 1.0)",
                }}
              >
                Csv enviado com sucesso!
              </p>
            ) : null}
          </div>
          {viewCsv && csvData ? (
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                background: "#f5f5f5",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              <h2>Conteúdo do CSV:</h2>
              <pre
                style={{
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  maxHeight: "12rem",
                  maxWidth: "35rem",
                  overflowY: "auto",
                }}
              >
                {
                  //show csv data first 1000 characters & last 1000 characters
                  csvData.length > 1600
                    ? csvData.substring(0, 800) +
                      "\n\n...\n\n" +
                      csvData.substring(csvData.length - 800, csvData.length)
                    : csvData
                }
              </pre>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  style={{
                    ...styledButton,
                    background: "rgba(200, 0, 0, 1.0)",
                    color: "#fff",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setCsvData(null);
                    setViewCsv(false);
                    setSelectedYear(undefined);
                    setSelectedCSV(null);
                  }}
                >
                  Remover CSV
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <Modal
          open={loading}
          sx={{
            background: "rgba(0, 0, 0, 0.5)",
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              flexDirection: "column",
              padding: "20px",
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              outline: "none",
              height: "100vh",
            }}
          >
            <progress className="pure-material-progress-circular" />
            <h2>Enviando CSV...</h2>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default CarregarDados;
