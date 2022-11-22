# Plataforma de Visualização de Dados de Malária

Para auxiliar gestores, pesquisadores e público em geral a entender melhor sobre a contaminação pela malária no Brasil.

Serviço interativo de análise de indicadores por meio de inteligência artificial.

Diversas visualizações e criação de novas baseado em suas necessidades.

## Frontend

Desenvolvido em **ReactJS**, tecnologia frontend estável e popular, podendo ser facilmente mantida por maior parte da comunidade de desenvolvimento web.

Projeto contendo: imagens, textos e importação de componentes de visualização de dados.

Responsivo, se adaptando a variados tamanhos de tela sem comprometer seu funcionamento em diferentes dispositivos.

## Fluxo de desenvolvimento

Utilzando GitFlow, possui 2 branchs fixas: master e develop.

- Master: ambiente de produção, estável com funcionalidades concluídas e aprovadas.
- Develop: ambiente instável com funcionalidades em andamentos.

Novas versões são definidas quando:

- Novos pacotes são enviados da branch develop para master. Através de uma branch release.
- Quando uma correção é feita na master. Através de uma branch hotfix.

## Deploy

Automático através do Git Actions que monitora branchs: develop e master.

A cada novo commit o projeto é compilado e publicado no Firebase Hosting (GCP) e seu respectivo destino.

Ambientes:

- **master:**
  [pvd-malaria.web.app](pvd-malaria.web.app)
- **develop:**
  [pvd-malaria-develop-w4.web.app](https://pvd-malaria-develop-w4.web.app)

## Arquitetura

- Yarn
- Firebase
  - Hosting
- ReactJS
  - Hooks
  - Context
- Typescript
- Sass
- Env

## Executando o projeto

Basta baixar o projeto, instalar as dependências e executar o projeto usando yarn:

```
  $ git clone https://github.com/pvd-malaria/frontend
  $ yarn
  $ yarn start
```

