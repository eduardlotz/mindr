import { motion } from 'framer-motion';
import styled from 'styled-components/macro';

export const H1 = styled(motion.h1)`
  width: 100%;
  margin: 0 0 8px 0;

  font-family: HK Grotesk, sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 38px;
  line-height: 50px;

  color: #111111;
`;

export const H2 = styled(motion.h2)`
  margin: 0 0 16px 0;
  font-family: HK Grotesk;
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 42px;

  color: #111111;

  &.margin-clear {
    margin: 0;
  }
`;

export const H5 = styled(motion.h5)`
  margin: 0;

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;

  color: #111111;
`;