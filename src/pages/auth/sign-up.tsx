import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";


import { z } from 'zod'

const signUpForm = z.object({
  email: z.string().email(),
  phone: z.string(),
  managerName: z.string(),
  restaurantName: z.string()
})

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
    const navigate = useNavigate()

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>();

  async function handleSignIn(data: SignUpForm) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.success('Restaurante cadastrado com sucesso!', {
      action: {
        label: 'Acessar painel',
        onClick: () => navigate('/sign-in')
      }
    })
  }

  return (
    <>
      <title>Cadastro | Orders.shop</title>
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant="link">
          <Link to="/sign-in" className="">
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
              <Label htmlFor="restaurant">Nome do estabelecimento</Label>
              <Input
                id="restaurant"
                type="restaurant"
                {...register("restaurantName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manager">Nome do gerente</Label>
              <Input id="manager" type="text" {...register("managerName")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" type="phone" {...register("phone")} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Acessar painel
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <a className="underline underline-offset-1" href="#">Termos de serviço e políticas de privacidade.</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
