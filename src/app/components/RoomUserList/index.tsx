/**
 *
 * RoomUserList
 *
 */
import {
  selectGroupCode,
  selectIsCreator,
  selectUsersInRoom,
} from 'app/pages/Lobby/slice/selectors';
import { useContext, useEffect } from 'react';
import { SocketContext } from 'app/socketContext';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { variants } from 'styles/variants';
import Icon from '../Icon';
import { Button } from '../Button';
import { useLobbySlice } from 'app/pages/Lobby/slice';
import { SimpleTooltip } from '../SimpleToolTip';

interface Props {}

export function RoomUserList(props: Props) {
  const { t } = useTranslation();
  const usersInRoom = useSelector(selectUsersInRoom);
  const isCreator = useSelector(selectIsCreator);
  const room = useSelector(selectGroupCode);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const { actions: lobbyActions } = useLobbySlice();

  const removeUserFromRoom = user => {
    socket.open();
    socket.emit('removeUser', { id: user.uuid, room }, res => {
      if (res.statusCode === 400) {
        console.log(res);
      }
    });
  };

  useEffect(() => {
    socket.on('roomData', room => {
      console.log('socket received users in room', room.users);
      dispatch(lobbyActions.setUsersInRoom(room.users));
      dispatch(lobbyActions.setJoinedGroup(true));
    });
    return () => {
      socket.open();
      socket.emit('leaveRoom', { roomName: room }, res => {
        console.log(res);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, lobbyActions, socket]);

  return (
    <ContentBlock
      variants={variants.slideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <InlineBlock style={{ margin: 0 }}>
        <InfoLine>{t('room.min-user-info')}</InfoLine>
        <UsersCounter>
          <UsersCount>{usersInRoom.length}</UsersCount>
          <MaxUsersCount>/10</MaxUsersCount>
        </UsersCounter>
      </InlineBlock>
      <UsersList>
        {usersInRoom.map((user, i) => {
          return (
            <AnimatePresence key={'user_' + i}>
              <AnimateSharedLayout>
                <JoinedUser
                  variants={variants.slideUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  style={{ zIndex: i }}
                >
                  <UserAvatarWrapper
                    initial="hidden"
                    whileHover="visible"
                    animate="exit"
                    exit="exit"
                  >
                    <UserAvatar src={user.avatar} />
                    <SimpleTooltip text={user.name} />
                  </UserAvatarWrapper>
                  {/* {user.isCreator && (
                    <Icon
                      name="star"
                      height="24"
                      width="24"
                      style={{ marginRight: '8px' }}
                    />
                  )} */}
                  <Username
                    variants={variants.popUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    {user.name}
                  </Username>
                  {/* {isCreator && (
                    <DeleteButton onClick={() => removeUserFromRoom(user)}>
                      <Icon name="delete" width="24" height="24" />
                    </DeleteButton>
                  )} */}
                </JoinedUser>
              </AnimateSharedLayout>
            </AnimatePresence>
          );
        })}
      </UsersList>
    </ContentBlock>
  );
}

const ContentBlock = styled(motion.div)`
  width: 100%;
  margin-bottom: 40px;
`;

const UserAvatarWrapper = styled(motion.div)`
  display: flex;
  padding: 0;
  background-color: transparent;
  margin-right: 8px;

  position: relative;
`;

const UserAvatar = styled.img`
  position: relative;

  width: 48px;
  height: 48px;

  border-radius: 50%;
  object-fit: contain;
  background-size: 100% 100%;
`;

const Username = styled(motion.span)`
  display: none;
  width: auto;
  min-width: fit-content;

  font-family: 'Basier';
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 19px;
  text-align: left;

  color: ${props => props.theme.mainContrastText};
  margin: 0 8px 0 0;
`;

const InfoLine = styled.p`
  font-family: 'Basier';
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 21px;
  text-align: left;
  margin: 0 0 16px 0;

  color: ${props => props.theme.mainSubtleText};
`;

const InlineBlock = styled(motion.div)`
  width: 100%;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const UsersCounter = styled(motion.span)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const UsersCount = styled(motion.span)`
  font-family: 'Basier';
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: 42px;
  text-align: center;
  margin: 0 8px 0 0;

  color: ${props => props.theme.mainContrastText};
`;

const MaxUsersCount = styled(motion.span)`
  font-family: 'Basier';
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 21px;
  text-align: center;
  letter-spacing: 1px;
  opacity: 0.3;

  color: ${props => props.theme.primaryLight};
`;

const UsersList = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const JoinedUser = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: auto;
  min-width: fit-content;
  padding: 4px;
  border-radius: 30px;
  align-items: center;
  justify-content: flex-start;

  background-color: ${props => props.theme.mainBg};

  transition: 0.25s ease-out;
  transition-property: background-color margin padding;

  &:hover {
    margin-right: 8px;
    margin-left: 8px;
  }
`;
