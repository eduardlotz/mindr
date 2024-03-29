/**
 *
 * StickyBottomActions
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { PrimaryButton, SecondaryButton } from '../Button';
import Icon from '../Icon';
import { motion } from 'framer-motion';

interface Props {}

export function StickyBottomActions(props: Props) {
  const { t } = useTranslation();

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

  return (
    <FloatingButtonGroup
      variants={containerSlideUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <SecondaryButton style={{ width: '40%', marginRight: '16px' }}>
        {t('home.goback')}
      </SecondaryButton>
      <PrimaryButton
        whileHover={{
          scale: 1.03,
        }}
        type="submit"
        style={{ width: '60%' }}
      >
        {t('home.joingroup')}
        <Icon
          name="circle-arrow-right"
          fill="white"
          height="24"
          width="24"
          style={{ marginLeft: '16px' }}
        />
      </PrimaryButton>
    </FloatingButtonGroup>
  );
}

const FloatingButtonGroup = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;

  width: calc(100% - 32px);
  max-width: 800px;
`;
