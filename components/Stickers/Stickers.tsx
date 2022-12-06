import { useState, useCallback } from 'react';
import { styled } from '@storybook/theming';
import { Button, Input } from '@storybook/design-system';
import { styles } from '@storybook/components-marketing';
import useConfData from '@lib/hooks/use-conf-data';
import FormError from '@lib/form-error';
import { saveShippingInfo } from '@lib/user-api';
import { useCaptcha } from '../captcha';
import { StickerForm, FormData } from './StickerForm';
import { Alert } from './Alert';

const { text, color, pageMargins } = styles;

const Wrapper = styled.div`
  ${pageMargins};
`;

const GradientBackdrop = styled.div`
  background: linear-gradient(180deg, #d9e6f2 0%, rgba(246, 249, 252, 0) 100%);
  padding-top: 8rem;
`;

const Container = styled.div`
  max-width: 300px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  ${text.regularBold};
`;

const StickersImg = styled.img`
  display: block;
  margin-bottom: 1.5rem;
`;

const Shipping = styled.div`
  ${text.regular};
  color: ${color.darkest};
  opacity: 50%;
`;

type FormState = 'default' | 'loading' | 'error' | 'success';

export const Stickers = ({ id }: { id: string }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    address2: '',
    cityTown: '',
    stateProvinceRegion: '',
    postalCode: '',
    country: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [formState, setFormState] = useState<FormState>('default');
  const { setPageState, setUserData } = useConfData();
  const {
    ref: captchaRef,
    execute: executeCaptcha,
    reset: resetCaptcha,
    isEnabled: isCaptchaEnabled
  } = useCaptcha();

  const handleRegister = useCallback(() => {
    saveShippingInfo(id, formData)
      .then(async res => {
        if (!res.ok) {
          throw new FormError(res);
        }

        const data = await res.json();
        console.log(data);

        const params = {
          id: data.id,
          ticketNumber: data.ticketNumber,
          name: data.name,
          username: data.username
        };

        setUserData(params);
        setFormState('success');
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
  }, [formData, setUserData, id]);

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

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const name = event.target.name;

      setFormData({
        ...formData,
        [name]: value
      });
    },
    [formData, setFormData]
  );

  return (
    <GradientBackdrop>
      <Wrapper>
        <Container>
          <StickersImg
            src="stickers.svg"
            alt="Get Storybook, Chromatic and cursor pointer stickers"
          />
          {formState === 'success' ? (
            <Alert
              title="Your request was received!"
              message="Your stickers will ship with the next monthly batch."
            />
          ) : (
            <>
              <Heading>Get free stickers shipped to you</Heading>
              <StickerForm
                value={formData}
                onChange={onChange}
                onSubmit={onSubmit}
                isLoading={formState === 'loading'}
                handleRegister={handleRegister}
                captchaRef={captchaRef}
              />
              <Shipping>We ship a batch of stickers every month.</Shipping>
            </>
          )}
        </Container>
      </Wrapper>
    </GradientBackdrop>
  );
};
