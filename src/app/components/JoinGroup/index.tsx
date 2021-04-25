/**
 *
 * JoinGroup
 *
 */
import * as React from 'react';
import { useContext } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '../Button';
import Icon from '../Icon';
import { colors } from 'styles/colors';
import { useHistory } from 'react-router-dom';
import { useLobbySlice } from 'app/pages/Lobby/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectGroupCode,
  selectUserAvatar,
  selectUsername,
} from 'app/pages/Lobby/slice/selectors';
import { media } from 'styles/media';
import { SocketContext } from 'app/socketContext';
import { useHomepageSlice } from 'app/pages/Homepage/slice';
import { selectRoomError } from 'app/pages/Homepage/slice/selectors';
import { motion } from 'framer-motion';
import { variants } from 'styles/variants';

interface Props {}

export function JoinGroup(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { actions: lobbyActions } = useLobbySlice();
  const { actions: homeActions } = useHomepageSlice();

  const history = useHistory();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  const room = useSelector(selectGroupCode);
  const name = useSelector(selectUsername);
  const avatar = useSelector(selectUserAvatar);
  const roomError = useSelector(selectRoomError);

  //Emits the join event and if successful redirects to lobby
  const handleSubmit = evt => {
    evt.preventDefault();

    socket.emit('join', { name, room, avatar }, errors => {
      if (errors) {
        for (let error of errors) {
          if (error.type === 'username') {
            dispatch(homeActions.setUsernameError(t('error.' + error.message)));
          }
          if (error.type === 'room') {
            dispatch(homeActions.setRoomError(t('error.' + error.message)));
          }
          if (error.type === 'avatar') {
            dispatch(homeActions.setAvatarError(t('error.' + error.message)));
          }
        }
        return;
      }

      dispatch(lobbyActions.setJoinedGroup(true));
      history.push('/lobby');
    });
  };

  const setGroupCode = evt => {
    dispatch(lobbyActions.setGroupCode(evt.target.value));
    dispatch(homeActions.setRoomErrorHidden(true));
  };

  return (
    <FlexColDiv>
      <Form onSubmit={handleSubmit}>
        <GroupCode
          placeholder="1234"
          maxLength={4}
          value={room}
          onChange={setGroupCode}
          className={roomError.isHidden ? '' : 'has-error'}
        />
        <PrimaryButton
          type="submit"
          className="icon-right"
          variants={variants.buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
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
      {!roomError.isHidden && <InputError>{roomError.message}</InputError>}
    </FlexColDiv>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const FlexColDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const InputError = styled(motion.small)`
  margin: 0;

  font-size: 14px;
  font-family: 'Basier';
  font-weight: normal;
  text-align: left;

  color: ${props => props.theme.error};
`;

const GroupCode = styled.input`
  padding: 16px;
  height: 58px;
  width: 130px;
  margin: 0 16px 0 0;

  ${media.medium`
    width: 172px;
  `}

  font-size: 20px;
  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  text-align: center;
  line-height: 26px;

  background: transparent;
  border: 2px solid ${props => props.theme.lightgrey};
  border-radius: 16px;
  color: ${props => props.theme.mainContrastText};

  letter-spacing: 10px;

  transition: border-color 0.25s ease-out;

  &:focus,
  &:hover {
    outline: none;
    border-color: ${props => props.theme.primary};
  }

  &::placeholder {
    color: ${props => props.theme.lightgrey};
  }

  &.has-error {
    border-color: ${props => props.theme.error};
  }
`;
