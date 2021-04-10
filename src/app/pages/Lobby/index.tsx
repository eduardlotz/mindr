/**
 *
 * Lobby
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { GameImage } from 'app/components/GameImage';
import { H2, H5 } from 'app/components/styled/Headers';
import { AnimatePresence, motion } from 'framer-motion';
import io from 'socket.io-client';
import { colors } from 'styles/colors';
import { variants } from 'styles/variants';
import Icon from 'app/components/Icon';
import { PrimaryFloatingButton } from 'app/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameModes } from '../Homepage/slice/selectors';
import { useEffect } from 'react';
import { useLobbySlice } from './slice';
import {
  selectGroupCode,
  selectIsStandardMode,
  selectUserAvatar,
  selectUsername,
  selectUsersInRoom,
} from './slice/selectors';

const ENDPOINT = 'http://localhost:5000';

interface Props {}

export function Lobby(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const gameModes = useSelector(selectGameModes);
  const isStandardMode = useSelector(selectIsStandardMode);

  const room = useSelector(selectGroupCode);
  const username = useSelector(selectUsername);
  const selectedAvatar = useSelector(selectUserAvatar);
  const usersInRoom = useSelector(selectUsersInRoom);

  const { actions: lobbyActions } = useLobbySlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.emit('join', { username, room, selectedAvatar }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [room, selectedAvatar, username]);

  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.on('roomData', ({ users }) => {
      dispatch(lobbyActions.setUsersInRoom(users));
    });
  }, [dispatch, lobbyActions]);

  useEffect(() => {
    dispatch(lobbyActions.setJoinedGroup(true));
  }, [dispatch, lobbyActions]);

  const setToStandardMode = () => {
    dispatch(lobbyActions.setIsStandardMode(true));
  };

  const setToDrinkingMode = () => {
    dispatch(lobbyActions.setIsStandardMode(false));
  };
  const gameTabVariants = {
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        delay: 0.1 + i * 0.06,
      },
    }),
    hidden: { opacity: 0, scale: 0.9 },
    hover: {
      boxShadow: '0px 14px 26px rgba(0, 0, 0, 0.07)',
      borderColor: colors.basic.white,
    },
  };

  const floatingBtnVariants = {
    hidden: {
      y: 80,
      opacity: 0.5,
      transition: {
        type: 'spring',
        damping: 4,
        mass: 0.3,
        stiffness: 60,
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 4,
        mass: 0.3,
        stiffness: 60,
        delay: 0.2,
      },
    },
    exit: {
      y: 80,
      opacity: 0.5,
      transition: {
        type: 'spring',
        damping: 4,
        mass: 0.3,
        stiffness: 60,
      },
    },
  };

  return (
    <>
      <ContentBlock
        variants={variants.slideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <H2>{t('lobby.pickgames')}</H2>
        <GameModesContainer>
          {gameModes.map((mode, i) => {
            return (
              <AnimatePresence key={`gamemode_${i}`}>
                <GameModeTab
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={gameTabVariants}
                  whileHover="hover"
                >
                  <GameImage size="92px" name={mode.imageClass} />
                  <H5>{t(`gamemode.${mode.title}`)}</H5>
                </GameModeTab>
              </AnimatePresence>
            );
          })}
        </GameModesContainer>
      </ContentBlock>
      <ContentBlock
        variants={variants.slideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <H2>{t('lobby.pickmode')}</H2>
        <ModeSwitcher>
          <ModeTab
            onClick={setToStandardMode}
            className={isStandardMode ? 'is-active' : ''}
          >
            {t('lobby.standardmode')}
          </ModeTab>
          <ModeTab
            onClick={setToDrinkingMode}
            className={!isStandardMode ? 'is-active' : ''}
          >
            {t('lobby.drinkingmode')}
          </ModeTab>
          <ModeTabActiveIndicator
            variants={variants.modeTab}
            initial="standard"
            animate={isStandardMode ? 'standard' : 'drinking'}
          />
        </ModeSwitcher>
      </ContentBlock>
      <ContentBlock>
        {usersInRoom.map(user => {
          return (
            <FlexRowDiv
              variants={variants.slideUp}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <UserAvatar src={user.avatar} />
              <Username>{user.name}</Username>
            </FlexRowDiv>
          );
        })}
      </ContentBlock>
      <PrimaryFloatingButton
        variants={floatingBtnVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {t('lobby.letsgo')}
        <Icon
          name="circle-arrow-right"
          fill="white"
          height="24"
          width="24"
          style={{ marginLeft: '16px' }}
        />
      </PrimaryFloatingButton>
    </>
  );
}

const ModeTabActiveIndicator = styled(motion.span)`
  position: absolute;
  z-index: 1;
  height: 75%;
  width: 50%;

  border-radius: 16px;
  background-color: ${colors.tab.bgColor};
`;

const ModeSwitcher = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;

  width: 100%;
  height: 90px;

  background: #ffffff;
  border: 2px solid #f4f5f7;
  box-sizing: border-box;
  border-radius: 18px;

  margin: 0 0 16px 0;
`;

const ModeTab = styled(motion.button)`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Basier';
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;

  height: 100%;
  width: 100%;

  color: #111111;
  background: none;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: color 0.24s ease-in-out;

  &.is-active {
    color: ${colors.tab.textColor};
  }

  &:focus {
    outline: none;
  }
`;

const GameModeTab = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 32px;
  height: auto;

  background: #ffffff;
  border: 2px solid #f4f5f7;
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.25s ease-out;
`;

const ContentBlock = styled(motion.div)`
  width: 100%;
`;

const GameModesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  margin: 16px 0 40px 0;
  background-color: ${colors.basic.white};
`;

const UserAvatar = styled.img`
  position: relative;

  width: 48px;
  height: 48px;

  margin-right: 8px;

  border-radius: 50%;
  object-fit: contain;
  background-size: 100% 100%;
`;

const Username = styled.span`
  font-family: 'Basier';
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;

  color: ${colors.basic.black};
`;

const FlexRowDiv = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
