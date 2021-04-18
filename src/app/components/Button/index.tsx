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
  background: ${colors.brand.purple};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;

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
    background-color: ${colors.btn.bgDisabled};
    color: ${colors.btn.textDisabled};
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
  border: 2px solid ${colors.basic.lightgrey};
  color: ${colors.basic.almostblack};

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

  color: ${colors.brand.purple};

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
  box-shadow: 0px 2.0370371341705322px 2.6888887882232666px 0px
      rgba(37, 67, 115, 0.0196),
    0px 9.629630088806152px 10.51111125946045px 0px rgba(37, 67, 115, 0.0304),
    0px 25px 33px 0px rgba(37, 67, 115, 0.05);
`;
