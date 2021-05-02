/**
 *
 * MotionModal
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { H2 } from 'app/components/styled/Headers';
import { media } from 'styles/media';
import { useModalSlice } from './slice';
import { selectModal } from './slice/selectors';
import Icon from '../Icon';
import { variants } from 'styles/variants';

interface Props {
  content?: React.ReactChild[];
}

export function MotionModal(props: Props) {
  // Use the slice we created
  const { actions } = useModalSlice();

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
            {props.content}
          </Body>
        )}
      </AnimatePresence>
    </>
  );
}

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

  min-height: 50vh;
  height: fit-content;
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
