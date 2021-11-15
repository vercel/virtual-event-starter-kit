import SpeakersGrid from '@components/speaker-grid/speakers-grid';
import { render, screen } from '@testing-library/react';
import { Speaker } from '@lib/types';

const defaultSpeakers: Speaker[] = [
  {
    name: 'A Speaker',
    image: {
      url: 'http://url.com'
    },
    title: 'Speaker Job Title',
    company: 'Speaker company',
    bio: 'Speaker bio'
  },
  {
    name: 'Another Speaker',
    image: {
      url: 'http://url2.com'
    },
    title: 'Speaker2 Job Title',
    company: 'Speaker2 company',
    bio: 'Speaker2 bio'
  }] as any;

const renderSpeakersGrid = (speakers = defaultSpeakers) => {
  render(<SpeakersGrid speakers={speakers} />);

  return {
    getSpeakerName: (name: string) => screen.getByText(name)
  };
};

describe('SpeakersGrid', () => {
  describe('should display two speaker cards', () => {
    it('should things', () => {
      const { getSpeakerName } = renderSpeakersGrid();

      expect(getSpeakerName('A Speaker')).toBeInTheDocument();
      expect(getSpeakerName('Another Speaker')).toBeInTheDocument();
    });
  });
});
