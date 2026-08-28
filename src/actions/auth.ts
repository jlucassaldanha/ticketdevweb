'use server'

import { User } from '@/contexts/authContext';
import { apiFetch } from '@/lib/api'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface LoginApiResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'CONSUMER' | 'ORGANIZER' | 'VALIDATOR';
  };
}

export async function loginAction(email: string, password: string) {
  try {
    
    const response = await apiFetch<LoginApiResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })

    ;(await cookies()).set({
      name: 'auth_token',
      value: response.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })

    ;(await cookies()).set('user_data', JSON.stringify(response.user))

    redirect('/')
  } catch (error) {
    console.error(error)
  }
}

export async function registerAction(name: string, email: string, password: string, role: string) {
  try {
    await apiFetch<LoginApiResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role })
    })

    redirect('/login')
  } catch (error) {
    console.error(error)
  }
}


export async function logoutAction() {
  (await cookies()).delete('auth_token')
  ;(await cookies()).delete('user_data')

  redirect('/login')
}

export async function getTokenAndDataAction() {
  const token = (await cookies()).get("auth_token")?.value 
  const userStored = (await cookies()).get("user_data")?.value 

  const user = userStored ? (JSON.parse(userStored) as User) : null;

  return { user, token} 
}