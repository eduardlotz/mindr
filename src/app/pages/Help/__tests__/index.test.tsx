import * as React from 'react';
import { render } from '@testing-library/react';

import { Help } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<Help  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Help />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
