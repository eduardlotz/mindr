/**
 *
 * RoomUserList
 *
 */
import { selectUsersInRoom } from 'app/pages/Lobby/slice/selectors';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { variants } from 'styles/variants';
import Icon from '../Icon';

interface Props {}

export function RoomUserList(props: Props) {
  const { t } = useTranslation();
  const usersInRoom = useSelector(selectUsersInRoom);


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
        {usersInRoom.map(user => {
          return (
            <AnimatePresence>
              <JoinedUser
                variants={variants.slideUp}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <UserAvatar src={user.avatar} />
                {user.isCreator && (
                  <Icon
                    name="star"
                    height="24"
                    width="24"
                    style={{ marginRight: '8px' }}
                  />
                )}
                <Username>{user.name}</Username>
              </JoinedUser>
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

const UserAvatar = styled.img`
  position: relative;

  width: 48px;
  height: 48px;

  margin-right: 8px;

  border-radius: 50%;
  object-fit: contain;
  background-size: 100% 100%;
`;


const Username = styled.span`
  font-family: 'Basier';
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 23px;
  text-align: left;

  color: ${props => props.theme.mainContrastText};
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 16px;

  ${media.medium`
     grid-template-columns: repeat(4, 1fr);
     grid-column-gap: 24px;
     grid-row-gap: 24px;
   `}
`;

const JoinedUser = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0;
  align-items: center;
  justify-content: flex-start;
`;