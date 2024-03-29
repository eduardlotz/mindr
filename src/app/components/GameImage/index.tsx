/**
 *
 * GameImage
 *
 */
import React from 'react';
import { useTheme } from 'styled-components/macro';
import Icon from '../Icon';

interface Props {
  name: string;
  size: string;
  color?: string;
  opacity?: string;
}

export function GameImage(props: Props) {
  const theme = useTheme();
  return (
    <Icon
      name={props.name}
      height={props.size}
      width={props.size}
      fill={props.color ? props.color : theme.containerContrast}
      style={{ zIndex: 10 }}
    />
  );
}
