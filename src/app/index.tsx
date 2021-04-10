/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, useLocation } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Help } from './pages/Help/Loadable';
import styled from 'styled-components/macro';
import { Navbar } from './components/Navbar/Loadable';
import { MotionModal } from './components/MotionModal';
import { Lobby } from './pages/Lobby/Loadable';
import { Homepage } from './pages/Homepage/Loadable';
import { useHomepageSlice } from './pages/Homepage/slice';
import { useDispatch } from 'react-redux';
import { games } from './pages/Homepage/gamesModes';
import { media } from 'styles/media';

export function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { i18n } = useTranslation();
  const location = useLocation();

  const { actions: homeActions } = useHomepageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(homeActions.setGameModes(games));
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

      <MainContainer>
        <MotionModal />
        <Navbar />
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/lobby" component={Lobby} />
            <Route exact path="/help" component={Help} />
            <Route component={NotFoundPage} />
          </Switch>
        </AnimatePresence>
      </MainContainer>
      <GlobalStyle />
    </>
  );
}

const MainContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  padding: 0 16px 40px 16px;
  ${media.medium`
      padding: 0 0 60px 0;
  `}
`;
