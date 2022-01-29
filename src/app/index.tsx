/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { GlobalStyle } from 'styles/global-styles';

import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Help } from './pages/Help/Loadable';
import styled, { ThemeProvider } from 'styled-components/macro';
import { MotionModal } from './components/MotionModal';
import { Lobby } from './pages/Lobby/Loadable';
import { Homepage } from './pages/Homepage/Loadable';

import { useHomepageSlice } from './pages/Homepage/slice';
import { useDispatch, useSelector } from 'react-redux';
import { games } from './pages/Homepage/gamesModes';
import {
  selectJoinedGroup,
  selectIsCreator,
} from './pages/Lobby/slice/selectors';
import { JoinedRoom } from './pages/JoinedRoom';
import { getLocalStorage, setLocalStorage } from 'helpers/localstorage';
import { selectTheme } from './pages/Homepage/slice/selectors';
import lightTheme from 'styles/lightTheme';
import darkTheme from 'styles/darkTheme';
import { CreatePlayer } from './pages/CreatePlayer/Loadable';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

export function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  const { actions: homeActions } = useHomepageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const joinedGroup = useSelector(selectJoinedGroup);
  const isCreator = useSelector(selectIsCreator);

  const currentTheme = useSelector(selectTheme);

  const theme = currentTheme === 'light' ? lightTheme : darkTheme;

  React.useEffect(() => {
    dispatch(homeActions.setGameModes(games));
  }, [dispatch, homeActions]);

  React.useEffect(() => {
    let selectedTheme = getLocalStorage('theme');

    if (!selectedTheme) {
      selectedTheme = 'light';
      setLocalStorage('theme', 'light');
    }
    dispatch(homeActions.setTheme(selectedTheme));
  }, [dispatch, homeActions]);

  return (
    <>
      <Helmet
        titleTemplate="%s - mindr"
        defaultTitle="mindr"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta
          name="description"
          content="mindr is an online party game made for social distancing"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <MotionModal />
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.key}>
              <Route path="/" element={<Homepage />} />
              <Route path="/help" element={<Help />} />
              <Route path="/join/:room" element={<CreatePlayer />} />

              {isCreator ? (
                <Route path="/room/:room" element={<Lobby />} />
              ) : joinedGroup ? (
                <Route path="/room/:room" element={<JoinedRoom />} />
              ) : (
                <Route element={() => <Navigate to="/" />} />
              )}
            </Routes>
          </AnimatePresence>
        </MainContainer>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

const MainContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: calc(100% - 32px);
  max-width: 800px;
  margin: 0 auto;
  background: transparent;
  position: relative;

  padding-bottom: 20px;
`;
