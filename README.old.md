# Plataforma de Visualização de Dados de Malária

Para auxiliar gestores, pesquisadores e público em geral a entender melhor sobre a contaminação pela malária no Brasil.

Serviço interativo de análise de indicadores por meio de inteligência artificial.

Diversas visualizações e criação de novas baseado em suas necessidades.

## Frontend

Desenvolvido em **ReactJS**, tecnologia frontend estável e popular, podendo ser facilmente mantida por maior parte da comunidade de desenvolvimento web.

Projeto contendo: imagens, textos e importação de componentes de visualização de dados.

Responsivo, se adaptando a variados tamanhos de tela sem comprometer seu funcionamento em diferentes dispositivos.

## Fluxo de desenvolvimento

Utilzando GitFlow, possui 2 branchs fixas: master e develop - e 1 efêmera: release.

- Master: ambiente de produção, estável com funcionalidades concluídas e aprovadas.
- Release: ambiente de homologação para aprovação de funcionalidades.
- Develop: ambiente instável com funcionalidades em andamentos.

## Deploy

Utilizando Git Actions, as branchs são monitoradas, e a cada novo commit são compiladas e publicadas no Firebase Hosting (GCP).

Ambientes:

- **Produção:**
  [pvd-malaria.web.app](pvd-malaria.web.app)
- **Release:**
  [pvd-malaria-release.web.app](https://pvd-malaria-release.web.app)
- **Develop:**
  [pvd-malaria-dev.web.app](https://pvd-malaria-dev.web.app)

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

Para visualizar o projeto em versão otimizada para publicação:

```
  $ yarn
  $ yarn build
```
