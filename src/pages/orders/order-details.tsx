import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// interface OrderDetailsProps {

// }

export function OrderDetails(){
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pedido: XXXX</DialogTitle>
          <DialogDescription>Detalhes do pedido</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                    <span className="font-medium text-muted-foreground">
                      Pendente
                    </span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">
                      Victor Amarla Bento
                    </span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Telefone</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">
                      (16) 99750-0356
                    </span>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">
                      victor.teste@email.com
                    </span>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Realizado há</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">
                      há 3 minutos
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Pastel do cardoso</TableCell>
                <TableCell className="text-right">10</TableCell>
                <TableCell className="text-right">5,50</TableCell>
                <TableCell className="text-right">55,00</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium">55, 00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </DialogContent>
    );
}