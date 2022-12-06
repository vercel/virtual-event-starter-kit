import { styled } from '@storybook/theming';
import { Button, Input } from '@storybook/design-system';
import { styles } from '@storybook/components-marketing';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Captcha from '@components/captcha';
import { LoadingSpinner } from '@components/LoadingSpinner';

const { color } = styles;

const Form = styled.form`
  color: ${color.darkest};
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
`;

const StyledFormButton = styled(Button)`
  width: 100%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const CaptchaWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 110%;
`;

export interface FormData {
  name: string;
  address: string;
  address2: string;
  cityTown: string;
  stateProvinceRegion: string;
  postalCode: string;
  country: string;
}

interface StickerFormProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  captchaRef: React.RefObject<HCaptcha>;
  handleRegister: () => void;
  value: FormData;
}

export const StickerForm = ({
  value,
  onChange,
  isLoading,
  onSubmit,
  handleRegister,
  captchaRef
}: StickerFormProps) => (
  <Form onSubmit={onSubmit}>
    <Input
      id="name"
      name="name"
      label="Name"
      placeholder="Your Name"
      value={value.name}
      required
      icon="useralt"
      stackLevel="top"
      startFocused
      hideLabel
      onChange={onChange}
    />
    <Input
      id="address"
      name="address"
      label="Address"
      placeholder="Your address"
      value={value.address}
      required
      icon="pin"
      stackLevel="middle"
      hideLabel
      onChange={onChange}
    />
    <Input
      id="address2"
      name="address2"
      label="Apartment/Suite"
      placeholder="Apt/Suite"
      value={value.address2}
      icon="pin"
      stackLevel="middle"
      hideLabel
      onChange={onChange}
    />
    <Input
      id="cityTown"
      name="cityTown"
      label="City/town"
      placeholder="City/town"
      value={value.cityTown}
      required
      icon="globe"
      stackLevel="middle"
      hideLabel
      onChange={onChange}
    />
    <Input
      id="stateProvinceRegion"
      name="stateProvinceRegion"
      label="State/province/region"
      placeholder="State/province/region"
      value={value.stateProvinceRegion}
      required
      icon="email"
      stackLevel="middle"
      hideLabel
      onChange={onChange}
    />
    <Input
      id="postalCode"
      name="postalCode"
      label="Postal/Zip code"
      placeholder="Postal/Zip code"
      value={value.postalCode}
      required
      icon="email"
      stackLevel="middle"
      hideLabel
      onChange={onChange}
    />
    <Input
      id="country"
      name="country"
      label="Country"
      placeholder="Country"
      value={value.country}
      required
      icon="email"
      stackLevel="middle"
      hideLabel
      onChange={onChange}
    />
    <StyledFormButton
      appearance="secondary"
      isLoading={isLoading}
      isUnclickable={isLoading}
      disabled={isLoading}
      type="submit"
    >
      Send me stickers
      {isLoading && LoadingSpinner}
    </StyledFormButton>
    <CaptchaWrapper>
      <Captcha ref={captchaRef} onVerify={handleRegister} />
    </CaptchaWrapper>
  </Form>
);
