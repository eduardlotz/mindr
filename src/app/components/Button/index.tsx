import { motion } from 'framer-motion';
import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 56px;
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: none;

  font-family: 'Basier';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;

  cursor: pointer;
`;

export const PrimaryButton = styled(Button)`
  color: ${props => props.theme.primaryContrast};
  background: ${props => props.theme.primary};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;

  transition: 0.25s ease-out;
  transition-property: background-color color;

  &.icon-right {
    & > svg {
      display: none;
    }

    &:hover {
      & > svg {
        margin-left: 32px;
      }
    }

    @media (min-width: 400px) {
      & > svg {
        display: flex;
      }
    }
  }

  &:disabled {
    background-color: ${props => props.theme.mutedBg};
    color: ${props => props.theme.mutedContrast};
  }
`;

export const SecondaryButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 56px;
  width: 100%;
  border-radius: 16px;
  padding: 16px;

  background: transparent;
  border: 2px solid ${props => props.theme.mainSubtleText};
  color: ${props => props.theme.mainContrastText};

  transition: 0.25s ease-out;
  transition-property: color border-color;

  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;

  ${media.medium`
    padding: 16px 72px;
  `}
`;

export const LinkButton = styled(motion.button)`
  font-family: 'Basier';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;

  background: transparent;
  border: none;
  outline: none;

  cursor: pointer;

  color: ${props => props.theme.primary};

  transition: 0.25s ease-out;
  transition-property: color;

  margin: 16px 0;

  ${media.medium`
    margin: 0;
  `}

  &:hover {
    text-decoration: underline;
  }
`;

export const PrimaryFloatingButton = styled(PrimaryButton)`
  z-index: 500;
  position: fixed;
  bottom: 24px;
  left: 16px;
  right: 16px;
  margin: 0 auto;
  max-width: 800px;
  width: calc(100% - 32px);
  &:not(:disabled) {
    box-shadow: ${props => props.theme.btnShadow};
  }

  transition: 0.25s ease-out;
  transition-property: box-shadow;
`;
