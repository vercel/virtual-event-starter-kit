import { useHMSActions } from '@100mslive/react-sdk';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import HorizontalMenuIcon from '@components/icons/icon-menu-hor';
import RemoveUserIcon from '@components/icons/icon-remove-user';
import BringToStageIcon from '@components/icons/icon-bring-stage';
import s from './index.module.css';

const Dropdown: React.FC<{ id: string; role: string }> = ({ id, role }) => {
  const actions = useHMSActions();
  const changeRole = () => {
    const nextRole = role === 'viewer' ? 'invitee' : 'viewer';
    actions.changeRole(id, nextRole, true);
  };
  const removePeer = () => {
    actions.removePeer(id, 'Bye');
  };
  return (
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
          <DropdownMenu.Item asChild>
            <button className={s['menu-item']} onClick={removePeer}>
              <RemoveUserIcon /> Remove user
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default Dropdown;
