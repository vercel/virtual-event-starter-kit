import React from 'react';
import { styled } from '@storybook/theming';
import { useId } from '@floating-ui/react-dom-interactions';
import { Button, Icon, Spinner } from '@storybook/design-system';
import { styles } from '@storybook/components-marketing';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Captcha from '@components/captcha';

const { spacing, color, typography } = styles;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.label`
  flex: 1 1 230px;
`;

const InputEl = styled.input`
  &::placeholder {
    color: ${color.mediumdark};
  }
  appearance: none;
  border: none;
  box-sizing: border-box;
  display: block;
  outline: none;
  width: 100%;
  margin: 0;

  position: relative;

  background: ${color.lightest};
  color: ${color.darkest};
  font-size: ${typography.size.s2}px;
  line-height: 20px;
  padding: 10px 15px; //40px tall
  box-shadow: ${color.border} 0 0 0 1px inset;

  border-top-left-radius: ${spacing.borderRadius.small}px;
  border-bottom-left-radius: ${spacing.borderRadius.small}px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;

  &:focus {
    box-shadow: ${color.secondary} 0 0 0 1px inset;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 3em ${color.lightest} inset;
  }

  &:focus + svg path {
    fill: ${color.darker};
  }

  padding-left: 40px;
`;

const EmailIcon = styled(Icon)`
  transition: all 150ms ease-out;
  position: absolute;
  top: 50%;

  font-size: ${typography.size.s2}px;
  height: 14px;
  margin-top: -7px;
  width: 14px;

  z-index: 3;
  left: 15px;

  background: transparent;

  path {
    transition: all 150ms ease-out;
    fill: ${color.mediumdark};
  }
`;

const SubmitButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: ${spacing.borderRadius.small}px;
  border-bottom-right-radius: ${spacing.borderRadius.small}px;
  flex: none;
`;

const Form = styled.form`
  position: relative;
`;

const CaptchaWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 110%;
`;

const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${color.secondary};
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    width: 16px;
    height: 16px;
  }
`;

interface FormUIProps {
  email: string;
  onChange: (email: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSubmit: (e: React.FormEvent) => void;
  handleRegister: () => void;
  isLoading?: boolean;
  captchaRef: React.RefObject<HCaptcha>;
}

export const FormUI = ({
  email,
  onChange,
  onFocus,
  onBlur,
  isLoading,
  onSubmit,
  captchaRef,
  handleRegister,
  ...props
}: FormUIProps) => {
  const id = useId();

  return (
    <Form onSubmit={onSubmit}>
      <FormWrapper {...props}>
        <EmailIcon icon="email" />
        <Label htmlFor={`${id}-email-input-field`}>
          <InputEl
            id={`${id}-email-input-field`}
            type="email"
            name={`${id}-email`}
            value={email}
            onChange={e => {
              onChange(e.target.value);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="Your email address"
            aria-label="Your email address"
            autoCapitalize="off"
            autoCorrect="off"
            required
          />
        </Label>

        <SubmitButton
          appearance="secondary"
          type="submit"
          isUnclickable={isLoading}
          disabled={isLoading}
        >
          Get free ticket
          {isLoading && (
            <Loader>
              <Spinner inverse inline />
            </Loader>
          )}
        </SubmitButton>
      </FormWrapper>
      <CaptchaWrapper>
        <Captcha ref={captchaRef} onVerify={handleRegister} />
      </CaptchaWrapper>
    </Form>
  );
};
