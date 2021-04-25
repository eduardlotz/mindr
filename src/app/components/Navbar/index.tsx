/**
 *
 * Navbar
 *
 */

import { motion } from 'framer-motion';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components/macro';
import { variants } from 'styles/variants';
import { HelpLink } from '../HelpLink';
import { Logo } from '../Logo';
import { ThemeSwitcher } from '../ThemeSwitcher';

interface Props {}

export function Navbar(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const theme = useTheme();

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
      <HelpLink />

      <Link to="/">
        <MotionDiv
          variants={variants.popUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Logo color={theme.primary} size={64} />
        </MotionDiv>
      </Link>

      <FlexRowDiv>
        <LanguageSwitcher
          onClick={toggleLanguage}
          variants={variants.iconButtonVariants}
          initial="rest"
          whileTap="pressed"
          whileHover="hover"
          data-tip={t('home.toggleLanguage')}
          data-effect="solid"
          data-arrow-color="transparent"
        >
          <Language
            className={i18n.language === 'de' ? 'is-active' : ''}
            initial="rest"
            whileTap="pressed"
            whileHover="hover"
          >
            DE
          </Language>
          /
          <Language
            className={i18n.language === 'en' ? 'is-active' : ''}
            initial="rest"
            whileTap="pressed"
            whileHover="hover"
          >
            EN
          </Language>
        </LanguageSwitcher>
        <ThemeSwitcher />
      </FlexRowDiv>
    </Container>
  );
}

const MotionDiv = styled(motion.div)``;

const Container = styled(motion.div)`
  margin: 0 auto;
  width: 100%;
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
  background: ${props => props.theme.container};
  padding: 8px;
  border-radius: 10px;

  font-family: 'Basier';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;

  cursor: pointer;

  color: ${props => props.theme.containerSubtleText};

  transition: 0.25s ease-out;
  transition-property: color;

  &:focus {
    border: none;
    outline: none;
  }
`;

const Language = styled(motion.p)`
  font-family: 'Basier';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;

  color: ${props => props.theme.containerSubtleText};

  transition: 0.25s ease-out;
  transition-property: color;

  &.is-active {
    color: ${props => props.theme.containerContrast};
  }

  &:first-child {
    margin: 0 4px 0 0;
  }

  &:last-child {
    margin: 0 0 0 4px;
  }
`;
