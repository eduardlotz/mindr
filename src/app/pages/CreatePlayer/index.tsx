/**
 *
 * CreatePlayer
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { motion } from 'framer-motion';
import { colors } from 'styles/colors';
import avatars from '../../../assets/avatars/avatars';
import { PrimaryButton, SecondaryButton } from 'app/components/Button';
import Icon from 'app/components/Icon';
import { StickyBottomActions } from 'app/components/StickyBottomActions';
import { useLobbySlice } from '../Lobby/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAvatar, selectUsername } from '../Lobby/slice/selectors';
interface Props {}

export function CreatePlayer(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  // framer motion variants
  const containerFadeOutVariants = {
    hidden: {
      opacity: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.4,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        ease: 'easeOut',
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.4,
      },
    },
  };

  const containerSlideUpVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.75,
        stiffness: 40,
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.75,
        stiffness: 40,
      },
    },
  };

  const popUpVariants = {
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 10,
        mass: 0.75,
        stiffness: 40,
        delay: 0.4 + i * 0.02,
      },
    }),
    hidden: { opacity: 0, scale: 0.9 },
    onHover: {
      scale: 1.3,
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

  // redux store
  // Use the slice we created
  const { actions } = useLobbySlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  // `selectors` are used to read the state.
  const username = useSelector(selectUsername);
  const selectedAvatar = useSelector(selectUserAvatar);

  // type needs to be declared in order to work with typescript
  const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setUsername(e.target.value));
  };

  const setAvatar = url => {
    dispatch(actions.setAvatarUrl(url));
  };

  // render

  return (
    <MainContainer
      variants={containerFadeOutVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <UserContainer
        variants={containerSlideUpVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <UsernameInput
          placeholder="Your name"
          value={username}
          onChange={setUsername}
        />

        {selectedAvatar ? (
          <BigAvatar src={selectedAvatar} />
        ) : (
          <BigAvatarEmpty />
        )}
      </UserContainer>
      <AvatarSelectionContainer>
        {avatars.map((avatar, i) => {
          return (
            <AvatarImg
              src={avatar}
              variants={popUpVariants}
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="onHover"
              onClick={() => setAvatar(avatar)}
              className={selectedAvatar === avatar ? 'selected' : ''}
            />
          );
        })}
      </AvatarSelectionContainer>
      <StickyBottomActions />
    </MainContainer>
  );
}

// styled components

const MainContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const UsernameInput = styled.input`
  height: 56px;
  width: 100%;

  padding: 16px 24px;
  background: #ffffff;
  border: 2px solid #f4f5f7;
  border-radius: 16px;
  text-align: center;

  color: #000000;
  font-style: normal;
  font-weight: 800;
  font-size: 60px;

  transition: border 0.15s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: $accent-color;
  }

  background-color: transparent;
  border: none;

  &::placeholder {
    color: #e7e7e7;
  }
`;

const BigAvatar = styled.img`
  height: 100%;
  width: 116px;
  margin: 40px 0 0 0;
  background-color: ${props => props.theme.mainBg};
  border-radius: 50%;
`;

const BigAvatarEmpty = styled(motion.div)`
  height: 116px;
  width: 116px;
  margin: 40px 0 0 0;

  border-radius: 50%;

  background-color: ${props => props.theme.mainBg};
`;

const UserContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
  padding: 80px 0 0px 0;
`;

const AvatarSelectionContainer = styled(motion.div)`
  display: grid;

  grid-template-columns: repeat(6, 2fr);
  grid-template-rows: auto 1fr;
  grid-gap: 40px 80px;

  margin-bottom: 40px;
`;

const AvatarImg = styled(motion.img)`
  position: relative;

  width: 72px;
  height: 72px;

  border-radius: 50%;
  object-fit: contain;
  background-size: 100% 100%;

  &.selected {
    box-shadow: 0px 8px 16px 0px rgba(12, 72, 163, 0.12);
    transform: scale(1.3);
  }
`;
