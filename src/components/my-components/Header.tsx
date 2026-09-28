"use client"

import { useAuth } from '@/contexts/authContext';
import Link from 'next/link';
import { Button } from '../ui/button';
import { logoutAction } from '@/actions/auth';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathName = usePathname()

  const auth = useAuth()

  const accountLink = auth.user?.role === "CONSUMER" ? "/tickets": auth.user?.role === "ORGANIZER" ? "/organizer" : "/gate"

  if (pathName !== '/' && !auth.token) {
    return null
  }

  return (
    <div className="flex justify-between items-center mb-6 p-6">
      <Link href={'/'}>
        <span className='font-extrabold'>TicketDev</span>
      </Link>

      <div>
        {auth.user ? (
          <>
            <Link href={accountLink}>
              <span className='font-bold'>Olá, {auth.user?.name}</span>
            </Link>

            <Button onClick={logoutAction} className='ml-4'>
              Sair
            </Button>
          </>
        ) : (
          <>
            <Link href={'/login'}>
                <span className='font-bold'>Entrar</span>
            </Link>
          </>
        )
      }
      </div>
    </div>
  )
}