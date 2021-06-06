/**
 *
 * Lobby
 *
 */
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { H2, H5 } from 'app/components/styled/Headers';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { colors } from 'styles/colors';
import { variants } from 'styles/variants';
import { useSelector } from 'react-redux';
import { selectGameModes } from '../Homepage/slice/selectors';
import { media } from 'styles/media';
import {
  selectIsStandardMode,
  selectGameLength,
} from '../Lobby/slice/selectors';
import { GameImage } from 'app/components/GameImage';
import { RoomTopBar } from 'app/components/RoomTopBar/Loadable';
import { RoomUserList } from 'app/components/RoomUserList';

interface Props {}

export function JoinedRoom(props: Props) {
  const { t } = useTranslation();

  const gameModes = useSelector(selectGameModes);
  const isStandardMode = useSelector(selectIsStandardMode);
  const gameLength = useSelector(selectGameLength);

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
      <RoomTopBar />
      <RoomUserList />
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
  background: ${props => props.theme.container};
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

  color: ${props => props.theme.mainContrastText};
`;

const SettingsText = styled(motion.h4)`
  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 38px;
  text-align: center;

  margin: 0;

  color: ${props => props.theme.primary};
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
  background-color: transparent;
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

  background: ${props => props.theme.container};
`;

const InActiveGame = styled(motion.div)`
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: auto;
  border-radius: 16px;
  border: 2px solid ${props => props.theme.lightgrey};
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

  color: ${props => props.theme.mainContrastText};
`;
