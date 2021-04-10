import { motion } from 'framer-motion';
import styled from 'styled-components/macro';
import { colors } from 'styles/colors';
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
  color: ${colors.basic.white};
  background: ${colors.brand.blue};
  width: 100%;

  &.icon-right {
    &:hover {
      & > svg {
        margin-left: 32px;
      }
    }
  }
`;

export const SecondaryButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 56px;
  width: 100%;
  padding: 16px 72px;
  border-radius: 16px;

  background: transparent;
  border: 2px solid ${colors.basic.lightgrey};
  color: ${colors.basic.almostblack};

  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
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

  color: ${colors.brand.blue};

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
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  box-shadow: 0px 2.0370371341705322px 2.6888887882232666px 0px
      rgba(37, 67, 115, 0.0196),
    0px 9.629630088806152px 10.51111125946045px 0px rgba(37, 67, 115, 0.0304),
    0px 25px 33px 0px rgba(37, 67, 115, 0.05);
`;
