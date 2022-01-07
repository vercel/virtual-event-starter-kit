import { ArrowRightIcon } from '@100mslive/react-icons';
import HmsLogo from '@components/icons/icon-hms';
import React from 'react';
import { useRouter } from 'next/router';
import Button from '../Button';

const data = [
  {
    name: 'Moderator',
    roleName: 'moderator',
    role: 'backstage',
    desc: 'Can invite participants on stage, assign speakers and remove them'
  },
  {
    name: 'Speaker',
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
      <p className="text-[32px] font-semibold">Test your Webinar for a test drive</p>
      <p className="text-gray-300 text-[15px]">
        We have setup a few profiles to make it easy for you or your team to experience each
        perspective. Join in one click or share access with anyone else.
      </p>
      <div>
        {data.map(m => (
          <div
            className="flex md:flex-row flex-col justify-between py-4"
            style={{ borderBottom: '1px solid #323232' }}
            key={`${m.roleName}-${m.name}`}
          >
            <div className="text-left max-w-xs">
              <span className={`badge ${m.roleName}-badge`}>{m.roleName}</span>
              <p className="font-semibold">{m.name}</p>
              <p className="text-gray-300 text-xs">{m.desc}</p>
            </div>
            <div className="flex items-center space-x-4">
              <CopyButton text={`${window.location.host}/stage/${stage || 'a'}?role=${m.role}`} />
              <a href={`/stage/${stage || 'a'}?role=${m.role}`}>
                <Button>
                  Join as {m.name} <ArrowRightIcon height={20} />
                </Button>
              </a>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center mt-4 ">
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
      <Button variant="secondary" onClick={copy}>
        Invite
      </Button>
    </div>
  );
};
