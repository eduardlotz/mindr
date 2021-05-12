/**
 *
 * Homepage
 *
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { H2 } from 'app/components/styled/Headers';
import { selectUserAvatar, selectUsername } from '../Lobby/slice/selectors';
import avatars from 'assets/avatars/avatars';
import { useLobbySlice } from '../Lobby/slice';
import { useHomepageSlice } from '../Homepage/slice';
import undefinedAvatar from '../../../assets/avatars/avatar-undefined.jpg';
import { variants } from 'styles/variants';
import { media } from 'styles/media';
import { Navbar } from 'app/components/Navbar/Loadable';
import { selectUsernameError, selectAvatarError } from './slice/selectors';

import { CreateNewRoom } from 'app/components/CreateNewRoom';

export function Homepage({ match }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  // Use the slice we created
  const { actions: lobbyActions } = useLobbySlice();
  const { actions: homeActions } = useHomepageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const name = useSelector(selectUsername);
  const avatar = useSelector(selectUserAvatar);

  const nameError = useSelector(selectUsernameError);
  const avatarError = useSelector(selectAvatarError);

  // type needs to be declared in order to work with typescript
  const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(lobbyActions.setUsername(e.target.value));
    dispatch(homeActions.setUsernameErrorHidden(true));
  };

  const setAvatar = url => {
    dispatch(lobbyActions.setAvatarUrl(url));
    dispatch(homeActions.setAvatarErrorHidden(true));
  };

  // staggered pop up animation for avatars
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
      scale: 1.1,
      transition: {
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
      <Navbar />
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
              value={name}
              onChange={setUsername}
              maxLength={20}
              className={nameError.isHidden ? '' : 'has-error'}
            />
            {!nameError.isHidden && (
              <InputError>{nameError.message}</InputError>
            )}
          </FlexColDiv>
          {avatar ? (
            <BigAvatar
              src={avatar}
              drag
              dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              dragElastic={0.5}
            />
          ) : (
            <BigAvatar src={undefinedAvatar} />
          )}
        </UserContainer>
        <AvatarSelectionContainer
          variants={variants.slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={avatarError.isHidden ? '' : 'has-error'}
        >
          {avatars.map((entry, i) => {
            return (
              <AvatarImg
                src={entry}
                variants={popUpVariants}
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setAvatar(entry)}
                className={avatar === entry ? 'selected' : ''}
              />
            );
          })}
        </AvatarSelectionContainer>
        {!avatarError.isHidden && (
          <InputError>{avatarError.message}</InputError>
        )}
      </UserCreationContainer>

      <CreateNewRoom />
    </>
  );
}

const UserCreationContainer = styled(motion.div)`
  margin-bottom: 40px;
`;

const UsernameInput = styled.input`
  height: 58px;
  width: 100%;

  padding: 16px 24px;
  margin-right: 16px;

  background: transparent;
  border: 2px solid ${props => props.theme.lightgrey};
  border-radius: 16px;
  color: ${props => props.theme.mainContrastText};

  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  text-align: left;
  letter-spacing: 0.4px;

  transition: 0.25s ease-out;
  transition-property: border-color color;

  &:focus,
  &:hover {
    outline: none;
    border-color: ${props => props.theme.primary};
  }

  &::placeholder {
    color: ${props => props.theme.grey};
  }

  &.has-error {
    border-color: ${props => props.theme.error};
  }
`;

const InputError = styled(motion.small)`
  margin: 0;

  font-size: 14px;
  font-family: 'Basier';
  font-weight: normal;
  text-align: left;

  color: ${props => props.theme.error};
`;

const BigAvatar = styled(motion.img)`
  height: 100%;
  width: 116px;
  margin: 24px 0;
  background-color: transparent;
  border-radius: 50%;
  cursor: grab;
  z-index: 1000;

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
  margin-bottom: 8px;

  background: ${props => props.theme.container};
  border-radius: 16px;

  transition: 0.25s ease-out;
  transition-property: background-color;

  ${media.medium`
    grid-gap: 32px 48px;
    padding: 32px 40px;
    overflow: auto;
  `}

  &.has-error {
    border: 2px solid ${props => props.theme.error};
  }
`;

const AvatarImg = styled(motion.img)`
  position: relative;

  width: 64px;
  height: 64px;

  border-radius: 50%;
  object-fit: contain;
  background-size: 100% 100%;
  transition: 0.25s ease-out;
  transition-property: border-color;

  cursor: pointer;
  ${media.medium`
    width: 48px;
    height: 48px;
  `}

  &.selected {
    border: 3px solid ${props => props.theme.primary};
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
