import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom";
import { toast } from "sonner";


import { z } from 'zod'

const signInForm = z.object({
  email: z.string().email()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>();

  async function handleSignIn(data: SignInForm) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.success('Link de autenticação enviado para o seu e-mail.', {
      action: {
        label: 'Reenviar',
        onClick: () => handleSignIn(data)
      }
    })
  }

  return (
    <>
      <title>Entrar | Orders.shop</title>
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant="link">
          <Link to="/sign-up" className="">
            Novo estabelecimento
          </Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6 ">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p>Acompanhe suas vendas pelo painel parceiro</p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
