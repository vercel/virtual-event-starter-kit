import { global as designSystemGlobal, loadFontsForStorybook } from '@storybook/design-system';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { ConfDataContext } from '../lib/hooks/use-conf-data';

// Initialize MSW
initialize();

const { GlobalStyle: StorybookDSGlobalStyle } = designSystemGlobal;

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#fff' },
      { name: 'dark', value: '#171C23' }
    ]
  },
  viewport: {
    viewports: {
      smallMobile: {
        name: 'Mobile (Small)',
        styles: {
          width: '320px',
          height: '100%'
        }
      },
      mobile: {
        name: 'Mobile',
        styles: {
          width: '440px',
          height: '100%'
        }
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '600px',
          height: '100%'
        }
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '900px',
          height: '100%'
        }
      },
      desktopXL: {
        name: 'DesktopXL',
        styles: {
          width: '1200px',
          height: '100%'
        }
      }
    }
  }
};

const withGlobalStyle = storyFn => (
  <>
    <StorybookDSGlobalStyle />
    {storyFn()}
  </>
);

const MockConfData = storyFn => (
  <ConfDataContext.Provider
    value={{
      userData: {
        id: undefined,
        ticketNumber: undefined,
        name: undefined,
        username: undefined
      },
      setUserData: () => {},
      setPageState: () => {}
    }}
  >
    {storyFn()}
  </ConfDataContext.Provider>
);

export const decorators = [withGlobalStyle, mswDecorator, MockConfData];

loadFontsForStorybook();
