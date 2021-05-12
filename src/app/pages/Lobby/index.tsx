/**
 *
 * Lobby
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { H2 } from 'app/components/styled/Headers';
import { AnimatePresence, motion } from 'framer-motion';
import { variants } from 'styles/variants';
import Icon from 'app/components/Icon';
import { PrimaryFloatingButton } from 'app/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameModes } from '../Homepage/slice/selectors';
import { useLobbySlice } from './slice';
import {
  selectIsStandardMode,
  selectUsersInRoom,
  selectGameLength,
} from './slice/selectors';
import { media } from 'styles/media';
import { GameSelectCard } from 'app/components/GameSelectCard/Loadable';
import { SocketContext } from 'app/socketContext';
import { useEffect } from 'react';
import { useHomepageSlice } from '../Homepage/slice';
import { RoomTopBar } from 'app/components/RoomTopBar/Loadable';
import { useParams } from 'react-router-dom';

export function Lobby() {
  const { t } = useTranslation();

  const gameModes = useSelector(selectGameModes);
  const isStandardMode = useSelector(selectIsStandardMode);
  const gameLength = useSelector(selectGameLength);
  const usersInRoom = useSelector(selectUsersInRoom);

  const { actions: homeActions } = useHomepageSlice();
  const { actions: lobbyActions } = useLobbySlice();

  const socket = React.useContext(SocketContext);

  const { room } = useParams<{ room: string }>();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const setToStandardMode = () => {
    dispatch(lobbyActions.setIsStandardMode(true));
  };

  const setGameLength = (length: string) => {
    dispatch(lobbyActions.setGameLength(length));
  };

  const setToDrinkingMode = () => {
    dispatch(lobbyActions.setIsStandardMode(false));
  };

  const isRoomReady = () => (usersInRoom.length >= 4 ? true : false);

  useEffect(() => {
    socket.open();
    socket.emit('joinRoom', room);
  }, [room, socket]);

  useEffect(() => {
    socket.on('joinRoom', onlineUsers => {
      console.log('socket received users in room', onlineUsers);
      dispatch(lobbyActions.setUsersInRoom(onlineUsers));
    });
    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [dispatch, lobbyActions, room, socket]);

  useEffect(() => {
    socket.on('pick_game', (id: number) => {
      console.log(`socket-- pick game with id: ${id}`);
      dispatch(homeActions.enableGame(id));
    });
  });

  useEffect(() => {
    socket.on('remove_game', (id: number) => {
      dispatch(homeActions.disableGame(id));
    });
  });

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

  const lengthIndicatorAnimation = () => {
    let position: string;

    if (gameLength === 'long') position = 'right';
    else if (gameLength === 'normal') position = 'middle';
    else position = 'left';
    return position as string;
  };

  const handleGameModeClick = (mode, id) => {
    if (mode.isAvailable) {
      if (mode.isActive) {
        socket.emit('remove_game', { id }, errors => {
          if (errors) {
            console.error(errors);
            return;
          }
        });
      } else {
        socket.emit('pick_game', { id }, errors => {
          if (errors) {
            console.error(errors);
            return;
          }
        });
      }
    }
  };

  return (
    <LobbyContainer>
      <RoomTopBar />
      <ContentBlock
        variants={variants.slideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <InlineBlock style={{ margin: 0 }}>
          <InfoLine>{t('room.min-user-info')}</InfoLine>
          <UsersCounter>
            <UsersCount>{usersInRoom.length}</UsersCount>
            <MaxUsersCount>/10</MaxUsersCount>
          </UsersCounter>
        </InlineBlock>
        <UsersList>
          {usersInRoom.map(user => {
            return (
              <AnimatePresence>
                <JoinedUser
                  variants={variants.slideUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <UserAvatar src={user.avatar} />
                  {user.isCreator && (
                    <Icon
                      name="star"
                      height="24"
                      width="24"
                      style={{ marginRight: '8px' }}
                    />
                  )}
                  <Username>{user.name}</Username>
                </JoinedUser>
              </AnimatePresence>
            );
          })}
        </UsersList>
      </ContentBlock>
      <ContentBlock
        variants={variants.slideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <H2>{t('room.pickgames')}</H2>
        <GameModesContainer>
          {gameModes.map((mode, i) => (
            <AnimatePresence>
              <GameSelectCard
                key={`gameselectcard_${i}`}
                mode={mode}
                index={i}
                onClick={() => handleGameModeClick(mode, i)}
              />
            </AnimatePresence>
          ))}
        </GameModesContainer>
      </ContentBlock>
      <ContentBlock
        variants={variants.slideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <H2>{t('room.settings')}</H2>
        <OptionsContainer>
          {/* TODO refactor using layout it by framer  */}
          <ModeSwitcher>
            <ModeTab
              onClick={setToStandardMode}
              className={isStandardMode ? 'is-active' : ''}
            >
              {t('room.standardmode')}
            </ModeTab>
            <ModeTab
              onClick={setToDrinkingMode}
              className={!isStandardMode ? 'is-active' : ''}
            >
              {t('room.drinkingmode')}
            </ModeTab>
            <ModeTabActiveIndicator
              variants={variants.modeTab}
              initial="standard"
              animate={isStandardMode ? 'left' : 'right'}
            />
          </ModeSwitcher>

          <ModeSwitcher>
            <ModeTab
              onClick={() => setGameLength('short')}
              className={gameLength === 'short' ? 'is-active' : ''}
            >
              {t('room.length.short')}
            </ModeTab>
            <ModeTab
              onClick={() => setGameLength('normal')}
              className={gameLength === 'normal' ? 'is-active' : ''}
            >
              {t('room.length.normal')}
            </ModeTab>
            <ModeTab
              onClick={() => setGameLength('long')}
              className={gameLength === 'long' ? 'is-active' : ''}
            >
              {t('room.length.long')}
            </ModeTab>

            <ModeTabActiveIndicator
              variants={variants.modeTab}
              initial="standard"
              animate={lengthIndicatorAnimation()}
              className={'short'}
            />
          </ModeSwitcher>
        </OptionsContainer>
      </ContentBlock>

      <PrimaryFloatingButton
        variants={floatingBtnVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        disabled={!isRoomReady()}
      >
        {t('room.letsgo')}
        <Icon
          name="circle-arrow-right"
          height="24"
          width="24"
          fill="currentColor"
          style={{ marginLeft: '16px' }}
        />
      </PrimaryFloatingButton>
    </LobbyContainer>
  );
}

