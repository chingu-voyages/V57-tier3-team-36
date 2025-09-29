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
        className="btn btn-lg btn-circle btn-primary"
        onClick={() => {
          const toggle = document.getElementById(
            sidebarCheckboxId
          ) as HTMLInputElement;
          toggle?.click(); // behaves the same as user clicking the checkbox
        }}
      >
        <HamburgerIcon />
      </button>
    </div>
  );
}
