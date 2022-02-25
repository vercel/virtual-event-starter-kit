/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import cn from 'classnames';
import { useCallback, useState } from 'react';
import styleUtils from './utils.module.css';
import styles from './conf-entry.module.css';
import LoadingDots from './loading-dots';
import { register } from '@lib/user-api';
import useEmailQueryParam from '@lib/hooks/use-email-query-param';
import Captcha, { useCaptcha } from './captcha';

type FormState = 'default' | 'loading' | 'error';

const DEFAULT_ERROR_MSG = 'Error! Please try again.';

function getErrorMsg(code: string) {
  switch (code) {
    case 'bad_email':
      return 'Please enter a valid email';
    default:
      return DEFAULT_ERROR_MSG;
  }
}

export default function ConfEntry({ onRegister }: { onRegister: () => void }) {
  const [emailInput, setEmailInput] = useState('');
  const [focused, setFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>('default');
  const [errorMsg, setErrorMsg] = useState('');
  const {
    ref: captchaRef,
    reset: resetCaptcha,
    execute: executeCaptcha,
    isEnabled: isCaptchaEnabled
  } = useCaptcha();

  const handleRegister = useCallback(
    async (token?: string) => {
      const res = await register(emailInput, token);

      if (!res.ok) {
        const json = await res.json();
        setErrorMsg(getErrorMsg(json.error.code));
        setFormState('error');
        return;
      }

      onRegister();
    },
    [emailInput, onRegister]
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        setFormState('loading');

        if (isCaptchaEnabled) {
          return executeCaptcha();
        }

        return handleRegister();
      } catch (err) {
        console.error(err);
        setErrorMsg(DEFAULT_ERROR_MSG);
        setFormState('error');
      }
    },
    [executeCaptcha, isCaptchaEnabled, handleRegister]
  );

  const onTryAgainClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      setErrorMsg('');
      setFormState('default');
      resetCaptcha();
    },
    [resetCaptcha]
  );

  useEmailQueryParam('login', setEmailInput);

  return (
    <div className={cn(styles.container, styleUtils.appear, styleUtils['appear-first'])}>
      <h1 className={cn(styles.hero)}>Ready to experience a live stage?</h1>
      <h2 className={cn(styles.description)}>Submit your details below to enter</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles['form-row']}>
          <label
            htmlFor="email-input-field"
            className={cn(styles['input-label'], {
              [styles.focused]: focused,
              [styles.error]: formState === 'error'
            })}
          >
            {formState === 'error' ? (
              <div className={cn(styles.input, styles['input-text'])}>{errorMsg}</div>
            ) : (
              <input
                className={styles.input}
                autoComplete="off"
                type="email"
                id="email-input-field"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter email to join the event"
                aria-label="Your email address"
                required
              />
            )}
          </label>
          <button
            type="submit"
            className={cn(styles.submit, styles.register, styles[formState])}
            disabled={formState === 'loading'}
            onClick={formState === 'error' ? onTryAgainClick : undefined}
          >
            {formState === 'loading' ? (
              <LoadingDots size={4} />
            ) : (
              <>{formState === 'error' ? 'Try Again' : 'Join'}</>
            )}
          </button>
        </div>
        <Captcha ref={captchaRef} onVerify={handleRegister} />
      </form>
    </div>
  );
}
