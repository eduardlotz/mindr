/**
 *
 * CreateNewRoom
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { PrimaryButton } from 'app/components/Button';

import getApiPath from 'helpers/getApiPath';
import { useLobbySlice } from 'app/pages/Lobby/slice';
import { useDispatch, useSelector } from 'react-redux';
import { variants } from 'styles/variants';
import { motion } from 'framer-motion';
import {
  selectUsername,
  selectUserAvatar,
} from 'app/pages/Lobby/slice/selectors';

export const CreateNewRoom = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const name = useSelector(selectUsername);
  const avatar = useSelector(selectUserAvatar);

  const { actions: lobbyActions } = useLobbySlice();

  const handleBtnClick = () => {
    createUser();
    createRoom();
  };

  const createUser = async () => {
    try {
      await axios.post(getApiPath() + '/api/user', { name, avatar });
    } catch (err) {
      console.log(err);
    }
  };

  const createRoom = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(getApiPath() + '/api/room');
      dispatch(lobbyActions.setGroupCode(data));
      dispatch(lobbyActions.setIsCreator(true));
      dispatch(lobbyActions.setJoinedGroup(true));

      // history.push(`/room/${data}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper
      variants={variants.slideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <InfoBox>{t('home.infoText')}</InfoBox>
      <PrimaryButton
        onClick={handleBtnClick}
        variants={variants.buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="pressed"
      >
        {t('home.createroom')}
      </PrimaryButton>
    </Wrapper>
  );
};

const InfoBox = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px 16px;
  margin-bottom: 32px;
  width: 100%;

  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.mainSubtleText};
`;

const Wrapper = styled(motion.div)`
  width: 100%;

  margin: 0;
  align-items: flex-start;

  padding: 0;
  display: flex;
  flex-direction: column;

  justify-content: center;
`;
