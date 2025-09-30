'use client';

import HamburgerIcon from '@/components/icons/HamburgerIcon';
import { useRef } from 'react';

export default function FloatingSidebarButton({
  buttonClass,
  checkboxId,
}: {
  buttonClass: string;
  checkboxId: string;
}) {
  const ref = useRef<HTMLLabelElement>(null);

  return (
    <>
      <label
        htmlFor={checkboxId}
        className="drawer-button hidden"
        ref={ref}
      ></label>
      <div className={`fab ${buttonClass}`}>
        <button
          className="btn btn-lg btn-circle btn-primary"
          onClick={() => ref.current?.click()}
        >
          <HamburgerIcon />
        </button>
      </div>
    </>
  );
}
