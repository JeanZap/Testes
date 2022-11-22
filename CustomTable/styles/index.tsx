import { OutlinedInput } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import styled, { css } from 'styled-components';
import { moverDireitaHover } from '../../../../contants/transitions';
import { Metrics } from '../../../../utils/constants';
import { Colors } from '../../colors';

interface TableCustomizadaProps {
  $alinharEsquerda?: boolean;
  $abilitarAnimacao?: boolean;
}

export const ContainerTabela = styled.div`
  background-color: white;
  padding: 0 ${Metrics.standardSpacing}px;
  border-radius: ${Metrics.tinySpacing}px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;

export const TableCustomizada = styled.table`
  border-collapse: collapse;
  margin: 0 16px 0 0;
`;

export const TRCustomizado = styled.tr<TableCustomizadaProps>`
  ${({ $abilitarAnimacao }) => $abilitarAnimacao && moverDireitaHover}

  border-bottom: 1px solid ${Colors.figma.gray8};
  cursor: pointer;
`;

export const THCustomizado = styled.th<TableCustomizadaProps>`
  ${({ $alinharEsquerda = false }) =>
    $alinharEsquerda
      ? css`
          text-align: left;
          width: 100%;
        `
      : css`
          text-align: center;
          padding: 0 8px 0 8px;
        `}
  font-weight: 700;
  font-size: 14px;
  color: ${Colors.figma.gray2};
  height: 55px;
`;

export const TDCustomizado = styled.td<TableCustomizadaProps>`
  ${({ $alinharEsquerda = false }) =>
    $alinharEsquerda
      ? 'text-align: left;'
      : css`
          text-align: center;
          padding: 0 8px 0 8px;
        `}
  font-weight: 400;
  font-size: 14px;
  color: ${Colors.figma.gray2};
  height: 55px;
  white-space: nowrap;
`;

export const ContainerPaginas = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${Colors.figma.gray3};

  display: flex;
  flex-direction: row;
  align-items: center;

  align-self: flex-end;
  justify-self: end;
`;

export const ContainerFiltros = styled.div`
  display: flex;
  flex-direction: row;

  background-color: white;

  padding: ${Metrics.standardSpacing}px ${Metrics.tinySpacing}px;
  margin: ${Metrics.tinySpacing}px 0;
  border-radius: ${Metrics.tinySpacing}px;
`;

export const InputPesquisa = styled(OutlinedInput)`
  margin: 0 ${Metrics.xxsSpacing}px;
  width: 100%;
  & .MuiInputBase-input {
    color: ${Colors.figma.gray2};
    font-size: ${Metrics.standardSpacing}px;
    font-weight: 400;
  }
  &.MuiOutlinedInput-root {
    & fieldset {
      border: 1px solid rgba(0, 0, 0, 0.07);
    }
    &:hover fieldset {
      border-color: ${Colors.secondary};
    }
    &.Mui-focused fieldset {
      border-color: ${Colors.secondary};
    }
  }
`;

export const Lupa = styled(Search)`
  color: ${Colors.secondary};
`;

export const TextoVazio = styled.th`
  margin-top: 16px;
  color: ${Colors.figma.gray4};
  font-weight: 400;
`;
