import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { rest } from 'msw';
import { ConfDataContext } from '@lib/hooks/use-conf-data';
import Form from './form';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    storyFn => (
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
        <div style={{ width: 500 }}>{storyFn()}</div>
      </ConfDataContext.Provider>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

export const Success: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    msw: {
      handlers: [
        rest.post('/api/register', (req, res, ctx) => {
          return res(
            ctx.json({
              id: '746b488c059239a5de404bc598b6864d2a301e2d',
              email: 'example-email@email.com',
              ticketNumber: 1234,
              createdAt: new Date().toISOString().toLocaleString(),
              name: 'Example Name',
              username: 'example-username'
            })
          );
        })
      ]
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText('Your email address', { selector: 'input' });
    await userEvent.type(emailInput, 'example-email@email.com', { delay: 100 });

    const submitButton = canvas.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => expect(submitButton).toBeDisabled());
  }
};

export const Error: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    msw: {
      handlers: [
        rest.post('/api/register', (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              error: {
                code: 'bad_email',
                message: 'Invalid email'
              }
            })
          );
        })
      ]
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText('Your email address', { selector: 'input' });
    await userEvent.type(emailInput, 'example-email@email.com', { delay: 100 });

    const submitButton = canvas.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => expect(canvas.getByText('Try Again')).toBeVisible());
  }
};

export const TryAgain: Story = {
  ...Error,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByLabelText('Your email address', { selector: 'input' });
    await userEvent.type(emailInput, 'example-email@email.com', { delay: 100 });

    const submitButton = canvas.getByRole('button');
    userEvent.click(submitButton);

    await new Promise(r => setTimeout(r, 1000));

    const TryAgainButton = await canvas.findByText('Try Again');
    userEvent.click(TryAgainButton);
  }
};
