import raw from "./columns/columns";

export async function readAndSplitColumns(): Promise<string[]> {
  try {
    const variables = [
      "float",
      "integer",
      "varchar(255)",
      "boolean",
      "date",
      "\n",
    ];
    const linesArray = await fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        let aux = text;
        variables.forEach((variable) => {
          aux = aux.split(variable).join("");
        });
        console.log("aux:", aux);
        return aux.split(",");
      });

    return linesArray;
  } catch (error) {
    console.error(`Erro ao ler o arquivo "columns.txt": ${error}`);
    return [];
  }
}
