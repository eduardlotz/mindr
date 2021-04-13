/**
 *
 * Navbar
 *
 */
import { motion } from 'framer-motion';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { colors } from 'styles/colors';
import { variants } from 'styles/variants';
import Icon from '../Icon';
import { Logo } from '../Logo';

interface Props {}

export function Navbar(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en');
  };

  return (
    <Container
      variants={variants.container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Link to="/">
        <MotionDiv
          variants={variants.popUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Logo color={colors.brand.blue} size={40} />
        </MotionDiv>
      </Link>

      <FlexRowDiv>
        <LanguageSwitcher
          onClick={toggleLanguage}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 1.3 }}
        >
          <Language className={i18n.language === 'de' ? 'is-active' : ''}>
            DE
          </Language>
          /
          <Language className={i18n.language === 'en' ? 'is-active' : ''}>
            EN
          </Language>
        </LanguageSwitcher>
        <Link to="/help">
          <MotionDiv
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 1.3 }}
          >
            <Icon
              name="circle-help"
              fill={colors.basic.lightgreyish}
              height="32"
              width="32"
            />
          </MotionDiv>
        </Link>
      </FlexRowDiv>
    </Container>
  );
}

const MotionDiv = styled(motion.div)``;

const Container = styled(motion.div)`
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.95);
  width: calc(100% - 32px);
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
`;

const FlexRowDiv = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LanguageSwitcher = styled(motion.button)`
  display: flex;
  flex-direction: row;
  margin-right: 16px;
  border: none;
  background: transparent;

  font-family: 'Basier';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;

  cursor: pointer;

  color: ${colors.basic.lightgreyish};

  &:focus {
    border: none;
    outline: none;
  }
`;

const Language = styled.p`
  font-family: 'Basier';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;

  color: ${colors.basic.lightgreyish};

  &.is-active {
    color: ${colors.brand.blue};
  }

  &:first-child {
    margin: 0 4px 0 0;
  }

  &:last-child {
    margin: 0 0 0 4px;
  }
`;
