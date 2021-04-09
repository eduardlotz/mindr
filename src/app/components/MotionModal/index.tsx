/**
 *
 * MotionModal
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { H2 } from 'app/components/styled/Headers';
import { media } from 'styles/media';
import { colors } from 'styles/colors';
import { useModalSlice } from './slice';
import { selectModal } from './slice/selectors';

interface Props {}

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
            <CloseButton onClick={closeModal}></CloseButton>
            <H2>{modal.title}</H2>
            {modal.content}
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
  object-fit: contain;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  cursor: pointer;

  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.0662 8.99469C16.3591 8.70179 16.3591 8.22692 16.0662 7.93403C15.7733 7.64113 15.2985 7.64113 15.0056 7.93403L12.0004 10.9392L8.99518 7.93403C8.70229 7.64113 8.22742 7.64113 7.93452 7.93403C7.64163 8.22692 7.64163 8.70179 7.93452 8.99469L10.9397 11.9999L7.93451 15.0051C7.64162 15.298 7.64162 15.7729 7.93451 16.0658C8.22741 16.3586 8.70228 16.3586 8.99517 16.0658L12.0004 13.0605L15.0056 16.0658C15.2985 16.3586 15.7734 16.3586 16.0663 16.0658C16.3591 15.7729 16.3591 15.298 16.0663 15.0051L13.061 11.9999L16.0662 8.99469Z' fill='%23111111'/%3E%3C/svg%3E%0A");
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

  background: ${colors.basic.white};
  border-radius: 12px;

  z-index: 9000;
`;

const Background = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;

  height: 100vh;
  width: 100%;

  background-color: ${colors.basic.almostblack};
  opacity: 0;

  z-index: 8000;
`;
