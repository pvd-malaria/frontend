### Estrutura dos diretórios em Bokeh

O RidgePlot é um gráfico da biblioteca "Bokeh" do Python
Em `components/Pipenv` temos o ambiente de seu desenvolvimento com um script em Python que gera nosso ridge plot
Em `components/ridges` temos um componente em React com um iframe do gráfico buildado e seus botões de download

Para gerar o grafico

1. Entrar no diretorio de `Visualizacoes`
2. Entrar no ambiente do Python com `pipenv shell`
3. Executar `python3 index.py`

Dica: use o comando `ls` (Unix) ou `dir` para listar os diretórios e arquivos.

Exemplo:
`$ pipenv shell`
`$ python3 ridges.py`

Um `$ ridge.html` será gerado no mesmo diretório


Para buildar um componente do React:

Para buildar:

1. Execute o comando `npm i`, necessário apenas uma vez
2. `npx parcel build Visualizacoes/components/nome_do_diretorio/nome_do_arquivo.html`
3. O resultado estará no diretório `dist/`