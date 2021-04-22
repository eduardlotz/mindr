/**
 *
 * Lobby
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { H2, H3, H5, Highlighted } from 'app/components/styled/Headers';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { colors } from 'styles/colors';
import { variants } from 'styles/variants';
import Icon from 'app/components/Icon';
import { useSelector } from 'react-redux';
import { selectGameModes } from '../Homepage/slice/selectors';
import { media } from 'styles/media';
import {
  selectIsStandardMode,
  selectGroupCode,
  selectGameLength,
  selectUsersInRoom,
} from '../Lobby/slice/selectors';
import { GameImage } from 'app/components/GameImage';

interface Props {}

export function JoinedRoom(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const gameModes = useSelector(selectGameModes);
  const isStandardMode = useSelector(selectIsStandardMode);
  const room = useSelector(selectGroupCode);
  const gameLength = useSelector(selectGameLength);
  const usersInRoom = useSelector(selectUsersInRoom);

  const gameVariants = {
    active: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        delay: 0.1 + i * 0.06,
      },
      transitionEnd: {
        opacity: 'unset',
      },
    }),
    hidden: { opacity: 0, scale: 0.9 },
  };

  return (
    <LobbyContainer>
      <ContentBlock
        variants={variants.slideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <InlineBlock style={{ margin: 0 }}>
          <H3 style={{ maxWidth: '50%', margin: 0 }}>
            {t('room.room')} <Highlighted>{room}</Highlighted>
          </H3>
          <UsersCounter>
            <UsersCount>{usersInRoom.length}</UsersCount>
            <MaxUsersCount>/10</MaxUsersCount>
          </UsersCounter>
        </InlineBlock>
        <InfoLine>{t('room.min-user-info')}</InfoLine>
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
        <H2>{t('room.activeGames')}</H2>
        <GameModesContainer>
          {gameModes.map(
            (mode, i) =>
              mode.isActive && (
                <AnimatePresence key={`gamemode_${i}`}>
                  <AnimateSharedLayout>
                    <CardContainer
                      key={'game_select_card_' + i}
                      custom={i}
                      initial="hidden"
                      animate={'active'}
                      variants={gameVariants}
                      layout
                    >
                      <GameImage
                        color={colors.basic.black}
                        size="92px"
                        name={mode.imageClass}
                      />
                      <H5>{t(`gamemode.${mode.title}`)}</H5>
                    </CardContainer>
                  </AnimateSharedLayout>
                </AnimatePresence>
              ),
          )}
        </GameModesContainer>
      </ContentBlock>
      <ContentBlock
        variants={variants.slideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
      >
        <H2>{t('room.notavailableGames')}</H2>
        <GameModesContainer>
          {gameModes.map(
            (mode, i) =>
              (!mode.isAvailable || !mode.isActive) && (
                <AnimatePresence key={`inactive_game_${i}`}>
                  <InActiveGame
                    custom={i}
                    initial="hidden"
                    animate={'active'}
                    variants={gameVariants}
                  >
                    <H5 className="disabled">{t(`gamemode.${mode.title}`)}</H5>
                  </InActiveGame>
                </AnimatePresence>
              ),
          )}
        </GameModesContainer>
      </ContentBlock>
      <DoubleContentBlock
        variants={variants.slideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <SettingsCard>
          <SettingsHeader>{t('room.gamemode')}</SettingsHeader>
          <SettingsText>
            {isStandardMode ? t('room.standardmode') : t('room.drinkingmode')}
          </SettingsText>
        </SettingsCard>

        <SettingsCard>
          <SettingsHeader>{t('room.gameduration')}</SettingsHeader>
          <SettingsText>{gameLength}</SettingsText>
        </SettingsCard>
      </DoubleContentBlock>

      <BottomInfoText>{t('room.bottomInfoText')}</BottomInfoText>
    </LobbyContainer>
  );
}

const LobbyContainer = styled(motion.div)`
  width: 100%;
  padding: 32px 0 80px;
`;

const SettingsCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #f8f7fd;
  border-radius: 16px;
  padding: 24px;
`;

const SettingsHeader = styled(motion.h5)`
  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;

  text-align: center;
  margin: 0 0 24px 0;

  color: #111111;
`;

const SettingsText = styled(motion.h4)`
  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 38px;
  text-align: center;

  margin: 0;

  color: #7f69d4;
`;

const ContentBlock = styled(motion.div)`
  width: 100%;
  margin-bottom: 40px;
`;

const DoubleContentBlock = styled(ContentBlock)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
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

const InfoLine = styled.p`
  font-family: 'Basier';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 21px;
  text-align: left;
  margin: 0 0 16px 0;

  color: ${colors.basic.textgrey};
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

  color: ${colors.basic.black};
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

  color: ${colors.basic.darkgrey};
`;

const UsersList = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

const CardContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  height: auto;
  border-radius: 16px;

  ${media.medium`
    padding: 16px 32px;
  `}

  background: #faf9fa;
`;

const InActiveGame = styled(motion.div)`
  width: 100%;
  background: ${colors.basic.white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: auto;
  border-radius: 16px;
  border: 2px solid ${colors.basic.lightgrey};
`;

const BottomInfoText = styled.h4`
  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;

  margin: 0 auto;
  text-align: center;
  padding: 0;

  color: ${colors.basic.black};
`;
