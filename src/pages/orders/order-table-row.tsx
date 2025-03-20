import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";



export function OrderTableRow(){
    return (
      <TableRow>
        <TableCell>
          <Dialog>
            <DialogTrigger>
              <Button variant="ghost" size="sm">
                <Search className="h-3 w-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </DialogTrigger>
            <OrderDetails />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          ff156ds1f1ssd5
        </TableCell>
        <TableCell>há 15 minutos</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-400"></span>
            <span>Pendente</span>
          </div>
        </TableCell>
        <TableCell>Isabelle Marciano Pellarin</TableCell>
        <TableCell className="font-medium">R$ 149,90</TableCell>
        <TableCell>
          <Button variant="outline">
            <ArrowRight className="w-3 h-3 mr-2" />
            Aprovar
          </Button>
        </TableCell>
        <TableCell className="font-medium">
          <Button variant="ghost">
            <X className="w-3 h-3 mr-2" />
            Cancelar
          </Button>
        </TableCell>
      </TableRow>
    );
}