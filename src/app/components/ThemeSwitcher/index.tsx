/**
 *
 * ThemeSwitcher
 *
 */
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useHomepageSlice } from 'app/pages/Homepage/slice';
import { selectTheme } from 'app/pages/Homepage/slice/selectors';
import styled from 'styled-components/macro';
import { setLocalStorage } from 'helpers/localstorage';
import Icon from '../Icon';
import React from 'react';
import { variants } from 'styles/variants';
import { useTranslation } from 'react-i18next';

export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { actions: homeActions } = useHomepageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const currentTheme = useSelector(selectTheme);

  const toggleTheme = () => {
    if (currentTheme === 'light') {
      dispatch(homeActions.setTheme('dark'));
      setLocalStorage('theme', 'dark');
    } else {
      dispatch(homeActions.setTheme('light'));
      setLocalStorage('theme', 'light');
    }
  };

  return (
    <ButtonBody
      onClick={toggleTheme}
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
          name={currentTheme === 'light' ? 'sun' : 'moon'}
          height="24"
          width="24"
        />
      </MotionDiv>
    </ButtonBody>
  );
};

const ButtonBody = styled(motion.div)`
  display: flex;
  padding: 8px;
  background: ${props => props.theme.primaryFaded};
  border-radius: 10px;
  color: ${props => props.theme.primary};

  transition: 0.25s ease-out;
  transition-property: color;
`;

const MotionDiv = styled(motion.div)``;
