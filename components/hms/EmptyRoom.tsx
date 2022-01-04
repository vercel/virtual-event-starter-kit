import React from 'react';
import Button from './Button';
import { InviteIcon, PersonIcon } from '@100mslive/react-icons';

const EmptyRoom = () => {
  return (
    <div
      className="flex flex-col justify-center items-center text-center"
      style={{ height: 'calc(100vh - 3.2 * var(--header-height))' }}
    >
      <h2 className="text-3xl ">No Speakers Present</h2>
      <p className="text-gray-300 text-sm">
        Looks like nobody has joined as a speaker. Invite someone to speak or change your role.
      </p>
      <div className="flex space-x-4 mt-8">
        <Button variant="secondary">
          <InviteIcon className="mr-2" /> Invite
        </Button>
        <Button>
          <PersonIcon className="mr-2" /> Change Role
        </Button>
      </div>
    </div>
  );
};

export default EmptyRoom;
