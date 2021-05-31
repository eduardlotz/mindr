/**
 *
 * JoinRoom
 *
 */
import React from 'react';
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

export const JoinRoom = () => {
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
    socket.emit('joinRoom', { name, avatar, roomName: roomCode });

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
  };

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
      <FormWrapper onSubmit={joinRoom}>
        <RoomCodeInput
          onChange={handleInputChange}
          maxLength={4}
          type="text"
          placeholder="----"
        />
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
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  width: 100%;

  margin: 0;

  padding: 0;
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
`;

const FormWrapper = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;

  ${media.small`
    grid-template-columns: 130px auto;
  `}
  width: 100%;
`;

const RoomCodeInput = styled.input`
  min-width: 130px;
  width: 100%;
  padding: 16px 24px;

  border: 2px solid transparent;
  border-radius: 16px;
  background-color: ${props => props.theme.container};
  color: ${props => props.theme.containerContrast};
  letter-spacing: 4px;
  text-align: center;
  text-transform: uppercase;

  font-family: 'Basier', sans-serif;
  font-size: 18px;
  font-weight: 600;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;
