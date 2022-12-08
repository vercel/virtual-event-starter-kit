import React from 'react';
import { styled } from '@storybook/theming';
import { useId } from '@floating-ui/react-dom-interactions';
import { Button, Icon } from '@storybook/design-system';
import { styles } from '@storybook/components-marketing';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Captcha from '@components/captcha';
import { LoadingSpinner } from '@components/LoadingSpinner';

const { spacing, color, typography, breakpoints } = styles;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (min-width: ${breakpoints[1]}px) {
    flex-wrap: nowrap;
  }
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

const Label = styled.label`
  flex: 1 1 230px;
  position: relative;
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

  padding-left: 40px;

  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: ${spacing.borderRadius.small}px;
  border-top-right-radius: ${spacing.borderRadius.small}px;

  @media (min-width: ${breakpoints[1]}px) {
    border-top-left-radius: ${spacing.borderRadius.small}px;
    border-bottom-left-radius: ${spacing.borderRadius.small}px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

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
`;

const SubmitButton = styled(Button)`
  && {
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
  }
`;

const Form = styled.form`
  position: relative;
`;

const CaptchaWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 110%;
`;

interface FormUIProps {
  email: string;
  onChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  handleRegister: () => void;
  isLoading?: boolean;
  captchaRef: React.RefObject<HCaptcha>;
}

export const FormUI = ({
  email,
  onChange,
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
        <Label htmlFor={`${id}-email-input-field`}>
          <EmailIcon icon="email" />
          <InputEl
            id={`${id}-email-input-field`}
            type="email"
            name={`${id}-email`}
            value={email}
            onChange={e => {
              onChange(e.target.value);
            }}
            placeholder="Your email address"
            aria-label="Your email address"
            autoCapitalize="off"
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
          {isLoading && <LoadingSpinner />}
        </SubmitButton>
      </FormWrapper>
      <CaptchaWrapper>
        <Captcha ref={captchaRef} onVerify={handleRegister} />
      </CaptchaWrapper>
    </Form>
  );
};
