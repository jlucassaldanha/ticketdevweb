"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectItem } from '@/components/ui/select';
import { Toaster } from '@/components/ui/toast';
import { useAuth } from '@/contexts/authContext';
import useRegister from '@/hooks/useRegister';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Controller } from 'react-hook-form';

const roleItems = [
  { label: "Cliente", value: "CONSUMER" },
  { label: "Organizador", value: "ORGANIZER" },
  { label: "Portaria", value: "VALIDATOR" }
]

export default function RegisterPage() {
  const auth = useAuth()

  if (auth.token) {
    redirect('/')
  }

  const { control, isPending, handleSubmit, onSubmit } = useRegister()

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-5'>
      <div>
        <span className='font-extrabold'>TicketDev</span>
      </div>

      <Card className='flex flex-col items-center justify-center'>
        <CardHeader className='flex justify-center'>
          <CardTitle>Registrar</CardTitle>
        </CardHeader>

        <form id='register-form' onSubmit={handleSubmit(onSubmit)}>
          <CardContent className='max-w-100 flex flex-col gap-3'>
            <Controller 
              name='name'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor='name'>Nome</Label>
                  <Input 
                    {...field}
                    id="name" 
                    aria-invalid={fieldState.invalid}
                    placeholder='Nome'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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

            <Controller 
              name='role'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor='role'>Tipo de conta</Label>
                  <Select 
                    items={roleItems}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="role" aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Tipo de conta"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {roleItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </CardContent>
        </form>
        
        <CardFooter className='flex flex-col gap-2'>
          <Button className='w-full' type='submit' form='register-form' disabled={isPending} >{!isPending ? 'Registrar' : 'Registrando..'}</Button>
          <div>
            Já possui uma conta?
            <Link className="text-blue-600 font-bold" href={'login'}>{' '}Entrar</Link>
          </div>
        </CardFooter>
      </Card>

      <Toaster />
    </div>
  )
}