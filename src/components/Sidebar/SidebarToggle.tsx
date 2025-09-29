'use client';

import HamburgerIcon from '@/components/icons/HamburgerIcon';
export default function SidebarToggle({
  sidebarCheckboxId,
}: {
  sidebarCheckboxId: string;
}) {
  return (
    <div className="fab lg:hidden cursor-pointer">
      <button
        onClick={() => {
          const toggle = document.getElementById(
            sidebarCheckboxId
          ) as HTMLInputElement;
          if (toggle) {
            toggle.checked = !toggle.checked;
          }
        }}
      >
        <HamburgerIcon />
      </button>
    </div>
  );
}
