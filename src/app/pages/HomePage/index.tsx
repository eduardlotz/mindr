/**
 *
 * Homepage
 *
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHomepageSlice } from './slice';
import { selectModal, selectModalContent } from './slice/selectors';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { Logo } from 'app/components/Logo';
import Icon from 'app/components/Icon';

const gameModes = [
  {
    title: 'Quiz',
    imageClass: 'quiz',
    rules: 'How to play Quiz',
  },
  {
    title: 'Draw & Guess',
    imageClass: 'draw-and-guess',
    rules: 'How to play Draw & Guess',
  },
  {
    title: 'Most likely',
    imageClass: 'most-likely',
    rules: 'How to play Most Likely',
  },
  {
    title: 'Best artist',
    imageClass: 'best-artist',
    rules: 'How to play Best artist',
  },
  {
    title: 'Survey',
    imageClass: 'survey',
    rules: 'How to play Survey',
  },
  {
    title: 'Who knows you',
    imageClass: 'who-knows-you',
    rules: 'How to play Who knows you',
  },
];

Modal.setAppElement('#root');

interface Props {}

export function Homepage(props: Props) {
  const variants = {
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        delay: 0.5 + i * 0.1,
      },
    }),
    hidden: { opacity: 0, scale: 0.9 },
  };

  const textBlockVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
    hidden: { opacity: 0, scale: 0.9, transition: { when: 'afterChildren' } },
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  // Use the slice we created
  const { actions } = useHomepageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  // `selectors` are used to read the state. Explained in other chapter
  // Will be inferred as `string` type ✅
  const modalIsOpen = useSelector(selectModal);
  const modalContent = useSelector(selectModalContent);

  const closeModal = () => {
    // Trigger the action to change the state. It accepts `string` as we declared in `slice.ts`. Fully type-safe ✅
    dispatch(actions.showModal(false));
  };

  const setModalContent = content => {
    dispatch(actions.setModalContent(content));
    dispatch(actions.showModal(true));
  };

  return (
    <div className="main-container">
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>{modalContent.name}</h2>
        <i className={`image ${modalContent.imageClass}`} />

        <button className="modal-close" onClick={closeModal}>
          close
        </button>
        <div>{modalContent.rules}</div>
      </Modal>
      <InfoContainer>
        <Logo size={64} color={'#4A8CEF'} />
        <ContentBlock
          initial="hidden"
          animate="visible"
          variants={textBlockVariants}
          className="content-block"
        >
          <H1>What is mindr?</H1>
          <P>
            Mindr is a mix of several <Bold>party & casual</Bold> games you can
            play <Bold>online with your friends.</Bold> You can enable and
            disable each game mode according to your needs and pick between the{' '}
            <Bold>standard or drinking mode.</Bold>
          </P>
        </ContentBlock>
        <ContentBlock>
          <H1>What games can we play?</H1>
          <Small>Click on a game mode to see how to play.</Small>
          <HowToContainer>
            {gameModes.map((mode, i) => {
              return (
                <AnimatePresence>
                  <GameModeTab
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                    className="game-mode-tab"
                    onClick={() => setModalContent(mode)}
                  >
                    <Icon name={mode.imageClass} width="128" height="128" />
                    <H5>{mode.title}</H5>
                  </GameModeTab>
                </AnimatePresence>
              );
            })}
          </HowToContainer>
        </ContentBlock>
      </InfoContainer>
      <StartGameContainer>
        <ContentBlock>
          <InlineBlock>
            <H2>Want to join your friends?</H2>
            <A href="#">Where is the code?</A>
          </InlineBlock>
          <Form>
            <GroupCode placeholder="----" />
            <PrimaryButton type="submit">
              Join group
              <Icon
                name="circle-arrow-right"
                fill="white"
                height="24"
                width="24"
                style={{ marginLeft: '16px' }}
              />
            </PrimaryButton>
          </Form>
        </ContentBlock>
        <ContentBlock>
          <div className="create-group">
            <H2>You're the first one here?</H2>
            <SecondaryButton>Create a new group</SecondaryButton>
          </div>
        </ContentBlock>
      </StartGameContainer>
    </div>
  );
}

const InfoContainer = styled.div`
  width: 50%;
  max-width: 50%;
  margin: 0;
  height: 100%;
  align-items: flex-start;
  padding: 32px 6rem 32px 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const StartGameContainer = styled.div`
  width: 50%;
  max-width: 50%;
  margin: 0;
  height: 100%;
  align-items: flex-start;
  position: fixed;
  top: 0;
  right: 0;
  padding: 32px 6rem 32px 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f6f9fe;

  justify-content: center;
`;

const HowToContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  margin: 16px 0 40px 0;
`;

const H1 = styled.h1`
  width: 100%;
  margin: 32px 0 8px 0;

  font-family: HK Grotesk, sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 38px;
  line-height: 50px;

  color: #111111;
`;

const H2 = styled.h2`
  font-family: HK Grotesk;
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 42px;

  color: #111111;
`;

const H5 = styled.h5`
  font-family: HK Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;

  color: #111111;
`;

const P = styled.p`
  width: 100%;

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;

  color: $grey;
`;

const A = styled.a`
  font-family: HK Grotesk;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;

  text-decoration-line: underline;

  color: #4a8cef;
`;

const Bold = styled.span`
  font-weight: bold;
  color: $black;
`;

const Small = styled.small`
  display: flex;
  align-items: center;

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;

  color: #979797;
`;

const ContentBlock = styled(motion.div)`
  width: 100%;
  &:first-child {
    margin-bottom: 180px;
  }
`;

const InlineBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
`;

const GroupCode = styled.input`
  padding: 16px 24px;

  width: 86px;
  height: 58px;
  left: 996px;
  top: 270px;

  margin-right: 16px;

  background: transparent;
  border: 2px solid #9fbbf2;
  border-radius: 16px;
  color: #6599e8;

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 56px;
  width: 100%;
  padding: 16px 72px;
  border-radius: 16px;
  border: none;
  color: #ffffff;
  background: #4a8cef;

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
`;

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 56px;
  width: 100%;
  padding: 16px 72px;
  border-radius: 16px;

  background: rgba(159, 187, 242, 0.2);
  border: 2px solid #9fbbf2;
  color: #6599e8;

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
`;

const GameModeTab = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 32px;
  height: 194px;

  background: #ffffff;
  border: 2px solid #f4f5f7;
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.25s ease-out;

  &:hover {
    border-color: #111111;
  }
`;
