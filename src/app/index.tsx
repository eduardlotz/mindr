/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Switch,
  Route,
  BrowserRouter,
  useLocation,
  Link,
} from 'react-router-dom';

import groupCodeImage from '../assets/groupcode-help.jpg';

import { GlobalStyle } from 'styles/global-styles';

import { Homepage } from './pages/Homepage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { CreatePlayer } from './pages/CreatePlayer/Loadable';
import { AnimatePresence, motion } from 'framer-motion';
import { Help } from './pages/Help/Loadable';
import styled from 'styled-components/macro';
import { Navbar } from './components/Navbar/Loadable';
import { useDispatch, useSelector } from 'react-redux';
import { useHomepageSlice } from './pages/Homepage/slice';
import { selectModal } from './pages/Homepage/slice/selectors';
import { MotionModal } from './components/MotionModal';
import { colors } from 'styles/colors';
import { Lobby } from './pages/Lobby/Loadable';

export function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  // Use the slice we created
  const { actions: homeActions } = useHomepageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  // `selectors` are used to read the state.
  const modal = useSelector(selectModal);

  const codeTextImage = () => {
    <FlexColDiv>
      <P>
        Ask your friends to tell you their code. It's in the upper right corner.
      </P>
      <BigImage src={groupCodeImage} />
    </FlexColDiv>;
  };

  const groupCodeContent = {
    title: 'Where is the code?',
    content: codeTextImage,
  };

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
        <MotionModal
          isOpen={modal.isOpen}
          title={modal.title}
          content={modal.content}
        />
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
  padding-bottom: 80px;
`;

const FlexColDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const BigImage = styled(motion.img)`
  width: auto;
  height: 420px;

  margin-top: 24px;
  border-radius: 12px;
`;

const P = styled(motion.p)`
  width: 100%;

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;

  color: ${colors.basic.textgrey};
`;
