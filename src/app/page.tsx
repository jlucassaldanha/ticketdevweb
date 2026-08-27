'use client'

import { logoutAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/authContext';
import { redirect } from 'next/navigation';

export default function Home() {
  const auth = useAuth()

  if (auth.token === undefined || auth.user === null) {
    redirect('login')
  }

  return (
    <div>
      <Button onClick={logoutAction}>Sair</Button>
    </div>
  );
}
