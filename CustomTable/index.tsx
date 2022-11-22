import { IconButton, InputAdornment } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { MdkTableColumns, MdkTableRequest, MdkTableRequestFilter } from '@mdk-front/core/MdkTable';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { MdkTableResponseCostumizada as MdkTableResponseCustomizada } from '../../../models/dtos/response/MdkTableResponseCostumizada';
import { enqueueMultipleErrorSnackbars } from '../../../utils/functions';
import { ModalLoadingSpinner } from '../ModalLoadingSpinner/ModalLoadingSpinner';
import * as S from './styles';

interface TableCustomizadaProps<T> {
  colunas: MdkTableColumns[];
  orderBy?: string;
  filtros?: MdkTableRequestFilter[];
  exbirPesquisa?: boolean;
  abilitarAnimacao?: boolean;
  obterDados: (query: MdkTableRequest) => Promise<MdkTableResponseCustomizada<T> | undefined>;
  lidarClickLinha: (dadosLinha: T) => void;
}

export function CustomTable<T>({
  orderBy = '',
  filtros = [],
  colunas,
  exbirPesquisa = false,
  abilitarAnimacao = true,
  obterDados,
  lidarClickLinha: lidarClickLinhaProps,
}: TableCustomizadaProps<T>) {
  const { enqueueSnackbar } = useSnackbar();

  const [carregando, setCarregando] = useState<boolean>(true);
  const [dados, setDados] = useState<MdkTableResponseCustomizada<T>>();
  const [pagina, setPagina] = useState<number>(0);
  const [termo, setTermo] = useState<string>('');

  const dadosVazio = !carregando && !dados?.data.length;

  const definirTermo = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const termo = event.target.value;
    setTermo(termo);
  };

  const lidaEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const enterPressionado = event.key === 'Enter';
    if (enterPressionado) {
      solicitarDados();
    }
  };

  const paginaIniciandoDoUm = pagina + 1;
  const totalPaginas = dados?.totalPages ?? 0;

  function proximaPagina() {
    const permitirSubirPagina = pagina < totalPaginas - 1;
    const novaPagina = permitirSubirPagina ? pagina + 1 : pagina;

    if (permitirSubirPagina) {
      setPagina(novaPagina);
      solicitarDados(novaPagina);
    }
  }

  function voltarPagina() {
    const permitirDescerPagina = pagina > 0;
    const novaPagina = permitirDescerPagina ? pagina - 1 : pagina;

    if (permitirDescerPagina) {
      setPagina(novaPagina);
      solicitarDados(novaPagina);
    }
  }

  function criarQuery(pagina: number, termoPesquisa: string): MdkTableRequest {
    return {
      page: pagina,
      pageSize: 10,
      search: termoPesquisa,
      orderDirection: 'asc',
      filters: filtros,
      orderBy,
      addFilter: () => {},
    };
  }

  async function solicitarDados(paginaQuery: number = pagina, termoQuery: string = termo) {
    try {
      const query = criarQuery(paginaQuery, termoQuery);
      setCarregando(true);
      const dados = await obterDados(query);
      setDados(dados);
      setCarregando(false);
    } catch (erro) {
      enqueueMultipleErrorSnackbars(enqueueSnackbar, 'error', erro);
    }
  }

  useEffect(() => {
    solicitarDados();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ModalLoadingSpinner aberto={carregando} />
      {exbirPesquisa && (
        <S.ContainerFiltros>
          <S.InputPesquisa
            value={termo}
            onChange={definirTermo}
            onKeyPress={lidaEnter}
            startAdornment={
              <InputAdornment position="start">
                <S.Lupa />
              </InputAdornment>
            }
          />
        </S.ContainerFiltros>
      )}
      <S.ContainerTabela>
        <S.TableCustomizada>
          <thead>
            <tr>
              {dadosVazio ? (
                <S.TextoVazio>Nada para exibir</S.TextoVazio>
              ) : (
                colunas.map(({ title, type }, index) => {
                  const alinharEsquerda = type === 'string';
                  return (
                    <S.THCustomizado key={index} $alinharEsquerda={alinharEsquerda}>
                      {title}
                    </S.THCustomizado>
                  );
                })
              )}
            </tr>
          </thead>
          <tbody>
            {dados &&
              dados.data.map((dado, indexTr) => {
                const lidarClickLinha = () => lidarClickLinhaProps && lidarClickLinhaProps(dado);

                return (
                  <S.TRCustomizado key={indexTr} $abilitarAnimacao={abilitarAnimacao} onClick={lidarClickLinha}>
                    {colunas.map((colunas, index) => {
                      const { type, render, field } = colunas;
                      const informacaoRenderizada = !!render ? render(dado, 'row') : dado[field as keyof object];
                      const identificador = indexTr.toString() + index;
                      const alinharEsquerda = type === 'string';

                      return (
                        <S.TDCustomizado $alinharEsquerda={alinharEsquerda} key={identificador}>
                          {informacaoRenderizada}
                        </S.TDCustomizado>
                      );
                    })}
                  </S.TRCustomizado>
                );
              })}
          </tbody>
        </S.TableCustomizada>
        <S.ContainerPaginas>
          {paginaIniciandoDoUm} de {totalPaginas}
          <IconButton onClick={voltarPagina}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={proximaPagina}>
            <ChevronRight />
          </IconButton>
        </S.ContainerPaginas>
      </S.ContainerTabela>
    </>
  );
}
