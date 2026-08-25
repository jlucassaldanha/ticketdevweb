"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/toast';
import useLogin from '@/hooks/useLogin';
import Link from 'next/link';
import { Controller } from 'react-hook-form';

export default function LoginPage() {
  const { control, isPending, handleSubmit, onSubmit, fillWithTestUser } = useLogin()

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-5'>
      <div>
        <span className='font-extrabold'>TicketDev</span>
      </div>

      <Card className='flex flex-col items-center justify-center'>
        <CardHeader className='flex justify-center'>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <form id='login-form' onSubmit={handleSubmit(onSubmit)}>
          <CardContent className='max-w-100 flex flex-col gap-3'>
            <Controller 
              name='email'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor='email'>E-mail</Label>
                  <Input 
                    {...field}
                    id="email" 
                    aria-invalid={fieldState.invalid}
                    placeholder='E-mail'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller 
              name='password'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor='password'>Senha</Label>
                  <Input 
                    {...field}
                    id="password" 
                    aria-invalid={fieldState.invalid}
                    placeholder='Senha'
                    type='password'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </CardContent>
        </form>
        
        <CardFooter className='flex flex-col gap-2'>
          <Button className='w-full' type='submit' form='login-form' disabled={isPending} >{!isPending ? 'Entrar' : 'Entrando..'}</Button>
          <div>
            Não possui uma conta?
            <Link className="text-blue-600 font-bold" href={'register'}>{' '}Registrar</Link>
          </div>
        </CardFooter>
      </Card>

      <Card >
        <CardHeader className='flex justify-center'>
          <CardTitle>Acesso rápido de teste</CardTitle>
        </CardHeader>

        <CardContent className='flex gap-2'>
          <Button onClick={() => fillWithTestUser('organizador1@ticketdev.com')}>Organizador</Button>
          <Button onClick={() => fillWithTestUser('cliente1@ticketdev.com')}>Cliente</Button>
          <Button onClick={() => fillWithTestUser('portaria@ticketdev.com')}>Portaria</Button>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  )
}