/**
 *
 * Homepage
 *
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { H2 } from 'app/components/styled/Headers';
import { colors } from 'styles/colors';
import { LinkButton, SecondaryButton } from 'app/components/Button';
import { JoinGroup } from 'app/components/JoinGroup';

import groupCodeImage from '../../../assets/groupcode-help.jpg';
import { selectUserAvatar, selectUsername } from '../Lobby/slice/selectors';
import avatars from 'assets/avatars/avatars';
import { useLobbySlice } from '../Lobby/slice';

import undefinedAvatar from '../../../assets/avatars/avatar-undefined.jpg';
import { variants } from 'styles/variants';

import { modalActions } from 'app/components/MotionModal/slice';
import { disconnectSocket, initiateSocket } from 'app/socketConnection';
import { media } from 'styles/media';

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

export function Homepage({ match }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  // Use the slice we created
  const { actions: lobbyActions } = useLobbySlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const username = useSelector(selectUsername);
  const selectedAvatar = useSelector(selectUserAvatar);

  // type needs to be declared in order to work with typescript
  const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(lobbyActions.setUsername(e.target.value));
  };

  const setAvatar = url => {
    dispatch(lobbyActions.setAvatarUrl(url));
  };

  const openLinkInfoModal = () => {
    dispatch(modalActions.setModalContent(groupCodeContent.content));
    dispatch(modalActions.setModalTitle(groupCodeContent.title));
    dispatch(modalActions.setModalOpen(true));
  };

  useEffect(() => {
    initiateSocket('test room');
    return () => {
      disconnectSocket();
    };
  }, []);

  const popUpVariants = {
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.5,
        stiffness: 70,
        delay: i * 0.02,
      },
    }),
    hidden: { opacity: 0, scale: 0.9 },
    onHover: {
      scale: 1.3,
      boxShadow: '0px 8px 20px rgba(51, 51, 51, 0.116)',
      transition: {
        ease: 'easeInOut',
        duration: 0.2,
        delay: 0,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.75,
        stiffness: 40,
      },
    },
  };

  return (
    <>
      <UserCreationContainer
        variants={variants.container}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <UserContainer
          variants={variants.slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <FlexColDiv>
            <H2>{t('home.pickusername')}</H2>
            <UsernameInput
              placeholder={t('home.yourname')}
              value={username}
              onChange={setUsername}
              maxLength={20}
            />
          </FlexColDiv>
          {selectedAvatar ? (
            <BigAvatar src={selectedAvatar} />
          ) : (
            <BigAvatar src={undefinedAvatar} />
          )}
        </UserContainer>
        <AvatarSelectionContainer
          variants={variants.slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {avatars.map((avatar, i) => {
            return (
              <AvatarImg
                src={avatar}
                variants={popUpVariants}
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                onClick={() => setAvatar(avatar)}
                className={selectedAvatar === avatar ? 'selected' : ''}
              />
            );
          })}
        </AvatarSelectionContainer>
      </UserCreationContainer>

      {/* Bottom Panel for joining or creating a group */}
      <StartGameContainer
        variants={variants.slideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ContentBlock
          variants={variants.slideUpItem}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <InlineBlock>
            <H2 className="margin-clear">{t('home.joingroupheader')}</H2>
            <LinkButton onClick={openLinkInfoModal}>
              {t('home.wherecode')}
            </LinkButton>
          </InlineBlock>
          <JoinGroup />
        </ContentBlock>
        <ContentBlock
          variants={variants.slideUpItem}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="create-group">
            <H2>{t('home.creategroupheader')}</H2>
            <SecondaryButton>{t('home.creategroup')}</SecondaryButton>
          </div>
        </ContentBlock>
      </StartGameContainer>
    </>
  );
}

const UserCreationContainer = styled(motion.div)``;

const UsernameInput = styled.input`
  height: 58px;
  width: 100%;

  padding: 16px 24px;
  margin-right: 16px;

  background: transparent;
  border: 2px solid ${colors.basic.lightgrey};
  border-radius: 16px;
  color: ${colors.basic.almostblack};

  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  text-align: left;
  letter-spacing: 0.4px;

  transition: border-color 0.25s ease-out;

  &:focus,
  &:hover {
    outline: none;
    border-color: ${colors.input.borderFocus};
  }

  &::placeholder {
    color: #b6b6b6;
  }
`;

const BigAvatar = styled(motion.img)`
  height: 100%;
  width: 116px;
  margin: 24px 0;

  ${media.medium`
    margin: 0;
  `}
`;

const UserContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${media.medium`
    margin-bottom: 16px;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
  `}
`;

const AvatarSelectionContainer = styled(motion.div)`
  display: grid;
  max-width: 100%;
  width: 100%;
  overflow-x: scroll;

  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto 1fr;
  grid-gap: 24px 24px;

  padding: 24px;
  margin-bottom: 40px;

  background-color: ${colors.basic.lightblue};
  border-radius: 16px;

  ${media.medium`
    grid-gap: 32px 48px;
    padding: 32px 40px;
  `}
`;

const AvatarImg = styled(motion.img)`
  position: relative;

  width: 64px;
  height: 64px;

  border-radius: 50%;
  object-fit: contain;
  background-size: 100% 100%;

  cursor: pointer;
  ${media.medium`
    width: 48px;
    height: 48px;
  `}

  &.selected {
    box-shadow: 0px 8px 16px 0px rgba(12, 72, 163, 0.12);
    opacity: 0.8;
  }
`;

const FlexColDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${media.medium`
    width: 80%;
  `}
`;

const BigImage = styled(motion.img)`
  width: auto;
  height: 420px;

  margin-top: 24px;
  border-radius: 12px;
`;

const StartGameContainer = styled(motion.div)`
  width: 100%;

  margin: 0;
  align-items: flex-start;

  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: ${colors.basic.white};

  justify-content: center;
`;

const P = styled(motion.p)`
  width: 100%;

  font-family: 'Basier';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;

  color: ${colors.basic.textgrey};
`;

const ContentBlock = styled(motion.div)`
  width: 100%;
  &:first-child {
    margin-bottom: 40px;
  }
`;

const InlineBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  ${media.medium`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  `}
`;
