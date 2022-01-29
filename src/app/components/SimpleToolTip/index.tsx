import { motion } from 'framer-motion';
import styled from 'styled-components';
import { variants } from 'styles/variants';

export const SimpleTooltip = ({ text }: { text: string }) => {
  return <ToolTip variants={variants.slideUp}>{text}</ToolTip>;
};

const ToolTip = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.mainContrastText};
  color: ${props => props.theme.mainBg};
  padding: 4px 8px;
  border-radius: 8px;
  min-width: fit-content;
  white-space: nowrap;

  position: absolute;
  bottom: -32px;
  left: 0;
  right: 0;
  margin: 0 auto;

  font-size: 14px;
  font-weight: normal;
`;
