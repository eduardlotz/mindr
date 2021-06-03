/**
 *
 * LeaveRoomBtn
 *
 */
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import { motion } from 'framer-motion';
import { variants } from 'styles/variants';
import { media } from 'styles/media';
import { SocketContext } from 'app/socketContext';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { selectGroupCode } from 'app/pages/Lobby/slice/selectors';

export const LeaveRoomBtn = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const history = useHistory();
  const room = useSelector(selectGroupCode);
  const socket = useContext(SocketContext);

  const leaveRoom = () => {
    socket.open();
    socket.emit('leaveRoom', { roomName: room }, res => {
      if (res.statusCode === 200) {
        history.push('/');
      }
      console.log(res);
    });
  };

  return (
    <ButtonBody
      variants={variants.iconButtonVariants}
      whileHover="hover"
      whileTap="pressed"
      initial="rest"
      type="button"
      onClick={leaveRoom}
    >
      <Icon name="circle-arrow-left" width="16" />
      <ButtonText>{t('room.leaveRoom')}</ButtonText>
    </ButtonBody>
  );
};

const ButtonBody = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: 8px;
  background: ${props => props.theme.mainBg};
  border: none;
  box-shadow: none;
  border-radius: 16px;

  color: ${props => props.theme.containerSubtleText};

  transition: 0.25s ease-out;
  transition-property: color;

  ${media.medium`
    padding: 8px 12px;
  `}

  &:hover {
    color: ${props => props.theme.containerContrast};
    background: ${props => props.theme.container};
    cursor: pointer;
  }

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

const ButtonText = styled.span`
  display: none;

  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;

  ${media.medium`
    display: flex;
    margin-left: 8px;
  `}
`;
