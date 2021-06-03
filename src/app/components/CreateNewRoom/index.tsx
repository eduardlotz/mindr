/**
 *
 * CreateNewRoom
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from 'app/components/Button';

import { useLobbySlice } from 'app/pages/Lobby/slice';
import { useDispatch, useSelector } from 'react-redux';
import { variants } from 'styles/variants';
import { motion } from 'framer-motion';
import {
  selectUsername,
  selectUserAvatar,
} from 'app/pages/Lobby/slice/selectors';
import Icon from '../Icon';
import { SocketContext } from 'app/socketContext';
import { useHistory } from 'react-router';

export const CreateNewRoom = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();
  const socket = React.useContext(SocketContext);

  const name = useSelector(selectUsername);
  const avatar = useSelector(selectUserAvatar);

  const { actions: lobbyActions } = useLobbySlice();

  const handleBtnClick = () => {
    socket.open();
    socket.emit('createRoom', { name, avatar }, room => {
      console.log('socket received users in room', room.users);
      dispatch(lobbyActions.setUsersInRoom(room.users));
      dispatch(lobbyActions.setIsCreator(true));
      dispatch(lobbyActions.setJoinedGroup(true));
      dispatch(lobbyActions.setGroupCode(room.name));

      history.push(`/room/${room.name}`);
    });
    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  };

  return (
    <Wrapper
      variants={variants.slideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <PrimaryButton
        onClick={handleBtnClick}
        variants={variants.buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="pressed"
        className="shadow icon-right"
      >
        {t('home.createroom')}
        <Icon name="arrow-right" height="24" width="24" fill="#ffffff" />
      </PrimaryButton>
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
