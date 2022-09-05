import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

import {
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

import CONFIG from '../../core/config';

import Layout from '../../components/Layout';
import './styles.css';


interface IFormData {
  idade?: string;
  idadeTipo?: string;
  sexo: string;
  cor: string;
  escolaridade: string;
  ocupacaoProfissional: string;
  gestante: string;
  sintomas: string;
  tratamentoVivax: string;
  tratamentoFalciparum: string;
  tipoLamina: string;
  tipoExameRealizado: string;
  resultadoExame: string;
  quantidadeDeCruzesNoExame: string;
  presencaDeHemoparasitas: string;
}


function Classificacao() {

  const [formSubmited, setFormSubmited] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({
    idade: '',
    idadeTipo: 'anos',
    sexo: '',
    cor: '',
    escolaridade: '',
    ocupacaoProfissional: '',
    gestante: '',
    sintomas: '',
    tratamentoVivax: '',
    tratamentoFalciparum: '',
    tipoLamina: '',
    tipoExameRealizado: '',
    resultadoExame: '',
    quantidadeDeCruzesNoExame: '',
    presencaDeHemoparasitas: '',
  });


  const formChangeHandle = useCallback((prop: keyof IFormData, value: string) => {
      setFormData({ 
        ...formData,
        [prop]: value
      });
  }, [formData]);


  const idadeTipoClickHandle = useCallback(() => {
    setFormData({
      ...formData,
      idadeTipo: formData.idadeTipo === 'anos' ? 'meses' : 'anos',
    });
  }, [formData]);


  const formIsValid = useCallback((): Boolean => {
    let valid = true;

    for (const [key, value] of Object.entries(formData)) {
      if (value === '')
        valid = false;
    }

    return valid;
  }, [formData]);


  const formSubmitHandle = useCallback(() => {
    setFormSubmited(true);
    
    // Request body
    if (formIsValid()) {
      const requestBody = {
        id_pacie: Number(formData.idade),
        id_dimea: (formData.idade === 'anos' ? 0 : 1),
        sexo: Number(formData.sexo),
        raca: Number(formData.cor),
        niv_esco: Number(formData.escolaridade),
        cod_ocup: Number(formData.ocupacaoProfissional),
        gestante: Number(formData.gestante),
        sintomas: Number(formData.sintomas),
        vivax: Number(formData.tratamentoVivax),
        falciparum: Number(formData.tratamentoFalciparum),
        tipo_lam: Number(formData.tipoLamina),
        exame: Number(formData.tipoExameRealizado),
        res_exam: Number(formData.resultadoExame),
        qtd_cruz: Number(formData.quantidadeDeCruzesNoExame),
        hemoparasi: Number(formData.presencaDeHemoparasitas),
      };

      axios.post(
        CONFIG.API_CLASSIFIER, 
        requestBody
      )
      .then(function (response) {
        console.log(response);
      })
      .finally(() => {
        console.log('---> axios.finally');
        // TODO: remove loading.
        // TODO: reset form.
        // TODO: goto result graph.
      });
    }
  }, [formIsValid]);


  const formResetHandle = useCallback(() => {
    setFormSubmited(false);
    // TODO: clear formData.
  }, [setFormSubmited]);


  useEffect(() => {
    
  }, []);


  return (
    <Layout id="pageClassificacao">
      <section className="wrapperInfo">
        <div className="container">
          <h1>Classificador de esquemas de tratamento malaria usando IA</h1>
          <h4>Esquemas de tratamento de malária</h4>
          <p>
            Em uma análise de dados realizadas no banco de dados SIVEP-Malária, foi identificado 
            que o Esquema de Tratamento mais utilizado (82,8%) é o esquema **"Infecções pelo P. 
            vivax, ou P. ovale com Cloroquina em 3 dias e Primaquina em 7 dias"** (aqui denominado 
            **Esquema 11**). Os demais 17,2% dos indivíduos da base, foram tratados com algum 
            outro esquema de tratamento. Atualmente existem 27 Esquemas de Tratamentos pré-definidos, 
            além de uma opção "Outros Esquemas de Tratamentos".
          </p>
          <h4>Modelos de IA: Machine Learning</h4>
          <p>
            Utilizando algoritmos de aprendizado de máquina e dados SIVEP-Malária, foi criado um 
            Sistema de IA para recomendação de esquema de tratamento de malária. Considerando a 
            grande quantidade de indivíduos tratados com o **Esquema 11**, desenvolvemos um modelo 
            de aprendizado de máquina que calcula a probalidade de um indivíduo (identificado 
            conforme dados do formulário abaixo), receber indicação para o **Esquema 11**, ou não, 
            e neste caso, o indivíduo deve receber indicação de um esquema de tratamento, diferente 
            do **Esquema 11**.
          </p>
          <h4>Sistema de suporte decisão</h4>
          <p>
            Para realizar a recomendação, o modelo baseia-se em reconhimento de padrões que podem 
            ser observados nos dados utilizados. A Figura 1 abaixo mostra a importância de cada 
            variável para o modelo, ou seja, as variáveis mais relevantes utilizadas pelo modelo 
            para a recomendação são nesta ordem: 1) "Resultado do Exame", 2) "Idade do paciente", 
            e assim sucessivamente. A Figua 2 apresenta métricas de avaliação do modelo.
          </p>
        </div>
      </section>      

      <section className="wrapperForm">
        <div className="container">
          <div className="form">
            <h1>Simular cenário</h1>
            <p>
              Defina o perfil do paciente no formulário abaixo para obter recomendação se o Esquema 
              de "Tratamento 11" é recomendado, ou se é recomendado "Outros Esquemas".
            </p>


            <form action="">
              <h4>Informações Sociodemográficas</h4>

              <div className="formElements">
                <FormControl fullWidth>
                  <InputLabel htmlFor="input-idade">Idade</InputLabel>
                  <OutlinedInput
                    id="input-idade"
                    type="number"
                    autoComplete="off"
                    value={formData.idade}
                    error={formSubmited && formData.idade === ''}
                    label="Idade"
                    onChange={(event) => formChangeHandle('idade', event.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button onClick={idadeTipoClickHandle}>
                          {formData.idadeTipo}
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="input-sexo">Sexo</InputLabel>
                  <Select
                    labelId="input-sexo"
                    value={formData.sexo}
                    error={formSubmited && formData.sexo === ''}
                    label="Sexo"
                    onChange={(event) => formChangeHandle('sexo', event.target.value)}
                  >
                    <MenuItem value="0">Masculino</MenuItem>
                    <MenuItem value="1">Feminino</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="input-cor">Raça/Cor</InputLabel>
                  <Select
                    labelId="input-cor"
                    value={formData.cor}
                    error={formSubmited && formData.cor === ''}
                    label="Raça/Cor"
                    onChange={(event) => formChangeHandle('cor', event.target.value)}
                  >
                    <MenuItem value="0">Amarela</MenuItem>
                    <MenuItem value="1">Branca</MenuItem>
                    <MenuItem value="2">Indígena</MenuItem>
                    <MenuItem value="3">Parda</MenuItem>
                    <MenuItem value="4">Preta</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="input-escolaridade">Escolaridade</InputLabel>
                  <Select
                    labelId="input-escolaridade"
                    value={formData.escolaridade}
                    error={formSubmited && formData.escolaridade === ''}
                    label="Escolaridade"
                    onChange={(event) => formChangeHandle('escolaridade', event.target.value)}
                  >
                    <MenuItem value="0">1ª a 4ª série incompleta do EF</MenuItem>
                    <MenuItem value="1">4ª série completa do EF</MenuItem>
                    <MenuItem value="2">5ª a 8ª série incompleta do EF</MenuItem>
                    <MenuItem value="3">Analfabeto</MenuItem>
                    <MenuItem value="4">Educação superior completa</MenuItem>
                    <MenuItem value="5">Educação superior incompleto</MenuItem>
                    <MenuItem value="6">Ensino fundamental completo</MenuItem>
                    <MenuItem value="7">Ensino médio completo</MenuItem>
                    <MenuItem value="8">Ensino médio incompleto</MenuItem>
                    <MenuItem value="9">Não se aplica</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="input-ocupacaoProfissional">Tipo de ocupação profissional</InputLabel>
                  <Select
                    labelId="input-ocupacaoProfissional"
                    value={formData.ocupacaoProfissional}
                    error={formSubmited && formData.ocupacaoProfissional === ''}
                    label="Tipo de ocupação profissional"
                    onChange={(event) => formChangeHandle('ocupacaoProfissional', event.target.value)}
                  >
                    <MenuItem value="0">Agricultura</MenuItem>
                    <MenuItem value="1">Caça/Pesca</MenuItem>
                    <MenuItem value="2">Construção de estradas/barragens</MenuItem>
                    <MenuItem value="3">Doméstica</MenuItem>
                    <MenuItem value="4">Exploração Vegetal</MenuItem>
                    <MenuItem value="5">Garimpagem</MenuItem>
                    <MenuItem value="6">Ignorado</MenuItem>
                    <MenuItem value="7">Mineração</MenuItem>
                    <MenuItem value="8">Outros</MenuItem>
                    <MenuItem value="9">Pecuária</MenuItem>
                    <MenuItem value="10">Turismo</MenuItem>
                    <MenuItem value="11">Viajante</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="input-gestante">Está gestante?</InputLabel>
                  <Select
                    labelId="input-gestante"
                    value={formData.gestante}
                    error={formSubmited && formData.gestante === ''}
                    label="Está gestante"
                    onChange={(event) => formChangeHandle('gestante', event.target.value)}
                  >
                    <MenuItem value="0">1º Trimestre</MenuItem>
                    <MenuItem value="1">2º Trimestre</MenuItem>
                    <MenuItem value="2">3º Trimestre</MenuItem>
                    <MenuItem value="3">Idade gestacional ignorada</MenuItem>
                    <MenuItem value="4">Não</MenuItem>
                    <MenuItem value="5">Não se aplica</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <h4>Informações Epdemiológicas</h4>

              <div className="formElements">
                <FormControl fullWidth>
                  <InputLabel id="input-sintomas">Paciente com ou sem sintomas?</InputLabel>
                  <Select
                    labelId="input-sintomas"
                    value={formData.sintomas}
                    error={formSubmited && formData.sintomas === ''}
                    label="Paciente com ou sem sintomas"
                    onChange={(event) => formChangeHandle('sintomas', event.target.value)}
                  >
                    <MenuItem value="0">Com</MenuItem>
                    <MenuItem value="1">Sem</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="input-tratamentoVivax">Realizou tratamento para vivax?</InputLabel>
                  <Select
                    labelId="input-tratamentoVivax"
                    value={formData.tratamentoVivax}
                    error={formSubmited && formData.tratamentoVivax === ''}
                    label="Realizou tratamento para vivax"
                    onChange={(event) => formChangeHandle('tratamentoVivax', event.target.value)}
                  >
                    <MenuItem value="0">Não tratado p/ vivax &lt; 60 dias</MenuItem>
                    <MenuItem value="1">Tratado p/ vivax &lt; 60 dias</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="input-tratamentoFalciparum">Realizou tratamento para falciparum?</InputLabel>
                  <Select
                    labelId="input-tratamentoFalciparum"
                    value={formData.tratamentoFalciparum}
                    error={formSubmited && formData.tratamentoFalciparum === ''}
                    label="Realizou tratamento para falciparum"
                    onChange={(event) => formChangeHandle('tratamentoFalciparum', event.target.value)}
                  >
                    <MenuItem value="0">Não tratado p/ falciparum &lt; 40 dias</MenuItem>
                    <MenuItem value="1">Tratado p/ falciparum &lt; 40 dias</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <h4>Informações do Exame</h4>

              <div className="formElements">
                <FormControl fullWidth>
                  <InputLabel id="input-tipoLamina">Tipo de lâmina</InputLabel>
                  <Select
                    labelId="input-tipoLamina"
                    value={formData.tipoLamina}
                    error={formSubmited && formData.tipoLamina === ''}
                    label="Tipo de lâmina"
                    onChange={(event) => formChangeHandle('tipoLamina', event.target.value)}
                  >
                    <MenuItem value="0">Detecção Ativa</MenuItem>
                    <MenuItem value="1">Detecção Passiva</MenuItem>
                    <MenuItem value="2">LVC (ficha antiga)</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="input-tipoExameRealizado">Tipo do exame realizado</InputLabel>
                  <Select
                    labelId="input-tipoExameRealizado"
                    value={formData.tipoExameRealizado}
                    error={formSubmited && formData.tipoExameRealizado === ''}
                    label="Tipo do exame realizado"
                    onChange={(event) => formChangeHandle('tipoExameRealizado', event.target.value)}
                  >
                    <MenuItem value="0">Gota espessa</MenuItem>
                    <MenuItem value="1">Teste rápido</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="input-resultadoExame">Resultado do exame</InputLabel>
                  <Select
                    labelId="input-resultadoExame"
                    value={formData.resultadoExame}
                    error={formSubmited && formData.resultadoExame === ''}
                    label="Resultado do exame"
                    onChange={(event) => formChangeHandle('resultadoExame', event.target.value)}
                  >
                    <MenuItem value="0">F+Fg</MenuItem>
                    <MenuItem value="1">F+M</MenuItem>
                    <MenuItem value="2">F+V</MenuItem>
                    <MenuItem value="3">Falciparum</MenuItem>
                    <MenuItem value="4">Fg</MenuItem>
                    <MenuItem value="5">Malariae</MenuItem>
                    <MenuItem value="6">Não Falciparum</MenuItem>
                    <MenuItem value="7">Ovale</MenuItem>
                    <MenuItem value="8">V+Fg</MenuItem>
                    <MenuItem value="9">Vivax</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="input-quantidadeDeCruzesNoExame">Quantidade de cruzes no exame</InputLabel>
                  <Select
                    labelId="input-quantidadeDeCruzesNoExame"
                    value={formData.quantidadeDeCruzesNoExame}
                    error={formSubmited && formData.quantidadeDeCruzesNoExame === ''}
                    label="Quantidade de cruzes no exame"
                    onChange={(event) => formChangeHandle('quantidadeDeCruzesNoExame', event.target.value)}
                  >
                    <MenuItem value="0">+</MenuItem>
                    <MenuItem value="1">++</MenuItem>
                    <MenuItem value="2">+++</MenuItem>
                    <MenuItem value="3">++++</MenuItem>
                    <MenuItem value="4">+/2</MenuItem>
                    <MenuItem value="5">&lt; +/2</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="input-presencaDeHemoparasitas">Quanto presença de Hemoparasitas</InputLabel>
                  <Select
                    labelId="input-presencaDeHemoparasitas"
                    value={formData.presencaDeHemoparasitas}
                    error={formSubmited && formData.presencaDeHemoparasitas === ''}
                    label="Quanto presença de Hemoparasitas"
                    onChange={(event) => formChangeHandle('presencaDeHemoparasitas', event.target.value)}
                  >
                    <MenuItem value="0">Microfilária</MenuItem>
                    <MenuItem value="1">Negativo</MenuItem>
                    <MenuItem value="2">Não pesquisados</MenuItem>
                    <MenuItem value="3">Trypanosoma sp.</MenuItem>
                    <MenuItem value="4">Trypanosoma sp..+ Microfilária</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="formButtons">
                <Button
                  size="large"
                  variant="contained"
                  onClick={formSubmitHandle}>
                  OBTER CLASSIFICAÇÃO
                </Button>
                <Button
                  size="large"
                  variant="text">
                  CANCELAR
                </Button>
              </div>

              <br /><br /><br />
              <h4>Resultado:</h4>

              <Plot
                data={[
                  {
                    name: '0',
                    type: 'bar',
                    x: [0.26992828],
                    y: [' '],
                    orientation: 'h',
                    marker: {
                      color: '#1674b9',
                      width: 1
                    }
                  },
                  {
                    name: '1',
                    type: 'bar',
                    x: [0.7300717],
                    y: [' '],
                    orientation: 'h',
                    marker: {
                      color: '#f9b233',
                      width: 1
                    }
                  },
                ]}
                config={{
                  responsive: true
                }}
                useResizeHandler={true}
                layout={{ 
                  title: 'Probabilidade de tratamento 11',  
                  barmode: 'stack',
                  extra: {
                    autosize: true,
                  }
                }}
                style={{
                  width: '100%', 
                  height: '300px'
                }}
              />
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Classificacao;