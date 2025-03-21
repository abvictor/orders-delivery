import { api } from "@/lib/axios";


interface GetManagedRestaurant {
    id: string;
    name: string;
    managerId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    description: string | null
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurant>("/me");

  return response.data;
}