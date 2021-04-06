/**
 *
 * JoinGroup
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '../Button';
import Icon from '../Icon';
import { colors } from 'styles/colors';
import { Link } from 'react-router-dom';
import { useLobbySlice } from 'app/pages/Lobby/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroupCode } from 'app/pages/Lobby/slice/selectors';

interface Props {}

export function JoinGroup(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { actions: lobbyActions } = useLobbySlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const groupCode = useSelector(selectGroupCode);

  const setGroupCode = evt => {
    dispatch(lobbyActions.setGroupCode(evt.target.value));
  };

  return (
    <Form>
      <GroupCode
        placeholder="1234"
        maxLength={4}
        value={groupCode}
        onChange={setGroupCode}
        required
      />
      <FullWidthLink to="/lobby">
        <PrimaryButton type="submit" className="icon-right">
          {t('home.joingroup')}
          <Icon
            name="circle-arrow-right"
            fill={colors.basic.white}
            height="24"
            width="24"
            style={{ marginLeft: '16px' }}
          />
        </PrimaryButton>
      </FullWidthLink>
    </Form>
  );
}

const FullWidthLink = styled(Link)`
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
`;

const GroupCode = styled.input`
  padding: 16px;

  width: 86px;
  height: 58px;
  left: 996px;
  top: 270px;

  margin-right: 16px;

  background: transparent;
  border: 2px solid ${colors.basic.lightgrey};
  border-radius: 16px;
  color: ${colors.basic.almostblack};

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.4px;

  transition: border-color 0.25s ease-out;

  &:focus,
  &:hover {
    outline: none;
    border-color: ${colors.input.borderFocus};
  }

  &::placeholder {
    color: #b6b6b6;
  }
`;