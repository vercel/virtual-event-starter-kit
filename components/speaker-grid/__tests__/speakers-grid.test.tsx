import SpeakersGrid from '@components/speaker-grid/speakers-grid';
import { render, screen } from '@testing-library/react';
import { Speaker } from '@lib/types';

const defaultSpeaker: Speaker = {
  name: 'A Speaker',
  image: {
    url: 'http://url.com'
  },
  title: 'Speaker Job Title',
  company: 'Speaker company',
  bio: 'Speaker bio'
} as any;

const renderSpeakersGrid = (speakers = [defaultSpeaker]) => {
  render(<SpeakersGrid speakers={speakers} />);

  return {
    getSpeakerName: (name: string) => screen.getByText(name),
    getSpeakerJobRole: (jobRole: string) => screen.getByText(jobRole),
    getSpeakerCompany: (company: string) => screen.getByText(company),
    getSpeakerImage: (altText: string) => screen.getByAltText(altText)
  };
};

describe('SpeakersGrid', () => {
  describe('should display a speaker card', () => {
    it('with the speakers name', () => {
      const { getSpeakerName } = renderSpeakersGrid();

      expect(getSpeakerName('A Speaker')).toBeInTheDocument();
    });

    it('with job role', () => {
      const { getSpeakerJobRole } = renderSpeakersGrid();

      expect(getSpeakerJobRole('Speaker Job Title @')).toBeInTheDocument();
    });

    it('with company', () => {
      const { getSpeakerCompany } = renderSpeakersGrid();

      expect(getSpeakerCompany('Speaker company')).toBeInTheDocument();
    });

    it('with image', () => {
      const { getSpeakerImage } = renderSpeakersGrid();

      expect(getSpeakerImage('A Speaker')).toBeInTheDocument();
    });
  });

  describe('should display two speaker cards', () => {
    it('should things', () => {
      const speakers: Speaker[] = [
        { ...defaultSpeaker },
        {
          name: 'Another Speaker',
          image: {
            url: 'http://url2.com'
          },
          title: 'Speaker2 Job Title',
          company: 'Speaker2 company',
          bio: 'Speaker2 bio'
        }
      ] as any;
      const { getSpeakerName } = renderSpeakersGrid(speakers);

      expect(getSpeakerName('A Speaker')).toBeInTheDocument();
      expect(getSpeakerName('Another Speaker')).toBeInTheDocument();
    });
  });
});
