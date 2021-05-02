/**
 *
 * ChatButton
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import { variants } from 'styles/variants';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useModalSlice } from '../MotionModal/slice';

interface Props {}

export function ChatButton(props: Props) {
  const { t } = useTranslation();

  const { actions: modalActions } = useModalSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const openChat = () => {
    dispatch(modalActions.setModalOpen(true));
    dispatch(modalActions.setModalTitle('Chat'));
  };

  return (
    <ButtonBody
      onClick={openChat}
      variants={variants.iconButtonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      data-tip={t('home.toggleTheme')}
      data-effect="solid"
      data-arrow-color="transparent"
    >
      <MotionDiv>
        <Icon
          style={{ cursor: 'pointer' }}
          name={'chat'}
          height="24"
          width="24"
        />
      </MotionDiv>
    </ButtonBody>
  );
}

const ButtonBody = styled(motion.div)`
  display: flex;
  padding: 4px;
  background: ${props => props.theme.container};
  border-radius: 10px;
  color: ${props => props.theme.containerSubtleText};

  transition: 0.25s ease-out;
  transition-property: color;

  &:hover {
    color: ${props => props.theme.containerContrast};
  }
`;

const MotionDiv = styled(motion.div)``;
