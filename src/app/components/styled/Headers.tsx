import { motion } from 'framer-motion';
import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const H1 = styled(motion.h1)`
  width: 100%;
  margin: 0 0 8px 0;

  font-family: 'Basier', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 32px;

  color: ${props => props.theme.mainContrastText};

  ${media.medium`
    font-size: 38px;
    line-height: 50px;
  `}
`;

export const H2 = styled(motion.h2)`
  margin: 0 0 16px 0;
  font-family: 'Basier';
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 42px;

  color: ${props => props.theme.mainContrastText};

  &.margin-clear {
    margin: 0;
  }
`;

export const H3 = styled(motion.h3)`
  margin: 0 0 16px 0;
  font-family: 'Basier';
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 34px;

  color: ${props => props.theme.mainContrastText};

  &.margin-clear {
    margin: 0;
  }
`;

export const H5 = styled(motion.h5)`
  margin: 0;

  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;

  z-index: 10;

  color: ${props => props.theme.containerContrast};

  &.highlighted {
    color: ${props => props.theme.primary};
  }

  &.disabled {
    opacity: 0.2;
  }
`;

export const Highlighted = styled(motion.span)`
  color: ${props => props.theme.primary};
`;

export const SubText = styled(motion.p)`
  color: ${props => props.theme.mainSubtleText};
  font-size: 14px;
  font-weight: normal;
  margin: 0 0 16px 0;
`;
