/**
 *
 * Homepage
 *
 */
import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { H2 } from 'app/components/styled/Headers';
import { LinkButton, SecondaryButton } from 'app/components/Button';
import { JoinGroup } from 'app/components/JoinGroup';

import { selectUserAvatar, selectUsername } from '../Lobby/slice/selectors';
import avatars from 'assets/avatars/avatars';
import { useLobbySlice } from '../Lobby/slice';
import { useHomepageSlice } from '../Homepage/slice';

import undefinedAvatar from '../../../assets/avatars/avatar-undefined.jpg';
import { variants } from 'styles/variants';

import { modalActions } from 'app/components/MotionModal/slice';
import { media } from 'styles/media';

import { SocketContext } from 'app/socketContext';
import { useHistory } from 'react-router';
import { Navbar } from 'app/components/Navbar/Loadable';
import { selectUsernameError, selectAvatarError } from './slice/selectors';

export function Homepage({ match }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  // used to dispatch socket actions
  const socket = useContext(SocketContext);

  const history = useHistory();

  // Use the slice we created
  const { actions: lobbyActions } = useLobbySlice();
  const { actions: homeActions } = useHomepageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const name = useSelector(selectUsername);
  const avatar = useSelector(selectUserAvatar);

  const nameError = useSelector(selectUsernameError);
  const avatarError = useSelector(selectAvatarError);

  //Checks to see if there's a user already present

  useEffect(() => {
    socket.on('users', users => {
      dispatch(lobbyActions.setUsersInRoom(users));
    });
  });

  useEffect(() => {
    socket.on('joined_room', (room: string) => {
      dispatch(lobbyActions.setGroupCode(room));
    });
  });

  useEffect(() => {
    socket.on('pick_game', (id: number) => {
      dispatch(homeActions.enableGame(id));
    });
  });

  useEffect(() => {
    socket.on('remove_game', (id: number) => {
      console.log(`deactivate game with id: ${id}`);
      dispatch(homeActions.disableGame(id));
    });
  });

  // type needs to be declared in order to work with typescript
  const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(lobbyActions.setUsername(e.target.value));
    dispatch(homeActions.setUsernameErrorHidden(true));
  };

  const setAvatar = url => {
    dispatch(lobbyActions.setAvatarUrl(url));
    dispatch(homeActions.setAvatarErrorHidden(true));
  };

  const openLinkInfoModal = () => {
    dispatch(modalActions.setModalTitle(t('home.wherecode')));
    dispatch(modalActions.setModalOpen(true));
  };

  //Emits the login event and if successful redirects to chat and saves user data
  const handleCreateRoom = () => {
    socket.emit('create_room', { name, avatar }, errors => {
      if (errors) {
        for (let error of errors) {
          if (error.type === 'username') {
            dispatch(homeActions.setUsernameError(t('error.' + error.message)));
          }
          if (error.type === 'room') {
            dispatch(homeActions.setRoomError(t('error.' + error.message)));
          }
          if (error.type === 'avatar') {
            dispatch(homeActions.setAvatarError(t('error.' + error.message)));
          }
        }
        return;
      }

      dispatch(lobbyActions.setJoinedGroup(true));
      dispatch(lobbyActions.setIsCreator(true));
      history.push('/lobby');
    });
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
            <BigAvatar src={avatar} />
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
            <SecondaryButton onClick={handleCreateRoom}>
              {t('home.creategroup')}
            </SecondaryButton>
          </div>
        </ContentBlock>
      </StartGameContainer>
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
  transition-property: border;

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

const StartGameContainer = styled(motion.div)`
  width: 100%;

  margin: 0;
  align-items: flex-start;

  padding: 0;
  display: flex;
  flex-direction: column;

  justify-content: center;
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
