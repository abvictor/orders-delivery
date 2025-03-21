import { api } from "@/lib/axios";


interface GetProfileResponse {
  id: string;
  email: string;
  phone: string;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
  name: string;
}

export async function getProfile(){
    const response = await api.get<GetProfileResponse>("/me");
    
    return response.data
}