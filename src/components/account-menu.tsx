import { DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Building, ChevronDown, LogOutIcon } from "lucide-react";

export function AccountMenu(){
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 select-none"
          >
            Orders.shop
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span>Victor Amaral</span>
            <span className="text-xs font-normal text-muted-foreground">
              victor.email@teste.com
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Building className="w-h h-4 mr-2" />
            <span>Perfil da loja</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-rose-500 dark:rose-400">
            <LogOutIcon className="w-h h-4 mr-2" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}