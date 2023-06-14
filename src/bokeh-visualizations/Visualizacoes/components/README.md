### Build do componente com grafico

O componente ridge é feito a partir do grafico com iframe no componente do React
*IMPORTANTE:* O html mostrado no iframe deve estar no _mesmo_ diretório do componente buildado

Dica: use o comando `ls` (Unix) ou `dir` para listar os diretórios e arquivos.

Para buildar:

1. Execute o comando `cd ../../` para navegar para `Visualizacoes`
2. Execute o comando `npm i`, necessário apenas uma vez
3. `npx parcel build Visualizacoes/components/nome_do_diretorio/nome_do_arquivo.html`
4. O resultado estará no diretório `dist/`