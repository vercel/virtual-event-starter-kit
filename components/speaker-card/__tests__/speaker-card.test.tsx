import { Speaker } from '@lib/types';
import { render, screen } from '@testing-library/react';
import { SpeakerCard } from '@components/speaker-card/speaker-card';

const defaultSpeaker: Speaker = {
  name: 'A Speaker',
  image: {
    url: 'http://url.com'
  },
  title: 'Speaker Job Title',
  company: 'Speaker company',
  bio: 'Speaker bio'
} as any;

const renderSpeakerCard = (speaker = defaultSpeaker) => {
  render(<SpeakerCard speaker={speaker} />);

  return {
    getSpeakerName: (name: string) => screen.getByText(name),
    getSpeakerJobRole: (jobRole: string) => screen.getByText(jobRole),
    getSpeakerCompany: (company: string) => screen.getByText(company),
    getSpeakerImage: (altText: string) => screen.getByAltText(altText)
  };
};

describe('SpeakerCard', () => {
  it('should display the speakers name', () => {
    const { getSpeakerName } = renderSpeakerCard();

    expect(getSpeakerName('A Speaker')).toBeInTheDocument();
  });

  it('should display job role', () => {
    const { getSpeakerJobRole } = renderSpeakerCard();

    expect(getSpeakerJobRole('Speaker Job Title @')).toBeInTheDocument();
  });

  it('should display company', () => {
    const { getSpeakerCompany } = renderSpeakerCard();

    expect(getSpeakerCompany('Speaker company')).toBeInTheDocument();
  });

  it('should display image', () => {
    const { getSpeakerImage } = renderSpeakerCard();

    expect(getSpeakerImage('A Speaker')).toBeInTheDocument();
  });
});
