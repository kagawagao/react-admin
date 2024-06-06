import AuthContext from '@/contexts/auth';
import { useContext } from 'react';

export function useAuth() {
  return useContext(AuthContext);
}
