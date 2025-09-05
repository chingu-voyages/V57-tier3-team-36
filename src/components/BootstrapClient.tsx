'use client';

import { useEffect } from 'react';

function BootstrapClient() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('bootstrap/dist/js/bootstrap.bundle.min.js');

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    // require('@tabler/core/dist/js/tabler.min.js');
  }, []);

  return null;
}

export default BootstrapClient;
