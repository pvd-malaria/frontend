import Layout from "../../components/Layout";

function Estatisticas() {
  return (
    <Layout id="pageVisualizacoesDetalhes">

<section className="wrapperInfo">
          <div className="container">
            {/* <Link to="/visualizacoes">Galeria de visualizações</Link> */}
            <h1> Séries Temporais </h1> 
            <p className='description'>Análise de variância univariada no tempo </p>
          </div>
        </section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          width: "100vw",
          flexDirection: "column",
        }}
      > 
        <div className="visualization">
          <iframe
          title="Séries Temporais"
            src="/dash"
            style={{
              //center
              justifyContent: "center",
              width: "70vw",
              height: "90vh",
              //rounded border
              background: "rgba(255, 255, 255, 1)",
              borderRadius: "5px",
              border: "none",
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Estatisticas;
