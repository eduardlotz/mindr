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
import lightTheme from 'styles/lightTheme';
import React from 'react';
import Icon from '../Icon';

interface Props {}

export function ThemeSwitcher(props: Props) {
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
      whileHover={{ scale: 1, rotate: -30 }}
      whileTap={{ scale: 1.3 }}
      onClick={toggleTheme}
    >
      <Icon
        style={{ cursor: 'pointer' }}
        name="sun"
        fill={lightTheme.primary}
        height="24"
        width="24"
      />
    </ButtonBody>
  );
}

const ButtonBody = styled(motion.div)`
  display: flex;
  padding: 4px;
  background: ${props => props.theme.primaryFaded};
  border-radius: 10px;
`;
