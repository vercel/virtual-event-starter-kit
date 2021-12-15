import { ArrowRightIcon } from '@100mslive/react-icons';
import HmsLogo from '@components/icons/icon-hms';
import React from 'react';
import s from './index.module.css';
import { useRouter } from 'next/router';

const data = [
  {
    name: 'Daniel',
    roleName: 'moderator',
    role: 'backstage',
    desc: 'Can invite participants on stage, assign speakers and remove them'
  },
  {
    name: 'David',
    roleName: 'speaker',
    role: 'stage',
    desc: 'Always remains on the stage. Can invite attendees on stage to speak.'
  },
  {
    name: 'Alexis',
    roleName: 'speaker',
    role: 'stage',
    desc: 'Always remains on the stage. Can invite attendees on stage to speak.'
  },
  {
    name: 'Guest',
    roleName: 'viewer',
    role: 'viewer',
    desc: `Can see and hear what's happening on the stage. Can chat with other participants`
  }
];

const DemoModal = () => {
  const [stage, setStage] = React.useState(``);
  const router = useRouter();
  React.useEffect(() => {
    if (router.query.slug) {
      setStage(router.query.slug as string);
    }
  }, [router]);
  return (
    <div>
      <p className={s['modal-head']}>Test your Webinar for a test drive</p>
      <p className={s['modal-text']}>
        We have setup a few profiles to make it easy for you or your team to experience each
        perspective. Join in one click or share access with anyone else.
      </p>
      <div>
        {data.map(m => (
          <div className={s['box']} key={`${m.roleName}-${m.name}`}>
            <div className={s['left']}>
              <span className={`${s['badge']} ${s[m.roleName]}`}>{m.roleName}</span>
              <p className={s['name']}>{m.name}</p>
              <p className={s['desc']}>{m.desc}</p>
            </div>
            <div className={s['right']}>
              <CopyButton
                text={`${window.location.host}/stage/${stage || 'a'}?role=${m.role}&name=${m.name}`}
              />
              <a href={`/stage/${stage || 'a'}?role=${m.role}&name=${m.name}`}>
                <button className={s['join']}>
                  Join as {m.name} <ArrowRightIcon height={20} />
                </button>
              </a>
            </div>
          </div>
        ))}
        <div className={s['footer']}>
          Powered by <HmsLogo />
        </div>
      </div>
    </div>
  );
};

export default DemoModal;

export const CopyButton = ({ text = '' }) => {
  const [cp, setCp] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    if (!cp) {
      setCp(true);
      setTimeout(() => {
        setCp(false);
      }, 3000);
    }
  };
  return (
    <div className="relative">
      {cp ? (
        <p className="absolute top-16 left-0 flex bg-gray-600 justify-center  rounded-lg w-48 p-2">
          Copied to clipboard!
        </p>
      ) : null}
      <button onClick={copy} className={s['invite']}>
        Invite
      </button>
    </div>
  );
};
