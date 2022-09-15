import { useCallback, useMemo, useState } from 'react';
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
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from '@mui/material';

import CONFIG from '../../core/config';

import Layout from '../../components/Layout';
import './styles.css';


interface IFormData {
  step1: {
    idade?: string;
    idadeTipo?: string;
    sexo: string;
    cor: string;
    escolaridade: string;
    ocupacaoProfissional: string;
    gestante: string;
  },
  step2: {
    sintomas: string;
    tratamentoVivax: string;
    tratamentoFalciparum: string;
  },
  step3: {
    tipoLamina: string;
    tipoExameRealizado: string;
    resultadoExame: string;
    quantidadeDeCruzesNoExame: string;
    presencaDeHemoparasitas: string;
  }
}

interface IApiResponse {
  0: string,
  1: string,
  img: string
}


function Classificacao() {
  const initialFormData = useMemo(() => ({
    step1: {
      idade: '',
      idadeTipo: 'anos',
      sexo: '',
      cor: '',
      escolaridade: '',
      ocupacaoProfissional: '',
      gestante: '',
    },
    step2: {
      sintomas: '',
      tratamentoVivax: '',
      tratamentoFalciparum: '',
    },
    step3: {
      tipoLamina: '',
      tipoExameRealizado: '',
      resultadoExame: '',
      quantidadeDeCruzesNoExame: '',
      presencaDeHemoparasitas: '',
    }
  }), []);
  
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formSubmited, setFormSubmited] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<IApiResponse>();


  const idadeTipoClickHandle = useCallback(() => {
    setFormData({
      ...formData,
      step1: {
        ...formData.step1,
        idadeTipo: formData.step1.idadeTipo === 'anos' ? 'meses' : 'anos',
      },
    });
  }, [formData]);


  const formIsValid = useCallback((step: 'step1' | 'step2' | 'step3'): Boolean => {
    let valid = true;

    for (const [key, value] of Object.entries(formData[step])) {
      console.log('formIsValid', key, value);
      
      if (value === '')
        valid = false;
    }

    return valid;
  }, [formData]);


  const formResetHandle = useCallback(() => {
    setFormSubmited(false);
    setFormData(initialFormData);
  }, [initialFormData]);


  const nextHandle = useCallback((step: 'step1' | 'step2' | 'step3') => {
    setFormSubmited(true);

    if (formIsValid(step)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setFormSubmited(false);
    }
  }, [formIsValid, setActiveStep, setFormSubmited]);


  const backHandle = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, [setActiveStep]);


  const resetHandle = useCallback(() => {
    setActiveStep(0);
    formResetHandle();
  }, [setActiveStep]);


  const formSubmitHandle = useCallback(() => {
    setFormSubmited(true);
    setLoading(true);

    // Request body
    if (formIsValid('step1') && formIsValid('step2') && formIsValid('step3')) {
      var bodyFormData = new FormData();
      bodyFormData.append('id_pacie', String(formData.step1.idade));
      bodyFormData.append('id_dimea', String(formData.step1.idade === 'anos' ? 0 : 1));
      bodyFormData.append('sexo', String(formData.step1.sexo));
      bodyFormData.append('raca', String(formData.step1.cor));
      bodyFormData.append('niv_esco', String(formData.step1.escolaridade));
      bodyFormData.append('cod_ocup', String(formData.step1.ocupacaoProfissional));
      bodyFormData.append('gestante', String(formData.step1.gestante));
      bodyFormData.append('sintomas', String(formData.step2.sintomas));
      bodyFormData.append('vivax', String(formData.step2.tratamentoVivax));
      bodyFormData.append('falciparum', String(formData.step2.tratamentoFalciparum));
      bodyFormData.append('tipo_lam', String(formData.step3.tipoLamina));
      bodyFormData.append('exame', String(formData.step3.tipoExameRealizado));
      bodyFormData.append('res_exam', String(formData.step3.resultadoExame));
      bodyFormData.append('qtd_cruz', String(formData.step3.quantidadeDeCruzesNoExame));
      bodyFormData.append('hemoparasi', String(formData.step3.presencaDeHemoparasitas));
      console.log(bodyFormData);
      

      // Goto result step
      nextHandle('step3');

      // Submit form
      axios.post(
        CONFIG.API_CLASSIFIER,
        bodyFormData,
        { headers: { ...CONFIG.headers }}
      )
      .then(function (response) {
        console.log(response);
        setApiResponse(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
    }
    
  }, [formData, formIsValid, formResetHandle, nextHandle, setLoading, setApiResponse]);


  const ResultProgress = useMemo(() => (
    <div className="loading"><CircularProgress /></div>
  ), []);
    

  const ResultSuccess = useMemo(() => {
    if (apiResponse !== undefined) {
      return (
        <>
          <Plot
            data={[
              {
                name: '0',
                type: 'bar',
                x: [apiResponse[0]],
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
                x: [apiResponse[1]],
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
          <br /><br />
          <div className="formButtons center">
            <Button
              size="large"
              variant="contained"
              onClick={resetHandle}>
              NOVA SIMULAÇÃO
            </Button>
            <Button
              size="large"
              variant="text"
              onClick={() => setActiveStep(0)}>
              VOLTAR
            </Button>
          </div>
        </>
      );
    }
  }, [apiResponse, resetHandle]);


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


              <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                  <StepLabel className="stepLabel"><h4>Informações Sociodemográficas</h4></StepLabel>
                  <StepContent>
                    <form className="formElements">
                      <FormControl fullWidth>
                        <InputLabel htmlFor="input-idade">Idade</InputLabel>
                        <OutlinedInput
                          id="input-idade"
                          type="number"
                          autoComplete="off"
                          value={formData.step1.idade}
                          error={formSubmited && formData.step1.idade === ''}
                          label="Idade"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step1: {
                                ...formData.step1,
                                idade: event.target.value
                              }
                            });
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <Button onClick={idadeTipoClickHandle}>
                                {formData.step1.idadeTipo}
                              </Button>
                            </InputAdornment>
                          }
                        />
                      </FormControl>

                      <FormControl fullWidth>
                        <InputLabel id="input-sexo">Sexo</InputLabel>
                        <Select
                          labelId="input-sexo"
                          value={formData.step1.sexo}
                          error={formSubmited && formData.step1.sexo === ''}
                          label="Sexo"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step1: {
                                ...formData.step1,
                                sexo: event.target.value
                              }
                            });
                          }}
                        >
                          <MenuItem value="0">Masculino</MenuItem>
                          <MenuItem value="1">Feminino</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl fullWidth>
                        <InputLabel id="input-cor">Raça/Cor</InputLabel>
                        <Select
                          labelId="input-cor"
                          value={formData.step1.cor}
                          error={formSubmited && formData.step1.cor === ''}
                          label="Raça/Cor"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step1: {
                                ...formData.step1,
                                cor: event.target.value
                              }
                            });
                          }}
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
                          value={formData.step1.escolaridade}
                          error={formSubmited && formData.step1.escolaridade === ''}
                          label="Escolaridade"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step1: {
                                ...formData.step1,
                                escolaridade: event.target.value
                              }
                            });
                          }}
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
                          value={formData.step1.ocupacaoProfissional}
                          error={formSubmited && formData.step1.ocupacaoProfissional === ''}
                          label="Tipo de ocupação profissional"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step1: {
                                ...formData.step1,
                                ocupacaoProfissional: event.target.value
                              }
                            });
                          }}
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
                          value={formData.step1.gestante}
                          error={formSubmited && formData.step1.gestante === ''}
                          label="Está gestante"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step1: {
                                ...formData.step1,
                                gestante: event.target.value
                              }
                            });
                          }}
                        >
                          <MenuItem value="0">1º Trimestre</MenuItem>
                          <MenuItem value="1">2º Trimestre</MenuItem>
                          <MenuItem value="2">3º Trimestre</MenuItem>
                          <MenuItem value="3">Idade gestacional ignorada</MenuItem>
                          <MenuItem value="4">Não</MenuItem>
                          <MenuItem value="5">Não se aplica</MenuItem>
                        </Select>
                      </FormControl>
                    </form>

                    <div className="formButtons">
                      <Button
                        size="large"
                        variant="contained"
                        onClick={() => nextHandle('step1')}>
                        AVANÇAR
                      </Button>
                    </div>
                  </StepContent>
                </Step>

                <Step>
                  <StepLabel className="stepLabel"><h4>Informações Epdemiológicas</h4></StepLabel>
                  <StepContent>
                    <form className="formElements">
                      <FormControl fullWidth>
                        <InputLabel id="input-sintomas">Paciente com ou sem sintomas?</InputLabel>
                        <Select
                          labelId="input-sintomas"
                          value={formData.step2.sintomas}
                          error={formSubmited && formData.step2.sintomas === ''}
                          label="Paciente com ou sem sintomas"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step2: {
                                ...formData.step2,
                                sintomas: event.target.value
                              }
                            });
                          }}
                        >
                          <MenuItem value="0">Com</MenuItem>
                          <MenuItem value="1">Sem</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl fullWidth>
                        <InputLabel id="input-tratamentoVivax">Realizou tratamento para vivax?</InputLabel>
                        <Select
                          labelId="input-tratamentoVivax"
                          value={formData.step2.tratamentoVivax}
                          error={formSubmited && formData.step2.tratamentoVivax === ''}
                          label="Realizou tratamento para vivax"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step2: {
                                ...formData.step2,
                                tratamentoVivax: event.target.value
                              }
                            });
                          }}
                        >
                          <MenuItem value="0">Não tratado p/ vivax &lt; 60 dias</MenuItem>
                          <MenuItem value="1">Tratado p/ vivax &lt; 60 dias</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl fullWidth>
                        <InputLabel id="input-tratamentoFalciparum">Realizou tratamento para falciparum?</InputLabel>
                        <Select
                          labelId="input-tratamentoFalciparum"
                          value={formData.step2.tratamentoFalciparum}
                          error={formSubmited && formData.step2.tratamentoFalciparum === ''}
                          label="Realizou tratamento para falciparum"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step2: {
                                ...formData.step2,
                                tratamentoFalciparum: event.target.value
                              }
                            });
                          }}
                        >
                          <MenuItem value="0">Não tratado p/ falciparum &lt; 40 dias</MenuItem>
                          <MenuItem value="1">Tratado p/ falciparum &lt; 40 dias</MenuItem>
                        </Select>
                      </FormControl>
                    </form>

                    <div className="formButtons">
                      <Button
                        size="large"
                        variant="contained"
                        onClick={() => nextHandle('step2')}>
                        AVANÇAR
                      </Button>
                      <Button
                        size="large"
                        variant="text"
                        onClick={backHandle}>
                        VOLTAR
                      </Button>
                    </div>
                  </StepContent>
                </Step>

                <Step>
                  <StepLabel className="stepLabel"><h4>Informações do Exame</h4></StepLabel>
                  <StepContent>
                    <form className="formElements">
                      <FormControl fullWidth>
                        <InputLabel id="input-tipoLamina">Tipo de lâmina</InputLabel>
                        <Select
                          labelId="input-tipoLamina"
                          value={formData.step3.tipoLamina}
                          error={formSubmited && formData.step3.tipoLamina === ''}
                          label="Tipo de lâmina"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step3: {
                                ...formData.step3,
                                tipoLamina: event.target.value
                              }
                            });
                          }}
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
                          value={formData.step3.tipoExameRealizado}
                          error={formSubmited && formData.step3.tipoExameRealizado === ''}
                          label="Tipo do exame realizado"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step3: {
                                ...formData.step3,
                                tipoExameRealizado: event.target.value
                              }
                            });
                          }}
                        >
                          <MenuItem value="0">Gota espessa</MenuItem>
                          <MenuItem value="1">Teste rápido</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl fullWidth>
                        <InputLabel id="input-resultadoExame">Resultado do exame</InputLabel>
                        <Select
                          labelId="input-resultadoExame"
                          value={formData.step3.resultadoExame}
                          error={formSubmited && formData.step3.resultadoExame === ''}
                          label="Resultado do exame"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step3: {
                                ...formData.step3,
                                resultadoExame: event.target.value
                              }
                            });
                          }}
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
                          value={formData.step3.quantidadeDeCruzesNoExame}
                          error={formSubmited && formData.step3.quantidadeDeCruzesNoExame === ''}
                          label="Quantidade de cruzes no exame"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step3: {
                                ...formData.step3,
                                quantidadeDeCruzesNoExame: event.target.value
                              }
                            });
                          }}
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
                          value={formData.step3.presencaDeHemoparasitas}
                          error={formSubmited && formData.step3.presencaDeHemoparasitas === ''}
                          label="Quanto presença de Hemoparasitas"
                          onChange={(event) => {
                            setFormData({ 
                              ...formData,
                              step3: {
                                ...formData.step3,
                                presencaDeHemoparasitas: event.target.value
                              }
                            });
                          }}
                        >
                          <MenuItem value="0">Microfilária</MenuItem>
                          <MenuItem value="1">Negativo</MenuItem>
                          <MenuItem value="2">Não pesquisados</MenuItem>
                          <MenuItem value="3">Trypanosoma sp.</MenuItem>
                          <MenuItem value="4">Trypanosoma sp..+ Microfilária</MenuItem>
                        </Select>
                      </FormControl>
                    </form>

                    <div className="formButtons">
                      <Button
                        size="large"
                        variant="contained"
                        onClick={formSubmitHandle}>
                        CONCLUIR
                      </Button>
                      <Button
                        size="large"
                        variant="text"
                        onClick={backHandle}>
                        VOLTAR
                      </Button>
                      <Button
                        size="large"
                        variant="text"
                        onClick={resetHandle}>
                        LIMPAR
                      </Button>
                    </div>
                  </StepContent>
                </Step>

                <Step>
                  <StepLabel className="stepLabel"><h4>Resultado</h4></StepLabel>
                  <StepContent>
                    {
                      loading
                        ? ResultProgress
                        : ResultSuccess
                    }
                  </StepContent>
                </Step>
              </Stepper>

          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Classificacao;