/**
 *
 * HelpLink
 *
 */
import * as React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

interface Props {}

export function HelpLink(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  return (
    <Link to="/help" style={{ display: 'flex', alignItems: 'center' }}>
      <Text>Help</Text>
      <Icon name="circle-help" width="22" fill={theme.primary} />
    </Link>
  );
}

const Text = styled.span`
  font-family: 'Basier';
  font-weight: bold;
  font-size: 16px;
  color: ${props => props.theme.primary};
  transition: color 0.25s ease-out;
  margin-right: 4px;
`;
