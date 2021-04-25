/**
 *
 * HelpLink
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

interface Props {}

export function HelpLink(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <Link to="/help" style={{ display: 'flex', alignItems: 'center' }}>
      <Text>
        Help
        <Icon style={{ marginLeft: '4px' }} name="circle-help" width="22" />
      </Text>
    </Link>
  );
}

const Text = styled.span`
  font-family: 'Basier';
  font-weight: bold;
  font-size: 16px;
  color: ${props => props.theme.mainSubtleText};
  transition: color 0.25s ease-out;

  &:hover {
    color: ${props => props.theme.mainContrastText};
  }
`;
