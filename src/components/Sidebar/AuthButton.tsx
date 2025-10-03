'use client';

import SidebarIcon from './SidebarIcon';

const AuthButton = ({
  action,
  label,
}: {
  action: () => void;
  label: 'Sign In' | 'Sign Out';
}) => {
  return (
    <li>
      <button className="w-full justify-between" onClick={action}>
        <SidebarIcon label={label} />
        {label}
      </button>
    </li>
  );
};

export default AuthButton;









