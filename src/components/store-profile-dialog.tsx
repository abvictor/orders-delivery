import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagedRestaurant } from "@/api/get-manage-restaurant";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";


const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string()
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog(){
    const queryClient = useQueryClient()
    const { data: managedRestaurant } =
    useQuery({
        queryKey: ["managed-restaurant"],
        queryFn: getManagedRestaurant,
        staleTime: Infinity
    });

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onSuccess(_, { name, description }){
          const cached = queryClient.getQueryData(['managed-restaurant'])
          
          if(cached){
            queryClient.setQueryData(["managed-restaurant"], {
              ...cached, name, description
            });
          }


        }
    });

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<StoreProfileSchema>({
      resolver: zodResolver(storeProfileSchema),
      values: {
        name: managedRestaurant?.name ?? '',
        description: managedRestaurant?.description ?? ''
      }
    });


    async function handleUpdateProfile(data: StoreProfileSchema){
       try{
        await updateProfileFn({
           description: data.description,
           name: data.name,
         });
        toast.success("Perfil atualizado com sucesso.");
       }catch {
        toast.error('Ocorreu um erro ao atualizar as informações.')
       }
    }

    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perfil da loja</DialogTitle>
          <DialogDescription>
            Atualize as informações visiveis ao seu cliente
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className="space-y-4 py-4'">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nome</Label>
              <Input className="col-span-3" id="name" {...register("name")} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Descrição</Label>
              <Textarea
                className="col-span-3"
                id="description"
                {...register("description")}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    );
}