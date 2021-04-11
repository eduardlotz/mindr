/**
 *
 * Lobby
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { GameImage } from 'app/components/GameImage';
import { H2, H3, H5 } from 'app/components/styled/Headers';
import { AnimatePresence, motion } from 'framer-motion';
import { colors } from 'styles/colors';
import { variants } from 'styles/variants';
import Icon from 'app/components/Icon';
import { PrimaryFloatingButton } from 'app/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameModes } from '../Homepage/slice/selectors';
import { useLobbySlice } from './slice';
import { selectIsStandardMode, selectUsersInRoom } from './slice/selectors';
import { media } from 'styles/media';
import { useHomepageSlice } from '../Homepage/slice';
import { GameModeCard } from 'app/components/styled/GameModeCard';

interface Props {}

export function Lobby(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const gameModes = useSelector(selectGameModes);
  const isStandardMode = useSelector(selectIsStandardMode);

  const usersInRoom = useSelector(selectUsersInRoom);

  const { actions: lobbyActions } = useLobbySlice();
  const { actions: homeActions } = useHomepageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const setToStandardMode = () => {
    dispatch(lobbyActions.setIsStandardMode(true));
  };

  const setToDrinkingMode = () => {
    dispatch(lobbyActions.setIsStandardMode(false));
  };

  const handleGameModeClick = (mode, id) => {
    if (mode.isAvailable) dispatch(homeActions.toggleGameModeIsActive(id));
  };

  const gameTabVariants = {
    active: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        delay: 0.1 + i * 0.06,
      },
    }),
    hidden: { opacity: 0, scale: 0.9 },
    inactive: {
      transition: {
        type: 'spring',
      },
      opacity: 0.8,
      scale: 1,
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
                <GameModeCard
                  custom={i}
                  initial="hidden"
                  className={mode.isAvailable ? '' : 'disabled'}
                  animate={mode.isActive ? 'active' : 'inactive'}
                  variants={gameTabVariants}
                  onClick={() => handleGameModeClick(mode, i)}
                >
                  <GameImage size="92px" name={mode.imageClass} />
                  <H5 style={{ marginLeft: '16px' }}>
                    {t(`gamemode.${mode.title}`)}
                  </H5>
                </GameModeCard>
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
      <ContentBlock
        variants={variants.slideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <InlineBlock>
          <H3 style={{ maxWidth: '50%' }}>{t('lobby.userlistheader')}</H3>
          <UsersCounter>
            <UsersCount>{usersInRoom.length}</UsersCount>
            <MaxUsersCount>/10</MaxUsersCount>
          </UsersCounter>
        </InlineBlock>
        <UsersList>
          {usersInRoom.map(user => {
            return (
              <JoinedUser
                variants={variants.slideUp}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <UserAvatar src={user.avatar} />
                <Username>{user.name}</Username>
              </JoinedUser>
            );
          })}
        </UsersList>
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

const ContentBlock = styled(motion.div)`
  width: 100%;
`;

const GameModesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-row-gap: 16px;

  ${media.medium`
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
  `}

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
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 23px;
  text-align: left;

  color: ${colors.basic.black};
`;

const InlineBlock = styled(motion.div)`
  width: 100%;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const UsersCounter = styled(motion.span)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const UsersCount = styled(motion.span)`
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: 42px;
  text-align: center;
  margin: 0 8px 0 0;

  color: ${colors.brand.blue};
`;

const MaxUsersCount = styled(motion.span)`
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 21px;
  text-align: center;
  letter-spacing: 1px;
  opacity: 0.3;

  color: ${colors.brand.blue};
`;

const UsersList = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${media.medium`
    display: grid;
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
