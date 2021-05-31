/**
 *
 * LoadingAvatars
 *
 */
import { motion } from 'framer-motion';
import * as React from 'react';
import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { variants } from 'styles/variants';

interface Props {
  length: number;
}

export function LoadingAvatars(props: Props) {
  const getNumberOfAvatars = length => {
    let elements: number[] = [];

    for (var i = 0; i < length; i++) {
      elements.push(i);
    }

    return elements;
  };

  const elements = getNumberOfAvatars(props.length);

  return (
    <Wrapper>
      {elements.map((el, i) => (
        <Avatar
          variants={variants.slideUpItem}
          key={i}
          initial="hidden"
          animate="visible"
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  max-width: 100%;
  width: 100%;
  overflow-x: scroll;

  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto 1fr;
  grid-gap: 24px 24px;

  padding: 24px;
  margin-bottom: 8px;

  border-radius: 16px;

  transition: 0.25s ease-out;
  transition-property: background-color;

  ${media.medium`
    grid-gap: 32px 48px;
    padding: 32px 40px;
    overflow: auto;
  `}
`;

const Avatar = styled(motion.div)`
  width: 64px;
  height: 64px;

  border-radius: 50%;
  background-color: ${props => props.theme.container};

  ${media.medium`
    width: 48px;
    height: 48px;
  `}
`;
