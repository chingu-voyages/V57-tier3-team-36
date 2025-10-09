'use client';

import {
  AppContext,
  type AppContextValue,
} from '@/components/AppProvider/AppContext';
import { useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function useAppContext(): Partial<AppContextValue> {
  const context = useContext(AppContext);

  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return {};
  }

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
}
