import { ArrowRightIcon } from '@100mslive/react-icons';
import HmsLogo from '@components/icons/icon-hms';
import React from 'react';
import s from './index.module.css';

const data = [
  {
    name: 'Daniel',
    roleName: 'moderator',
    role: 'backstage',
    desc: 'Let’s describe moderator role in a human readable format here'
  },
  {
    name: 'Alexis',
    roleName: 'speaker',
    role: 'stage',
    desc: 'Let’s describe moderator role in a human readable format here'
  },
  {
    name: 'Alexis',
    roleName: 'speaker',
    role: 'stage',
    desc: 'Let’s describe moderator role in a human readable format here'
  },
  {
    name: 'Guest',
    roleName: 'viewer',
    role: 'viewer',
    desc: 'Let’s describe moderator role in a human readable format here'
  }
];

const DemoModal = () => {
  return (
    <div>
      <p className={s['modal-head']}>Take your Webinar for a test drive</p>
      <p className={s['modal-text']}>
        We have setup a few profiles to make it easy for you or your team to experience each
        perspective. Join in one click or share access with anyone else.
      </p>
      <div>
        {data.map(m => (
          <div className={s['box']} key={m.role}>
            <div className={s['left']}>
              <span className={`${s['badge']} ${s[m.roleName]}`}>{m.roleName}</span>
              <p className={s['name']}>{m.name}</p>
              <p className={s['desc']}>{m.desc}</p>
            </div>
            <div className={s['right']}>
              <CopyButton text={`${window.location.host}/stage/a?role=${m.role}`} />
              <a href={`/stage/a?role=${m.role}`}>
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

const CopyButton = ({ text = '' }) => {
  const copy = () => {
    // setCopy(true);
    navigator.clipboard.writeText(text);
    // setTimeout(() => {
    //   setCopy(false);
    // }, 2000);
  };
  return (
    <button onClick={copy} className={s['invite']}>
      Invite
    </button>
  );
};
