"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast, Toaster } from '@/components/ui/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
  username: z.string().min(1, 'Usuário é um campo obrigatório'),
  password: z.string().min(1, 'Senha é um campo obrigatório')
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })


  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
    const id = toast.add({ 
      title: "Dados capturados:",
      description: ( 
        <code>{JSON.stringify(data, null, 2)}</code>
      ),
      actionProps: {
        children: "Undo",
        onClick() {
          toast.close(id)
        }
      }
    })
  }

  const handleTestUser = (testUser: string) => {
    form.reset({
      username: testUser,
      password: "SenhaTeste123"
    })
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-5'>
      <div>
        <span className='font-extrabold'>TicketDev</span>
      </div>

      <Card className='flex flex-col items-center justify-center'>
        <CardHeader className='flex justify-center'>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <form id='login-form' onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className='max-w-100 flex flex-col gap-3'>
            <Controller 
              name='username'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor='username'>Usuário</Label>
                  <Input 
                    {...field}
                    id="username" 
                    aria-invalid={fieldState.invalid}
                    placeholder='Nome de usuário'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller 
              name='password'
              control={form.control}
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
          <Button className='w-full' type='submit' form='login-form'>Login</Button>
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
          <Button onClick={() => handleTestUser('organizador1@ticketdev.com')}>Organizador</Button>
          <Button onClick={() => handleTestUser('cliente1@ticketdev.com')}>Cliente</Button>
          <Button onClick={() => handleTestUser('portaria@ticketdev.com')}>Portaria</Button>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  )
}