import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

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

      console.log(file);
      console.log(reader);

      reader.readAsText(file);

      if (
        file.name.includes("_") && //check if is number try parse
        !isNaN(Number(file.name.split("_")[1].replace(".csv", "")))
      ) {
        setSelectedYear(Number(file.name.split("_")[1].replace(".csv", "")));
      }
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
            border: "2px dashed #ccc",
            borderRadius: "4px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            width: "30rem",
          }}
        >
          <input {...getInputProps()} type="file" accept=".csv, text/csv" />

          <p
            style={{
              margin: "1rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#ccc",
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
            border: "2px dashed rgba(0, 255, 0, 0.5)",
            borderRadius: "4px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            width: "30rem",
            position: "relative",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 0, 0, 0.05)";
            e.currentTarget.style.border = "2px dashed rgba(255, 0, 0, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 0, 0, 0.0)";
            e.currentTarget.style.border = "2px dashed rgba(0, 255, 0, 0.5)";
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
              color: "#FFF",
            }}/>
          }
          <p
            style={{
              margin: "1rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#ccc",
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
