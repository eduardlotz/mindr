/**
 *
 * Help
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { GameImage } from 'app/components/GameImage/Loadable';
import { H1, H5 } from 'app/components/styled/Headers';
import { GameModeCard } from 'app/components/styled/GameModeCard';
import { motion } from 'framer-motion';
import { colors } from 'styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectGameModes } from '../Homepage/slice/selectors';
import { PrimaryButton } from 'app/components/Button';
import Icon from 'app/components/Icon';
import { Link } from 'react-router-dom';
import { variants } from 'styles/variants';
import { useModalSlice } from 'app/components/MotionModal/slice';
import { media } from 'styles/media';

interface Props {}

export const Help = memo((props: Props) => {
  //array with all game modes & rules
  //TODO swap out with real database

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  // Use the slice we created
  const { actions: modalActions } = useModalSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  // `selectors` are used to read the state.
  const gameModes = useSelector(selectGameModes);

  const setModal = content => {
    dispatch(modalActions.setModalTitle(t(`gamemode.${content.title}`)));
    dispatch(modalActions.setModalContent(content.content));
    dispatch(modalActions.setModalImage(content.imageClass));
    dispatch(modalActions.setModalOpen(true));
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
      <InfoContainer
        variants={variants.container}
        initial="hidden"
        animate="visible"
      >
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
                <GameModeCard
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={`gamemode_${i}`}
                  variants={gameTabVariants}
                  onClick={() => setModal(mode)}
                  whileHover={'hover'}
                >
                  <GameImage size={'64px'} name={mode.imageClass} />
                  <H5 style={{ marginLeft: '16px' }}>
                    {t(`gamemode.${mode.title}`)}
                  </H5>
                </GameModeCard>
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

const Small = styled.small`
  display: flex;
  align-items: center;

  font-family: 'Basier';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;

  color: ${colors.basic.darkgrey};
`;

const ContentBlock = styled(motion.div)`
  width: 100%;
`;

const P = styled(motion.p)`
  width: 100%;

  font-family: 'Basier';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;

  color: ${colors.basic.textgrey};
`;
const HowToContainer = styled(motion.div)`
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
  left: 16px;
  right: 16px;
  bottom: 32px;
  max-width: calc(100% - 32px);
  margin: 0 auto;
  width: 100%;
  box-shadow: 0px 2.0370371341705322px 2.6888887882232666px 0px
      rgba(37, 67, 115, 0.0196),
    0px 9.629630088806152px 10.51111125946045px 0px rgba(37, 67, 115, 0.0304),
    0px 25px 33px 0px rgba(37, 67, 115, 0.05);

  ${media.medium`
    bottom: 24px;
    left: 0;
    right: 0;
    max-width: 800px;
  `}
`;
