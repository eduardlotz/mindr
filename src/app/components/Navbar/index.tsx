/**
 *
 * Navbar
 *
 */
import {
  selectUsername,
  selectUserAvatar,
  selectGroupCode,
  selectJoinedGroup,
} from 'app/pages/Lobby/slice/selectors';
import { motion } from 'framer-motion';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { colors } from 'styles/colors';
import { variants } from 'styles/variants';
import Icon from '../Icon';
import { Logo } from '../Logo';

interface Props {}

export function Navbar(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const username = useSelector(selectUsername);
  const avatar = useSelector(selectUserAvatar);
  const groupCode = useSelector(selectGroupCode);
  const joinedGroup = useSelector(selectJoinedGroup);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en');
  };

  return (
    <Container>
      {joinedGroup ? (
        <FlexRowDiv
          variants={variants.slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <UserAvatar src={avatar} />
          <Username>{username}</Username>
        </FlexRowDiv>
      ) : (
        <Link to="/">
          <MotionDiv
            variants={variants.popUp}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Logo color={colors.brand.blue} size={40} iconOnly={joinedGroup} />
          </MotionDiv>
        </Link>
      )}

      {joinedGroup && (
        <GroupCode
          variants={variants.popUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.3 }}
        >
          {groupCode}
        </GroupCode>
      )}
      <FlexRowDiv>
        <LanguageSwitcher
          onClick={toggleLanguage}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 1.3 }}
        >
          <Language className={i18n.language === 'de' ? 'is-active' : ''}>
            DE
          </Language>
          /
          <Language className={i18n.language === 'en' ? 'is-active' : ''}>
            EN
          </Language>
        </LanguageSwitcher>
        <Link to="/help">
          <MotionDiv
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 1.3 }}
          >
            <Icon
              name="circle-help"
              fill={colors.basic.lightgreyish}
              height="32"
              width="32"
            />
          </MotionDiv>
        </Link>
      </FlexRowDiv>
    </Container>
  );
}

const MotionDiv = styled(motion.div)``;

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
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;

  color: ${colors.basic.black};
`;

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 5000;

  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.95);
  width: calc(100% - 32px);
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
`;

const FlexRowDiv = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LanguageSwitcher = styled(motion.button)`
  display: flex;
  flex-direction: row;
  margin-right: 16px;
  border: none;
  background: transparent;

  font-family: 'Basier';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;

  cursor: pointer;

  color: ${colors.basic.lightgreyish};

  &:focus {
    border: none;
    outline: none;
  }
`;

const Language = styled.p`
  font-family: 'Basier';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;

  color: ${colors.basic.lightgreyish};

  &.is-active {
    color: ${colors.brand.blue};
  }

  &:first-child {
    margin: 0 4px 0 0;
  }

  &:last-child {
    margin: 0 0 0 4px;
  }
`;

const GroupCode = styled(motion.button)`
  padding: 8px 16px;
  border: 2px solid rgba(74, 140, 239, 0.2);
  border-radius: 16px;

  background: ${colors.basic.white};

  font-family: 'Basier';
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  letter-spacing: 8px;
  text-align: center;

  cursor: pointer;

  color: ${colors.brand.blue};
`;
