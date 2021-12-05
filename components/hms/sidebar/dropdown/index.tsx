import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import HorizontalMenuIcon from '@components/icons/icon-menu-hor';
import RemoveUserIcon from '@components/icons/icon-remove-user';
import BringToStageIcon from '@components/icons/icon-bring-stage';
import s from './index.module.css';
import { selectLocalPeerRole } from '@100mslive/hms-video-store';

const Dropdown: React.FC<{ id: string; role: string }> = ({ id, role }) => {
  const actions = useHMSActions();
  const changeRole = async () => {
    const nextRole = role === 'viewer' ? 'invitee' : 'viewer';
    try {
      await actions.changeRole(id, nextRole, true);
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
              <button className={s['menu-btn']}>
                <HorizontalMenuIcon />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className={s['menu-content']}>
              <DropdownMenu.Item asChild>
                <button className={s['menu-item']} onClick={changeRole}>
                  <BringToStageIcon />{' '}
                  {role === 'viewer' ? 'Bring user to stage' : 'Remove user from stage'}
                </button>
              </DropdownMenu.Item>
              {localRole?.name === 'backstage' ? (
                <DropdownMenu.Item asChild>
                  <button className={s['menu-item']} onClick={removePeer}>
                    <RemoveUserIcon /> Remove user
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
