import { registerAction } from '@/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Nome é um campo obrigatório'),
  email: z.string().min(1, 'E-mail é um campo obrigatório'),
  password: z.string().min(1, 'Senha é um campo obrigatório'),
  role: z.string().min(1, 'Tipo de conta é um campo obrigatório')
})

type RegisterFormData = z.infer<typeof formSchema>

export default function useRegister() {
  const router = useRouter()

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (credentials: RegisterFormData) => registerAction(credentials.name, credentials.email, credentials.password, credentials.role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['register'] })
      router.push('/login')
    }
  })

  const { handleSubmit, control } = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: ""
    }
  })

  function onSubmit(data: RegisterFormData) {
    mutate({ name: data.name, email: data.email, password: data.password, role: data.role })
  }

  return {
    control,
    isPending,
    handleSubmit,
    onSubmit
  }
}