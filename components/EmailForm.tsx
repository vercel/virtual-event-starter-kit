import React, { useRef, useEffect, FC } from 'react';
import { styled } from '@storybook/theming';
import { useId } from '@floating-ui/react-dom-interactions';
import { Button, Icon } from '@storybook/design-system';
import { styles } from '@storybook/components-marketing';
import { motion } from 'framer-motion';

const { spacing, color, typography } = styles;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
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

  flex: 1 1 230px;

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

const Form = styled(motion.form)`
  max-width: 360px;
  position: relative;
`;

interface EmailFormProps {
  onSubscribe?: () => void;
  placeholder?: string;
  ctaText?: string;
}

export const EmailForm = ({ ...props }: EmailFormProps) => {
  const formRef = useRef(null);
  const hasSubmitted = false;
  const onSubmitForm = () => {};
  const isSubmitting = false;
  const id = useId();
  const [value, setValue] = React.useState('');

  return (
    <Form
      ref={formRef}
      onSubmit={() => {}}
      whileInView={{ x: [0, -6, 5, -3, 2, 0] }}
      transition={{ delay: 0.25, duration: 0.5, ease: 'easeInOut' }}
      viewport={{ margin: '0px 0px -75% 0px', amount: 'all' }}
    >
      <FormWrapper {...props}>
        <EmailIcon icon="email" />
        <InputEl
          id={`${id}-email-input-field`}
          type="email"
          name="email"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Your email address"
          autoCapitalize="off"
          autoCorrect="off"
          required
        />

        <SubmitButton appearance="secondary" type="submit" isUnclickable={isSubmitting}>
          Get free ticket
        </SubmitButton>
      </FormWrapper>
    </Form>
  );
};
