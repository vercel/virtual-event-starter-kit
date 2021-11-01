import { render, screen } from '@testing-library/react';
import { Speaker } from '@lib/types';
import SpeakerSection from '@components/speaker-section/speaker-section';

const defaultSpeaker: Speaker = {
  name: 'SpeakerName',
  image: {
    url: 'http://url.com'
  },
  title: 'Speaker Job Title',
  company: 'Speaker company',
  bio: 'Speaker bio'
} as any;

const renderSpeakerSection = (speaker = defaultSpeaker) => {
  render(<SpeakerSection speaker={speaker} />);

  return {
    backToSpeakers: screen.getByText('Back to speakers'),
    image: screen.getByAltText('SpeakerName'),
    name: screen.getByText('SpeakerName'),
    role: screen.getByText('Speaker Job Title @'),
    company: screen.getByText('Speaker company'),
    bioTitle: screen.getByText('Bio'),
    bio: screen.getByText('Speaker bio'),
    socialMediaTitle: screen.getByText('Social Media'),
    twitterIcon: screen.queryByLabelText('Twitter'),
    githubIcon: screen.queryByLabelText('GitHub'),
    talkTitle: screen.queryByText('Talk title'),
    talkDescription: screen.queryByText('Talk description')
  };
};

describe('SpeakerSection', () => {
  it('should have a link to speakers page', () => {
    const { backToSpeakers } = renderSpeakerSection();

    expect(backToSpeakers).toBeInTheDocument();
  });

  it('should have an image', () => {
    const { image } = renderSpeakerSection();

    expect(image).toBeInTheDocument();
  });
  describe('should have a speaker details section', () => {
    it('with name', () => {
      const { name } = renderSpeakerSection();

      expect(name).toBeInTheDocument();
    });

    it('with job role', () => {
      const { role } = renderSpeakerSection();

      expect(role).toBeInTheDocument();
    });

    it('with company', () => {
      const { company } = renderSpeakerSection();

      expect(company).toBeInTheDocument();
    });

    it('with bio title', () => {
      const { bioTitle } = renderSpeakerSection();

      expect(bioTitle).toBeInTheDocument();
    });

    it('with bio description', () => {
      const { bio } = renderSpeakerSection();

      expect(bio).toBeInTheDocument();
    });

    describe('with a social media section', () => {
      it('with social media title', () => {
        const { socialMediaTitle } = renderSpeakerSection();

        expect(socialMediaTitle).toBeInTheDocument();
      });

      it('with twitter when the speaker has it', () => {
        const speaker: Speaker = {
          ...defaultSpeaker,
          twitter: '@speaker'
        } as any;
        const { twitterIcon } = renderSpeakerSection(speaker);

        expect(twitterIcon).toBeInTheDocument();
      });

      it('with github when the speaker has it', () => {
        const speaker: Speaker = {
          ...defaultSpeaker,
          github: 'speaker'
        } as any;
        const { githubIcon } = renderSpeakerSection(speaker);

        expect(githubIcon).toBeInTheDocument();
      });
    });
  });

  describe('should have a talk', () => {
    const speaker: Speaker = {
      ...defaultSpeaker,
      talk: {
        title: 'Talk title',
        description: 'Talk description'
      }
    } as any;

    it('title when the speaker has a talk', () => {
      const { talkTitle } = renderSpeakerSection(speaker);

      expect(talkTitle).toBeInTheDocument();
    });

    it('description when the speaker has a talk', () => {
      const { talkDescription } = renderSpeakerSection(speaker);

      expect(talkDescription).toBeInTheDocument();
    });

  });

  describe('should not have a talk', () => {
    it('title when the speaker does not have a talk', () => {
      const { talkTitle } = renderSpeakerSection();

      expect(talkTitle).not.toBeInTheDocument();
    });

    it('description when the speaker does not have a talk', () => {
      const { talkDescription } = renderSpeakerSection();

      expect(talkDescription).not.toBeInTheDocument();
    });

  });

});
