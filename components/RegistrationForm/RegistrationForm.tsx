import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { styles } from '@storybook/components-marketing';
import { styled } from '@storybook/theming';
import { motion } from 'framer-motion';
import { Button } from '@storybook/design-system';
import useConfData from '@lib/hooks/use-conf-data';
import FormError from '@lib/form-error';
import useEmailQueryParam from '@lib/hooks/use-email-query-param';
import { register } from '@lib/user-api';
import { useCaptcha } from '../captcha';
import { FormUI } from './FormUI';

const { spacing, color, typography, background, breakpoints } = styles;

const Container = styled(motion.div)`
  position: relative;
`;

const ErrorAlert = styled.div`
  background: ${background.lightest};
  display: flex;
  border: 1px solid ${color.negative};
  border-radius: ${spacing.borderRadius.small}px;
  overflow: hidden;
  position: absolute;
  inset: 0;
  z-index: 5;

  flex-wrap: wrap;

  @media (min-width: ${breakpoints[1]}px) {
    flex-wrap: nowrap;
  }
`;
const ErrorMessage = styled.div`
  flex: 1 1 auto;
  background: ${color.lightest};
  color: ${color.negative};
  font-size: ${typography.size.s2}px;
  font-weight: ${typography.weight.bold};
  line-height: 20px;
  padding: 10px 15px;
  text-align: center;

  @media (min-width: ${breakpoints[1]}px) {
    text-align: left;
  }
`;

const RetryButton = styled(Button)`
  background: ${color.negative};
  color: ${color.lightest};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: ${spacing.borderRadius.small}px;
  border-bottom-right-radius: ${spacing.borderRadius.small}px;
  flex: none;
  width: 100%;

  @media (min-width: ${breakpoints[1]}px) {
    width: auto;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: ${spacing.borderRadius.small}px;
    border-bottom-right-radius: ${spacing.borderRadius.small}px;
  }

  &:hover {
    background: ${color.negative};
  }

  &:active {
    background: ${color.negative};
  }
`;

type FormState = 'default' | 'loading' | 'error';

type RegistrationFormProps = {
  sharePage?: boolean;
  disableAnimation?: boolean;
};

export const RegistrationForm = ({
  sharePage,
  disableAnimation,
  ...props
}: RegistrationFormProps) => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorTryAgain, setErrorTryAgain] = useState(false);
  const [focused, setFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>('default');
  const { setPageState, setUserData } = useConfData();
  const router = useRouter();
  const {
    ref: captchaRef,
    execute: executeCaptcha,
    reset: resetCaptcha,
    isEnabled: isCaptchaEnabled
  } = useCaptcha();

  const handleRegister = useCallback(
    (token?: string) => {
      register(email, token)
        .then(async res => {
          if (!res.ok) {
            throw new FormError(res);
          }

          const data = await res.json();
          const params = {
            id: data.id,
            ticketNumber: data.ticketNumber,
            name: data.name,
            username: data.username
          };

          if (sharePage) {
            const queryString = Object.keys(params)
              .map(
                key =>
                  `${encodeURIComponent(key)}=${encodeURIComponent(
                    params[key as keyof typeof params] || ''
                  )}`
              )
              .join('&');
            await router.replace(`/?${queryString}`, '/');
          } else {
            setUserData(params);
            setPageState('ticket');
          }
        })
        .catch(async err => {
          let message = 'Error! Please try again.';

          if (err instanceof FormError) {
            const { res } = err;
            const data = res.headers.get('Content-Type')?.includes('application/json')
              ? await res.json()
              : null;

            if (data?.error?.code === 'bad_email') {
              message = 'Please enter a valid email';
            }
          }

          setErrorMsg(message);
          setFormState('error');
        });
    },
    [email, router, setPageState, setUserData, sharePage]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (formState === 'default') {
        setFormState('loading');

        if (isCaptchaEnabled) {
          return executeCaptcha();
        }

        return handleRegister();
      } else {
        setFormState('default');
      }
    },
    [executeCaptcha, formState, isCaptchaEnabled, handleRegister]
  );

  const onTryAgainClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      setFormState('default');
      setErrorTryAgain(true);
      resetCaptcha();
    },
    [resetCaptcha]
  );

  useEmailQueryParam('email', setEmail);

  return (
    <Container
      whileInView={disableAnimation ? {} : { x: [0, -6, 5, -3, 2, 0] }}
      transition={{ delay: 0.25, duration: 0.5, ease: 'easeInOut' }}
      viewport={{ margin: '0px 0px -75% 0px', amount: 'all' }}
      {...props}
    >
      <FormUI
        email={email}
        isLoading={formState === 'loading'}
        onChange={value => setEmail(value)}
        onSubmit={onSubmit}
        handleRegister={handleRegister}
        captchaRef={captchaRef}
      />
      {formState === 'error' && (
        <ErrorAlert>
          <ErrorMessage>{errorMsg}</ErrorMessage>
          <RetryButton appearance="inverse" type="button" onClick={onTryAgainClick}>
            Try Again
          </RetryButton>
        </ErrorAlert>
      )}
      {/* {formState === 'error' ? (
        <ErrorAlert>
          <ErrorMessage>{errorMsg}</ErrorMessage>
          <RetryButton appearance="inverse" type="button" onClick={onTryAgainClick}>
            Try Again
          </RetryButton>
        </ErrorAlert>
      ) : (
        <FormUI
          email={email}
          isLoading={formState === 'loading'}
          onChange={value => setEmail(value)}
          onSubmit={onSubmit}
          handleRegister={handleRegister}
          captchaRef={captchaRef}
        />
      )} */}
    </Container>
  );
};
