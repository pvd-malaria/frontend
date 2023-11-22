import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { requestApi } from "./components/@api/fetch";
import InputArea from "./components/ui/InputArea";
import YearPicker from "./components/ui/YearPicker";
import { readAndSplitColumns } from "./helpers/readColumns";

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
  console.log("columnsArray", columnsArray);

  useEffect(() => {
    console.log("fetching columns");
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
                width: "100%",
              }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  style={{
                    ...styledButton,
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",

                    border: "2px solid #ccc",
                    borderRadius: "4px",
                    color: "#333",
                    //align left
                    justifyContent: "flex-start",
                  }}
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Tem certeza que deseja limpar o banco de dados?"
                      )
                    ) {
                      requestApi("/clear", "DELETE", null);
                      setCsvData(null);
                      setSelectedCSV(null);
                      setSelectedYear(undefined);
                    }
                  }}
                >
                  Limpar banco de dados
                </button>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                {csvData &&
                  [
                    <button
                      style={{
                        ...styledButton,
                        background: "rgba(200, 0, 0, 1.0)",
                        color: "#fff",
                      }}
                      onClick={() => setViewCsv(!viewCsv)}
                    >
                      {viewCsv ? "Ocultar CSV" : "Visualizar CSV"}
                    </button>,

                    <button
                      disabled={
                        !selectedYear
                        //check if csvdata include (Columns) as <string>[]
                        // !columnsArray.some((column) => csvData.includes(column))
                      }
                      style={{
                        ...styledButton,
                        background: !selectedYear
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

                        const response = await requestApi(
                          "/upload/" + selectedYear,
                          "POST",
                          formData,
                          true
                        );

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
                          console.log(response);

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
                            alert("Revise o ano selecionado e tente novamente");
                          } else {
                            alert("Revise seu arquivo CSV e tente novamente");
                          }
                        } else {
                          alert(
                            "Ocorreu um erro inesperado, tente novamente mais tarde"
                          );
                        }
                      }}
                    >
                      Enviar CSV
                    </button>,
                  ].map((button) => button as JSX.Element | null)}
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
                {csvData}
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
      </div>
    </Layout>
  );
};

export default CarregarDados;
