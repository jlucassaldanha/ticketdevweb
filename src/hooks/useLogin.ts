import { apiFetch } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
  email: z.string().min(1, 'E-mail é um campo obrigatório'),
  password: z.string().min(1, 'Senha é um campo obrigatório')
})

type LoginFormData = z.infer<typeof formSchema>

export interface LoginApiResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'CONSUMER' | 'ORGANIZER' | 'VALIDATOR';
  };
}

type LoginCredentials = {
  email: string
  password: string
}

const postLogin = async (email: string, password: string) => {
  const response = await apiFetch<LoginApiResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}

export default function useLogin() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (credentials: LoginCredentials) => postLogin(credentials.email, credentials.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['login'] })
    }
  })

  const { handleSubmit, control, reset } = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })


  function onSubmit(data: LoginFormData) {
    mutate({ email: data.email, password: data.password })
    redirect('/')
  }

  const fillWithTestUser = (testUser: string) => {
    reset({
      email: testUser,
      password: "SenhaTeste123"
    })
  }

  return {
    control,
    isPending,
    handleSubmit,
    onSubmit,
    fillWithTestUser
  }
}