const LobbyContainer = styled(motion.div)`
  width: 100%;
  padding: 24px 0 80px;
`;

const OptionsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  ${media.medium`
    flex-direction: row;
  `}
`;

const ModeSwitcher = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;

  width: 100%;
  height: 90px;

  background: transparent;
  border: 2px solid ${props => props.theme.lightgrey};
  box-sizing: border-box;
  border-radius: 18px;

  &:first-child {
    margin: 0 0 24px 0;
  }

  ${media.medium`
    &:first-child {
      margin: 0 32px 0 0 ;
    }
  `}
`;

const ModeTab = styled(motion.button)`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  font-family: 'Basier';
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;

  height: 100%;
  width: 100%;

  color: ${props => props.theme.mainContrastText};
  background: none;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: color 0.24s ease-in-out;

  &.is-active {
    color: ${props => props.theme.primaryContrast};
  }

  &:focus {
    outline: none;
  }
`;

const ModeTabActiveIndicator = styled(motion.span)`
  position: absolute;
  z-index: 1;
  height: 75%;
  width: 48%;

  border-radius: 16px;
  background-color: ${props => props.theme.primary};

  &.short {
    width: 32%;
  }
`;

const ContentBlock = styled(motion.div)`
  width: 100%;
  margin-bottom: 40px;
`;

const GameModesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 16px;

  ${media.medium`
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
  `}

  margin: 16px 0 40px 0;
  background-color: transparent;
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
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 23px;
  text-align: left;

  color: ${props => props.theme.mainContrastText};
`;

const InfoLine = styled.p`
  font-family: 'Basier';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 21px;
  text-align: left;
  margin: 0 0 16px 0;

  color: ${props => props.theme.mainSubtleText};
`;

const InlineBlock = styled(motion.div)`
  width: 100%;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const UsersCounter = styled(motion.span)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const UsersCount = styled(motion.span)`
  font-family: 'Basier';
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: 42px;
  text-align: center;
  margin: 0 8px 0 0;

  color: ${props => props.theme.mainContrastText};
`;

const MaxUsersCount = styled(motion.span)`
  font-family: 'Basier';
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 21px;
  text-align: center;
  letter-spacing: 1px;
  opacity: 0.3;

  color: ${props => props.theme.primaryLight};
`;

const UsersList = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 16px;

  ${media.medium`
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 24px;
  `}
`;

const JoinedUser = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0;
  align-items: center;
  justify-content: flex-start;
`;
