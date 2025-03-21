import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";


export function Orders() {

  const [ searchParams, setSearchParams ] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

    const orderId = searchParams.get("orderId");
    const customerName = searchParams.get("customerName");
    const status = searchParams.get("status");
    
    const { data: result } = useQuery({
      queryKey: ["orders", pageIndex, orderId, customerName, status],
      queryFn: () => getOrders({ pageIndex, customerName, orderId, status: status === 'all' ? null : status }),
    });

    function handlePaginate(pageIndex: number) {
      setSearchParams((state) => {
        state.set("page", (pageIndex + 1).toString());

        return state;
      });
    }

   return (
     <>
       <title>Pedidos | Orders.shop</title>
       <div className="flex flex-col gap-4">
         <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
       </div>

       <div className="space-y-2.5">
         <OrderTableFilters />

         <div className="border rouded-md">
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead className="w-[64px]"></TableHead>
                 <TableHead className="w-[140px]">Identicador</TableHead>
                 <TableHead className="w-[180px]">Realizado há</TableHead>
                 <TableHead className="w-[140px]">Status</TableHead>
                 <TableHead>Cliente</TableHead>
                 <TableHead className="w-[164px]">Total do pedido</TableHead>
                 <TableHead className="w-[132px]"></TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {result &&
                 result.orders.map((order) => {
                   return <OrderTableRow key={order.orderId} order={order} />;
                 })}
             </TableBody>
           </Table>
         </div>

         {result && (
           <Pagination
             onPageChange={handlePaginate}
             pageIndex={result.meta.pageIndex}
             totalCount={result.meta.totalCount}
             perPage={result.meta.perPage}
           />
         )}
       </div>
     </>
   );
}