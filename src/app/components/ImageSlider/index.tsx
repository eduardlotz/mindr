/**
 *
 * ImageSlider
 *
 */
import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import styled from 'styled-components';
import Icon from '../Icon';

const xOffset = 5;
const variants = {
  enter: direction => ({
    x: direction > 0 ? xOffset : -xOffset,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: direction => ({
    x: direction > 0 ? -xOffset : xOffset,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const ImageSlider = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <SliderButton className="prev" onClick={() => paginate(-1)}>
          <Icon name="circle-arrow-left" width="24" />
        </SliderButton>

        <SliderButton className="next" onClick={() => paginate(1)}>
          <Icon name="circle-arrow-right" width="24" />
        </SliderButton>
        <Image
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
    </>
  );
};

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  padding: 0;
  margin: auto 0 0 0;
  object-fit: contain;
`;

const SliderButton = styled.span`
  border-radius: 12px;
  background-color: ${props => props.theme.mainBg};
  color: ${props => props.theme.mainContrastText};
  padding: 8px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5000;
  opacity: 0.5;
  transition: opacity 0.25s ease-in;

  &.prev {
    left: 16px;
    right: auto;
  }

  &.next {
    right: 16px;
    left: auto;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;
