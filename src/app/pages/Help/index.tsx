/**
 *
 * Help
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { H1 } from 'app/components/styled/Headers';
import { motion } from 'framer-motion';
import { colors } from 'styles/colors';
// import { useDispatch } from 'react-redux';
import { PrimaryButton } from 'app/components/Button';
import Icon from 'app/components/Icon';
import { useNavigate } from 'react-router-dom';
import { variants } from 'styles/variants';
// import { useModalSlice } from 'app/components/MotionModal/slice';
import { media } from 'styles/media';
import { GameModalCard } from 'app/components/GameModalCard';
import { selectGameModes } from '../Homepage/slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useModalSlice } from 'app/components/MotionModal/slice';

export const Help = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { actions: modalActions } = useModalSlice();
  const gameModes = useSelector(selectGameModes);
  const navigate = useNavigate();

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

  const openModal = (gameId: string) => {
    const selectedGame = gameModes.find(game => game.title === gameId);

    if (selectedGame) {
      dispatch(modalActions.setModalTitle(t(`gamemode.${selectedGame.title}`)));
      dispatch(modalActions.setModalContent(selectedGame.title));
      dispatch(modalActions.setModalOpen(true));
    }
  };

  const goBack = () => {
    navigate(-1);
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
          <HowToContainer>
            {gameModes.map((item, i) => (
              <GameModalCard
                onClick={() => openModal(item.title)}
                imageClass={item.imageClass}
                title={item.title}
              />
            ))}
          </HowToContainer>
        </ContentBlock>
      </InfoContainer>
      <PrimaryFloatingButton
        variants={floatingBtnVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={goBack}
      >
        <Icon
          name="circle-arrow-left"
          fill="white"
          height="24"
          width="24"
          style={{ marginRight: '16px' }}
        />
        {t('home.goback')}
      </PrimaryFloatingButton>
    </>
  );
};

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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 16px;

  ${media.medium`
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
  `}

  margin: 16px 0 40px 0;
`;

const InfoContainer = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: 100%;

  margin: 40px 0 80px 0;
  ${media.medium`
    margin-top: 64px 0 120px 0;
  `}
`;

const PrimaryFloatingButton = styled(PrimaryButton)`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 32px;
  max-width: calc(100% - 32px);
  margin: 0 auto;
  width: 100%;
  z-index: 1000;
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
