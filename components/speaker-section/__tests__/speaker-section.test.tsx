import SpeakerSection from '../speaker-section';
import { render, screen } from '@testing-library/react';
import { Speaker } from '@lib/types';

const defaultSpeaker: Speaker = {
  name: 'SpeakerName',
  image: {
    url: 'url'
  },
  title: 'Speaker Job Title',
  company: 'Speaker company',
  bio: 'Speaker bio'
} as any;

const renderSpeakerSection = (speaker = defaultSpeaker) => {
  render(<SpeakerSection speaker={speaker} />);

  return {
    name: screen.getByText('SpeakerName'),
    twitterIcon: screen.queryByLabelText('Twitter')
  };
};

describe('SpeakerSection', () => {
  it('should have a name', () => {
    const { name } = renderSpeakerSection();

    expect(name).toBeInTheDocument();
  });

  it('should have a twitter icon', () => {
    const speaker: Speaker = {
      ...defaultSpeaker,
      twitter: '@speaker'
    } as any;
    const { twitterIcon } = renderSpeakerSection(speaker);

    expect(twitterIcon).toBeInTheDocument();
  });
});
