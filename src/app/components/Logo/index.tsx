/**
 *
 * Logo
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import lightTheme from 'styles/lightTheme';
import { media } from 'styles/media';

interface Props {
  size?: number;
  color?: string;
  iconOnly?: boolean;
}

export const Logo = (props: Props) => {
  return (
    <Span>
      <svg
        width={props.size ? props.size : 140}
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          rx="9.41131"
          ry="10.5591"
          transform="matrix(0.988302 0.145397 -0.140706 0.991089 39.1546 40.7777)"
          fill={props.color ? props.color : lightTheme.primary}
        />
        <ellipse
          rx="9.41102"
          ry="10.5594"
          transform="matrix(0.987047 0.154189 -0.149206 0.989769 100.942 46.0195)"
          fill={props.color ? props.color : lightTheme.primary}
        />
        <path
          d="M36.9404 96.2808C35.2006 111.508 57.5132 124.984 83.9475 114.183"
          stroke={props.color ? props.color : lightTheme.primary}
          strokeWidth="8"
        />
        <path
          d="M68.7054 57.3853C67.21 69.7828 72.1245 80.2847 72.1245 80.2847C72.1245 80.2847 68.4389 85.2174 59.9535 82.359"
          stroke={props.color ? props.color : lightTheme.primary}
          strokeWidth="8"
        />
      </svg>

      {props.iconOnly ? (
        <></>
      ) : (
        <Text
          style={{
            color: props.color,
          }}
        >
          mindr
        </Text>
      )}
    </Span>
  );
};

const Span = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 40px;
  }

  ${media.medium`
    & > svg {
      width: 52px;
    }
  `}
`;

const Text = styled.span`
  font-family: 'Basier';
  font-style: normal;
  font-weight: 600;
  line-height: 34px;
  font-size: 18px;
  margin-top: -6px;

  ${media.medium`
    margin-top: -4px;
    font-size: 25px;
  `}
`;
