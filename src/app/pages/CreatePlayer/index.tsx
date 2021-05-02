/**
 *
 * CreatePlayer
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import undefinedAvatar from '../../../assets/avatars/avatar-undefined.jpg';

import avatars from '../../../assets/avatars/avatars';
import { StickyBottomActions } from 'app/components/StickyBottomActions';
import { useLobbySlice } from '../Lobby/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAvatar, selectUsername } from '../Lobby/slice/selectors';
import { Navbar } from 'app/components/Navbar/Loadable';
import { H2 } from 'app/components/styled/Headers';
import { SocketContext } from 'app/socketContext';
import { media } from 'styles/media';
import { variants } from 'styles/variants';
import { useHomepageSlice } from '../Homepage/slice';
import {
  selectUsernameError,
  selectAvatarError,
} from '../Homepage/slice/selectors';
interface Props {}

export function CreatePlayer(props: Props) {
  const { t } = useTranslation();

  // framer motion variants

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

  // used to dispatch socket actions
  const socket = React.useContext(SocketContext);

  // Use the slice we created
  const { actions: lobbyActions } = useLobbySlice();
  const { actions: homeActions } = useHomepageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const name = useSelector(selectUsername);
  const avatar = useSelector(selectUserAvatar);

  const nameError = useSelector(selectUsernameError);
  const avatarError = useSelector(selectAvatarError);

  React.useEffect(() => {
    socket.on('users', users => {
      dispatch(lobbyActions.setUsersInRoom(users));
    });
  }, [dispatch, lobbyActions, socket]);

  React.useEffect(() => {
    socket.on('joined_room', (room: string) => {
      dispatch(lobbyActions.setGroupCode(room));
    });
  }, [dispatch, lobbyActions, socket]);

  // type needs to be declared in order to work with typescript
  const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(lobbyActions.setUsername(e.target.value));
    dispatch(homeActions.setUsernameErrorHidden(true));
  };

  const setAvatar = url => {
    dispatch(lobbyActions.setAvatarUrl(url));
    dispatch(homeActions.setAvatarErrorHidden(true));
  };

  // render

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
      <StickyBottomActions />
    </>
  );
}

// styled components
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

  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  justify-content: center;

  padding: 40px 20px;
  margin-bottom: 8px;

  background: ${props => props.theme.mainBg};
  border-radius: 16px;

  ${media.medium`
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 32px 48px;
    padding: 32px 40px;
  `}

  &.has-error {
    border: 2px solid ${props => props.theme.error};
  }
`;

const AvatarImg = styled(motion.img)`
  position: relative;
  justify-self: center;

  width: 100%;
  height: auto;

  border-radius: 50%;
  object-fit: contain;
  background-size: 100% 100%;
  transition: 0.25s ease-out;
  transition-property: border-color;

  cursor: pointer;

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
