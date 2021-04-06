/**
 *
 * Help
 *
 */
import React, { memo, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { GameImage } from 'app/components/GameImage/Loadable';
import { H1, H5 } from 'app/components/styled/Headers';
import { AnimatePresence, motion } from 'framer-motion';
import { colors } from 'styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameModes, selectModal } from '../Homepage/slice/selectors';
import { useHomepageSlice } from '../Homepage/slice';
import { PrimaryButton } from 'app/components/Button';
import Icon from 'app/components/Icon';
import { Link, useHistory } from 'react-router-dom';
import { NONAME } from 'dns';
import { variants } from 'styles/variants';

interface Props {}

export const Help = memo((props: Props) => {
  //array with all game modes & rules
  //TODO swap out with real database

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const games = [
    {
      title: 'quiz',
      imageClass: 'quiz',
      content: [
        '1. Every player gets the same question with 4 possible answers.',
        '2. You have 20 seconds to pick the right answer.',
        '3. The faster you answer correctly, the more points you get.',
      ],
    },
    {
      title: 'drawguess',
      imageClass: 'draw-and-guess',
      content: ['How to play Draw & Guess'],
    },
    {
      title: 'mostlikely',
      imageClass: 'most-likely',
      content: ['How to play Most Likely'],
    },
    {
      title: 'bestartist',
      imageClass: 'best-artist',
      content: ['How to play Best artist'],
    },
    {
      title: 'survey',
      imageClass: 'survey',
      content: ['How to play Survey'],
    },
    {
      title: 'whoknowsyou',
      imageClass: 'who-knows-you',
      content: ['How to play Who knows you'],
    },
  ];

  // Use the slice we created
  const { actions } = useHomepageSlice();

  let history = useHistory();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  // `selectors` are used to read the state.
  const gameModes = useSelector(selectGameModes);

  const modal = useSelector(selectModal);

  const setModal = content => {
    dispatch(actions.setModalContent(content));
    dispatch(actions.setModalOpen(true));
  };

  const onCloseBtnClicked = evt => {
    evt.preventDefault();
    history.goBack();
  };

  useEffect(() => {
    if (gameModes.length < 2) dispatch(actions.setGameModes(games));
  }, []);

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
      <InfoContainer
        variants={variants.container}
        initial="hidden"
        animate="visible"
      >
        <CloseButton onClick={onCloseBtnClicked} />
        <ContentBlock
          variants={variants.slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <H1
            variants={variants.slideUpItem}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {t('help.whatismindr')}
          </H1>
          <P
            variants={variants.slideUpItem}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {t('help.explainmindr')}
          </P>
        </ContentBlock>
        <ContentBlock
          variants={variants.slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <H1>{t('help.whatgames')}</H1>
          <Small>{t('help.whatgameshint')}</Small>
          <HowToContainer
            variants={variants.container}
            initial="hidden"
            animate="visible"
          >
            {gameModes.map((mode, i) => {
              return (
                <GameModeTab
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={`gamemode_${i}`}
                  variants={gameTabVariants}
                  onClick={() => setModal(mode)}
                  whileHover={'hover'}
                >
                  <GameImage name={mode.imageClass} />
                  <H5>{t(`gamemode.${mode.title}`)}</H5>
                </GameModeTab>
              );
            })}
          </HowToContainer>
        </ContentBlock>
      </InfoContainer>
      <Link to="/" style={{ width: '100%' }}>
        <PrimaryFloatingButton
          variants={floatingBtnVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Icon
            name="circle-arrow-left"
            fill="white"
            height="24"
            width="24"
            style={{ marginRight: '16px' }}
          />
          {t('home.backtohome')}
        </PrimaryFloatingButton>
      </Link>
    </>
  );
});

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 0;
  right: 0;

  height: 32px;
  width: 32px;
  border-radius: 12px;
  border: none;

  display: flex;
  object-fit: contain;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  cursor: pointer;

  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.0662 8.99469C16.3591 8.70179 16.3591 8.22692 16.0662 7.93403C15.7733 7.64113 15.2985 7.64113 15.0056 7.93403L12.0004 10.9392L8.99518 7.93403C8.70229 7.64113 8.22742 7.64113 7.93452 7.93403C7.64163 8.22692 7.64163 8.70179 7.93452 8.99469L10.9397 11.9999L7.93451 15.0051C7.64162 15.298 7.64162 15.7729 7.93451 16.0658C8.22741 16.3586 8.70228 16.3586 8.99517 16.0658L12.0004 13.0605L15.0056 16.0658C15.2985 16.3586 15.7734 16.3586 16.0663 16.0658C16.3591 15.7729 16.3591 15.298 16.0663 15.0051L13.061 11.9999L16.0662 8.99469Z' fill='%23111111'/%3E%3C/svg%3E%0A");
`;

const Small = styled.small`
  display: flex;
  align-items: center;

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;

  color: ${colors.basic.darkgrey};
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

const Bold = styled.span`
  font-weight: bold;
  color: ${colors.basic.almostblack};
`;

const P = styled(motion.p)`
  width: 100%;

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;

  color: ${colors.basic.textgrey};
`;
const HowToContainer = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  margin: 16px 0 40px 0;
  background-color: ${colors.basic.white};
`;

const InfoContainer = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: 100%;

  margin: 0;
`;

const PrimaryFloatingButton = styled(PrimaryButton)`
  position: fixed;
  bottom: 24px;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  box-shadow: 0px 2.0370371341705322px 2.6888887882232666px 0px
      rgba(37, 67, 115, 0.0196),
    0px 9.629630088806152px 10.51111125946045px 0px rgba(37, 67, 115, 0.0304),
    0px 25px 33px 0px rgba(37, 67, 115, 0.05);
`;
