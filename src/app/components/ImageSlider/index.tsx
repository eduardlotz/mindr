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

const xOffset = 100;
const variants = {
  enter: direction => ({
    x: direction > 0 ? xOffset : -xOffset,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.2 },
  },
  exit: direction => ({
    x: direction > 0 ? -xOffset : xOffset,
    opacity: 0,
  }),
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const ImageSlider = ({ images }) => {
  console.log('images', images);
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <SliderButton className="prev" onClick={() => paginate(-1)}>
          <Icon name="arrow-left" width="24" />
        </SliderButton>

        <SliderButton className="next" onClick={() => paginate(1)}>
          <Icon name="arrow-right" width="24" />
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
  }
`;
