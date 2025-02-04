import * as React from 'react';
import {EmotionCanvasTheme, styled, useTheme} from '@workday/canvas-kit-react/common';
import {borderRadius, colors, space} from '@workday/canvas-kit-react/tokens';
import {BaseButton} from '@workday/canvas-kit-react/button';

import {PaginationModel} from './types';

const StyledPageButton = styled(BaseButton)<{toggled?: boolean}>(
  {
    minWidth: space.l,
    width: space.l,
    borderRadius: borderRadius.circle,
    height: space.l,
  },
  ({toggled}) => {
    return {
      fontWeight: toggled ? 700 : 'normal',
    };
  }
);

const getPaginationButtonColors = (toggled: boolean, theme: EmotionCanvasTheme) => {
  const {
    canvas: {
      palette: {primary: themePrimary},
    },
  } = theme;
  return {
    default: {
      background: toggled ? themePrimary.main : 'transparent',
      label: toggled ? colors.frenchVanilla100 : colors.blackPepper400,
    },
    hover: {
      background: toggled ? themePrimary.main : colors.soap300,
      label: toggled ? colors.frenchVanilla100 : colors.blackPepper400,
    },
    active: {
      background: toggled ? themePrimary.main : 'transparent',
      label: toggled ? colors.frenchVanilla100 : colors.blackPepper400,
    },
    focus: {
      background: toggled ? themePrimary.main : 'transparent',
      label: toggled ? colors.frenchVanilla100 : colors.blackPepper400,
    },
    disabled: {
      background: colors.licorice100,
    },
  };
};

export type PageButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  model: PaginationModel;
  pageNumber: number;
};

export const PageButton = ({
  model,
  onClick,
  pageNumber,
  children,
  ...elemProps
}: PageButtonProps) => {
  const isCurrentPage = pageNumber === model.state.currentPage;
  const theme = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick?.(e);
    model.events.goTo(pageNumber);
  };
  console.warn(theme);

  return (
    <StyledPageButton
      aria-current={isCurrentPage ? 'page' : undefined}
      colors={getPaginationButtonColors(isCurrentPage, theme)}
      aria-pressed={undefined}
      onClick={handleClick}
      toggled={isCurrentPage}
      {...elemProps}
    >
      {children || pageNumber}
    </StyledPageButton>
  );
};
