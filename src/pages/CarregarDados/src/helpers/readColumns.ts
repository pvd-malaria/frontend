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

    let aux = raw;
    variables.forEach((variable) => {
      aux = aux.split(variable).join("");
    }); 
    return aux.split(",");

    // return linesArray;
  } catch (error) {
    console.error(`Erro ao ler o arquivo "columns.txt": ${error}`);
    return [];
  }
}
