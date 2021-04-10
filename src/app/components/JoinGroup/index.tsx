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
import { useHistory } from 'react-router-dom';
// import socket from '../../socketConnection';
import { useLobbySlice } from 'app/pages/Lobby/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectGroupCode,
  selectUsername,
  selectUserAvatar,
} from 'app/pages/Lobby/slice/selectors';
import io from 'socket.io-client';
import { media } from 'styles/media';

const ENDPOINT = 'http://localhost:5000';

const socket = io(ENDPOINT);

interface Props {}

export function JoinGroup(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { actions: lobbyActions } = useLobbySlice();

  const history = useHistory();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const room = useSelector(selectGroupCode);
  const username = useSelector(selectUsername);
  const selectedAvatar = useSelector(selectUserAvatar);

  const setGroupCode = evt => {
    dispatch(lobbyActions.setGroupCode(evt.target.value));
  };

  const onSubmitJoinGroup = evt => {
    evt.preventDefault();

    socket.emit('join', { username, room, selectedAvatar }, (error: any) => {
      if (error) {
        console.error(error);
      } else {
        history.push(`/lobby`);
      }
    });
  };

  return (
    <Form onSubmit={onSubmitJoinGroup}>
      <GroupCode
        placeholder="1234"
        maxLength={4}
        value={room}
        onChange={setGroupCode}
        required
      />
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
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.medium`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `}
`;

const GroupCode = styled.input`
  padding: 16px;
  width: 172px;
  height: 72px;

  margin: 0 0 16px 0;

  ${media.medium`
    margin: 0 16px 0 0;
    height: 58px;
    font-size: 20px;
    line-height: 26px;
  `}

  background: transparent;
  border: 2px solid ${colors.basic.lightgrey};
  border-radius: 16px;
  color: ${colors.basic.almostblack};

  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 32.57px;
  text-align: center;
  letter-spacing: 10px;

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
