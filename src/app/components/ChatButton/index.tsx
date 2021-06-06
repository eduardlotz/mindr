/**
 *
 * ChatButton
 *
 */
import styled from 'styled-components/macro';
import Icon from '../Icon';
import { variants } from 'styles/variants';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useModalSlice } from '../MotionModal/slice';

interface Props {}

export function ChatButton(props: Props) {
  return (
    <ButtonBody
      variants={variants.iconButtonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
    >
      <MotionDiv>
        <Icon style={{ cursor: 'pointer' }} name={'chat'} width="24" />
      </MotionDiv>
    </ButtonBody>
  );
}

const ButtonBody = styled(motion.div)`
  display: flex;
  padding: 8px;
  background: ${props => props.theme.container};
  border-radius: 12px;
  color: ${props => props.theme.containerContrast};

  transition: 0.25s ease-out;
  transition-property: color;

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const MotionDiv = styled(motion.div)``;
