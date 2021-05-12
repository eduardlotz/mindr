/**
 *
 * MotionModal
 *
 */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { H2 } from 'app/components/styled/Headers';
import { media } from 'styles/media';
import { useModalSlice } from './slice';
import { selectModal } from './slice/selectors';
import Icon from '../Icon';
import { variants } from 'styles/variants';
import gameImages from 'assets/games/gameImages';
import { ImageSlider } from '../ImageSlider';
import { useTranslation } from 'react-i18next';

export const MotionModal = () => {
  // Use the slice we created
  const { actions } = useModalSlice();
  const { t } = useTranslation();

  const modal = useSelector(selectModal);

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(actions.setModalOpen(false));
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {modal.isOpen && (
          <Background
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.8,
              transition: {
                type: 'spring',
                damping: 10,
                mass: 0.3,
                stiffness: 100,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                type: 'spring',
                damping: 10,
                mass: 0.3,
                stiffness: 100,
              },
            }}
            onClick={closeModal}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {modal.isOpen && (
          <Body
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                damping: 4,
                mass: 0.3,
                stiffness: 60,
              },
            }}
            exit={{
              opacity: 0,
              y: -20,
              transition: {
                type: 'spring',
                damping: 4,
                mass: 0.3,
                stiffness: 60,
              },
            }}
          >
            <CloseButton
              onClick={closeModal}
              variants={variants.iconButtonVariants}
              whileHover="hover"
              whileTap="pressed"
              initial="rest"
            >
              <Icon name="close" width="24" />
            </CloseButton>
            <H2>{modal.title}</H2>
            <ImageSliderWrapper>
              <ImageSlider images={gameImages[modal.content]} />
            </ImageSliderWrapper>
            <ExplanationText>
              {t(`gameexplanation.${modal.content}`)}
            </ExplanationText>
          </Body>
        )}
      </AnimatePresence>
    </>
  );
};

const ExplanationText = styled.p`
  width: 100%;
  font-size: 14px;
  font-weight: normal;
  color: ${props => props.theme.mainContrastText};
  text-align: left;
  margin: 16px 0;
`;

const ImageSliderWrapper = styled.div`
  width: 100%;
  height: 440px;
  max-height: 440px;

  margin: 24px auto;
  overflow: hidden;
  position: relative;

  display: grid;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 16px;
  right: 16px;

  height: 32px;
  width: 32px;
  border-radius: 12px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  background-color: ${props => props.theme.container};
  color: ${props => props.theme.containerSubtleText};

  transition: color 0.25s ease-out;

  &:hover {
    color: ${props => props.theme.containerContrast};
  }
`;

const Body = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  height: 80%;
  width: 40%;
  max-height: 80%;

  width: calc(100% - 32px);
  margin: auto 16px;

  ${media.medium`
    width: 50%;
    margin: auto;
    `}

  padding: 24px 40px;

  background: ${props => props.theme.mainBg};
  border-radius: 12px;

  z-index: 9000;
`;

const Background = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;

  height: 100vh;
  width: 100%;

  background-color: ${props => props.theme.darkgrey};
  opacity: 0;

  z-index: 8000;
`;
