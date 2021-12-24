import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import HorizontalMenuIcon from '@components/icons/icon-menu-hor';
import { selectLocalPeerRole } from '@100mslive/hms-video-store';
import { InviteStageIcon, RemoveUserIcon } from '@100mslive/react-icons';

const Dropdown: React.FC<{ id: string; role: string }> = ({ id, role }) => {
  const actions = useHMSActions();
  const changeRole = async () => {
    const nextRole = role === 'viewer' ? 'invitee' : 'viewer';
    try {
      if (nextRole === 'invitee') {
        await actions.changeRole(id, nextRole, false);
      } else {
        await actions.changeRole(id, nextRole, true);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const removePeer = async () => {
    try {
      await actions.removePeer(id, 'Bye');
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const localRole = useHMSStore(selectLocalPeerRole);
  return (
    <>
      {role === 'backstage' ? null : (
        <div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button type="button">
                <HorizontalMenuIcon />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="min-w-[220px] bg-gray-700 rounded-lg py-2">
              <DropdownMenu.Item asChild>
                <button
                  className="w-full flex items-center p-2 focus:bg-gray-600 focus:outline-none text-sm"
                  onClick={changeRole}
                >
                  <InviteStageIcon className="mr-2" />
                  {role === 'viewer' ? 'Bring user to stage' : 'Remove user from stage'}
                </button>
              </DropdownMenu.Item>
              {localRole?.name === 'backstage' ? (
                <DropdownMenu.Item asChild>
                  <button
                    className="w-full flex items-center p-2 focus:bg-gray-600 focus:outline-none text-sm"
                    onClick={removePeer}
                  >
                    <RemoveUserIcon className="mr-2" /> Remove user
                  </button>
                </DropdownMenu.Item>
              ) : null}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      )}
    </>
  );
};

export default Dropdown;
