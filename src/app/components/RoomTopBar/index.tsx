/**
 *
 * RoomTopBar
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { motion } from 'framer-motion';
import { LeaveRoomBtn } from '../LeaveRoomBtn';
import { selectGroupCode } from 'app/pages/Lobby/slice/selectors';
import { useSelector } from 'react-redux';
import { Highlighted } from '../styled/Headers';
import ReactTooltip from 'react-tooltip';

export function RoomTopBar() {
  const { t } = useTranslation();
  const room = useSelector(selectGroupCode);

  return (
    <Wrapper>
      <ReactTooltip />

      <FlexGrowWrapper>
        <LeaveRoomBtn />
      </FlexGrowWrapper>
      <RoomInfo>
        {t('room.accessCode')}
        <Highlighted style={{ marginLeft: '8px' }}>{room}</Highlighted>
      </RoomInfo>
      <FlexGrowEndWrapper>
        <ThemeSwitcher />
      </FlexGrowEndWrapper>
    </Wrapper>
  );
}

const FlexGrowEndWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1 1 100%;
`;

const FlexGrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1 1 100%;
`;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 0;
  margin-bottom: 24px;
`;

const RoomInfo = styled.span`
  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  align-items: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  flex: 1 1 100%;

  color: ${props => props.theme.mainContrastText};
`;
