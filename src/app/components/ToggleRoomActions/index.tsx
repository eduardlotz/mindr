/**
 *
 * ToggleRoomActions
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { SecondaryButton } from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { media } from 'styles/media';
import { useLobbySlice } from 'app/pages/Lobby/slice';
import { selectIsCreator } from 'app/pages/Lobby/slice/selectors';

interface Props {}

export function ToggleRoomActions(props: Props) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { actions: lobbyActions } = useLobbySlice();

  const isCreator = useSelector(selectIsCreator);

  //toggles isCreator:boolean
  const handleClick = () => {
    dispatch(lobbyActions.setIsCreator(!isCreator));
  };

  return (
    <ToggleButton onClick={handleClick}>
      {isCreator ? t('home.joinroom') : t('home.createroom')}
    </ToggleButton>
  );
}

const ToggleButton = styled(SecondaryButton)`
  padding: 8px 14px;
  margin: 0;

  min-width: fit-content;
  height: auto;
  font-weight: 600;

  font-size: 14px;

  ${media.small`
    margin: 0 0 0 24px;
    width: auto;
    padding: 4px 8px;
  `}

  ${media.small`
    padding: 8px 12px;
  `}
`;
