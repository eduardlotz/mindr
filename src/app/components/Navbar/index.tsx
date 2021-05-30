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
import Icon from '../Icon';
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
      <Link to="/help" style={{ display: 'flex', alignItems: 'center' }}>
        <HelpLink>
          {t('help.whatismindr')}
          <Icon style={{ marginLeft: '4px' }} name="circle-help" width="20" />
        </HelpLink>
      </Link>

      <Link to="/">
        <MotionDiv
          variants={variants.popUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Logo color={theme.primary} />
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

const HelpLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 10px;
  background-color: ${props => props.theme.primaryFaded};
  color: ${props => props.theme.primary};

  font-size: 16px;
  font-family: 'Basier';
  font-weight: 600;
`;

const LanguageSwitcher = styled(motion.button)`
  display: flex;

  margin-right: 16px;
  border: none;
  background: ${props => props.theme.primaryFaded};
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
  margin: 0;

  color: ${props => props.theme.primary};
  opacity: 0.5;

  transition: 0.25s ease-out;
  transition-property: color;

  &.is-active {
    opacity: 1;
  }

  &:first-child {
    margin-right: 8px;
  }
`;
