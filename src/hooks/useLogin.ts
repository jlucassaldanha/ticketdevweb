import { loginAction } from '@/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const formSchema = z.object({
  email: z.string().min(1, 'E-mail é um campo obrigatório'),
  password: z.string().min(1, 'Senha é um campo obrigatório')
})

type LoginFormData = z.infer<typeof formSchema>

type LoginCredentials = {
  email: string
  password: string
}

export default function useLogin() {
  const router = useRouter()

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (credentials: LoginCredentials) => loginAction(credentials.email, credentials.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['login'] })
      router.push('/')
    },
    onError: (error) => {
      toast.error("Erro ao acessar.", { description: error.message || "Verfique suas credenciais e tente novamente."})
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