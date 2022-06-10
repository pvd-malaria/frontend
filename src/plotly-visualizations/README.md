# Visualizações Malária

### Executar os gráficos (hot reload)

1. Execute o comando `npm i`, necessário apenas uma vez
2. Execute o comando `npx parcel index.html`
3. Abra o arquivo `index.html` no navegador e edite os códigos no seu editor de texto preferido

### Build de todos os gráficos (pronto para deploy) - Alternativa 1

1. Execute o comando `npm i`, necessário apenas uma vez
2. Execute o comando `compile.sh`
3. Os resultados aparecerão, após gerados, no diretório `dist/`

### Build de todos os gráficos (pronto para deploy) - Alternativa 2

1. Execute o comando `npm i`, necessário apenas uma vez
2. Execute o comando `rm -rf dist` e ignore se não existir
3. Para cada diretório dentro de `Visualizacoes`, execute o comando abaixo:
4. `npx parcel build Visualizacoes/nome_do_diretorio/nome_do_arquivo.html`
5. O resultado estará no diretório `dist/`

Dica: use o comando `ls` (Unix) ou `dir` para listar os diretórios e arquivos.

Exemplo:
`$ npm i`
`$ npx parcel build Visualizacoes/Rendimento/income.html`
