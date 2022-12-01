import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { RegistrationForm } from './RegistrationForm';

const meta: Meta<typeof RegistrationForm> = {
  title: 'Components/RegistrationForm',
  component: RegistrationForm,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof RegistrationForm>;

export const Default: Story = {};

export const Success: Story = {
  parameters: {
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
