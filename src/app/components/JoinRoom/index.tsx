/**
 *
 * JoinRoom
 *
 */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '../Button';
import Icon from '../Icon';
import { useLobbySlice } from 'app/pages/Lobby/slice';
import {
  selectUsername,
  selectUserAvatar,
  selectGroupCode,
} from 'app/pages/Lobby/slice/selectors';
import { SocketContext } from 'app/socketContext';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { variants } from 'styles/variants';
import { media } from 'styles/media';
import { SubText } from '../styled/Headers';
import getApiPath from 'helpers/getApiPath';
import axios from 'axios';

interface Props {
  room?: string;
}

export const JoinRoom = (props: Props) => {
  const [roomError, setRoomError] = useState('');

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();
  const socket = React.useContext(SocketContext);

  const name = useSelector(selectUsername);
  const avatar = useSelector(selectUserAvatar);
  const roomCode = useSelector(selectGroupCode);

  const { actions: lobbyActions } = useLobbySlice();

  const joinRoom = e => {
    e.preventDefault();

    socket.open();
    socket.emit('joinRoom', { name, avatar, roomName: roomCode }, res => {
      if (res.statusCode === 400) {
        const translatedError = t(`error.${res.message}`);
        setRoomError(translatedError);
      } else {
        setRoomError('');
      }
    });
  };

  useEffect(() => {
    async function validateRoom() {
      try {
        await axios.post(getApiPath() + '/api/validateRoom', {
          room: props.room,
        });
      } catch (err) {
        console.log(err);
        dispatch(lobbyActions.setGroupCode(''));
        history.push(`/`);
      }
    }
    if (props.room) {
      dispatch(lobbyActions.setGroupCode(props.room));
      validateRoom();
    }
  }, [dispatch, history, lobbyActions, props.room]);

  useEffect(() => {
    socket.on('joinRoom', room => {
      console.log('socket received users in room', room.users);
      dispatch(lobbyActions.setUsersInRoom(room.users));
      dispatch(lobbyActions.setJoinedGroup(true));

      history.push(`/room/${room.name}`);
    });
    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [dispatch, history, lobbyActions, socket]);

  const handleInputChange = e => {
    dispatch(lobbyActions.setGroupCode(e.target.value));
  };

  return (
    <Wrapper
      variants={variants.slideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* if user wants to join via link, only show the join button */}
      {props.room ? (
        <PrimaryButton
          variants={variants.buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
          className="shadow icon-right"
          onClick={joinRoom}
        >
          {t('join.join')}
          <Icon name="arrow-right" height="24" width="24" fill="#ffffff" />
        </PrimaryButton>
      ) : (
        <>
          <InfoText>{t('home.roomCodeLabel')}</InfoText>
          <FormWrapper onSubmit={joinRoom}>
            <FlexColWrapper>
              <RoomCodeInput
                onChange={handleInputChange}
                maxLength={4}
                type="text"
                placeholder="----"
                className={roomError ? 'has-error' : ''}
              />
              {roomError && <InputError>{roomError}</InputError>}
            </FlexColWrapper>
            <PrimaryButton
              variants={variants.buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="pressed"
              className="shadow icon-right"
            >
              {t('home.joinroom')}
              <Icon name="arrow-right" height="24" width="24" fill="#ffffff" />
            </PrimaryButton>
          </FormWrapper>
        </>
      )}
    </Wrapper>
  );
};

const FlexColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const InfoText = styled(SubText)`
  color: ${props => props.theme.mainContrastText};
`;

const Wrapper = styled(motion.div)`
  width: 100%;

  margin: 0;

  padding: 0;
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
`;

const InputError = styled(motion.small)`
  margin: 0;

  font-size: 14px;
  font-family: 'Basier';
  font-weight: normal;
  text-align: left;

  color: ${props => props.theme.error};
`;

const FormWrapper = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;

  ${media.small`
    grid-template-columns: 140px auto;
  `}
  width: 100%;
`;

const RoomCodeInput = styled.input`
  width: 100%;
  padding: 16px 24px;

  border: 2px solid transparent;
  border-radius: 16px;
  background-color: ${props => props.theme.container};
  color: ${props => props.theme.containerContrast};
  letter-spacing: 10px;
  text-align: center;
  text-transform: uppercase;

  font-family: 'Basier', sans-serif;
  font-size: 18px;
  font-weight: 600;

  transition: 0.25s ease-out;
  transition-property: border-color color;

  &:focus,
  &:hover {
    outline: none;
    border-color: ${props => props.theme.primary};
  }

  &::placeholder {
    color: ${props => props.theme.grey};
  }

  &.has-error {
    border-color: ${props => props.theme.error};
  }
`;
