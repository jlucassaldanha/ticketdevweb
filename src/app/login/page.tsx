import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Card className='flex flex-col items-center justify-center'>
        <CardHeader className='flex justify-center'>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className='max-w-[400px] flex flex-col gap-3'>
          <Field>
            <Label htmlFor='username'>Usuário</Label>
            <Input id="username" />
          </Field>
          <Field>
            <Label htmlFor='password'>Senha</Label>
            <Input id="password" />
          </Field>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button>Login</Button>
          <div>
            Não possui uma conta?
            <Link className="text-blue-600 font-bold" href={'register'}>Registrar</Link>
          </div>
          
        </CardFooter>
      </Card>
    </div>
  )
}