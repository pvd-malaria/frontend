import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { requestApi } from "../@api/fetch";

interface InputAreaProps {
  csvData: string | null;
  setCsvData: React.Dispatch<React.SetStateAction<string | null>>;

  setSelectedYear: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedCSV: React.Dispatch<React.SetStateAction<File | null>>;
}

const InputArea = ({
  setSelectedYear,
  csvData,
  setCsvData,
  setSelectedCSV,
}: InputAreaProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      // check if filename is .csv
      if (!file.name.includes(".csv") || file.type !== "text/csv") {
        alert("O arquivo selecionado não é um arquivo CSV válido!");
        setCsvData(null);
        setSelectedCSV(null);

        return;
      }
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        setCsvData(result);
        setSelectedCSV(file);
      };
 

      reader.readAsText(file);

      // if (
      //   file.name.includes("_") && //check if is number try parse
      //   !isNaN(Number(file.name.split("_")[1].replace(".csv", "")))
      // ) {
      //   setSelectedYear(Number(file.name.split("_")[1].replace(".csv", "")));
      // }
      setSelectedYear(undefined);
    },
    [setCsvData, setSelectedYear, setSelectedCSV]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <>
      {!csvData ? (
        <div
          {...getRootProps()}
          style={{
            border: "3px dashed rgba(0, 0, 0, 0.5)",
            borderRadius: "4px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            width: "40rem",
          }}
        >
          <input {...getInputProps()} type="file" accept=".csv, text/csv" />

          <p
            style={{
              margin: "1rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            Arraste e solte um arquivo CSV aqui ou clique para selecionar um
            arquivo
          </p>

        </div>
      ) : (
        <div
          {...getRootProps()}
          style={{
            border: "3px dashed rgba(0, 180, 0, 0.5)",
            borderRadius: "4px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            width: "40rem",
            position: "relative",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 0, 0, 0.05)";
            e.currentTarget.style.border = "3px dashed rgba(200, 0, 0, 1.0)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 0, 0, 0.0)";
            e.currentTarget.style.border = "3px dashed rgba(0, 180, 0, 1.0)";
          }}
        >
          <input {...getInputProps()} accept=".csv" />
          {
             <h2 style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              zIndex: 1,
              color: "rgba(0, 180, 0, 1.0)",
            }}/>
          }
          <p
            style={{
              margin: "1rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "rgba(0, 180, 0, 1.0)",
            }}
          >
            Arquivo CSV carregado com sucesso!
          </p>
        </div>
      )}

    </>
  );
};

export default InputArea;
