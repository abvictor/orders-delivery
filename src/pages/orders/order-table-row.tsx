import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "./order-status";

import { ptBR } from "date-fns/locale";
import { formatDistanceToNow } from 'date-fns'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { approveOrder } from "@/api/approve-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";


export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}


export function OrderTableRow({ order }: OrderTableRowProps) {

  const [isDetailOpen, setIsDetailsOpen] = useState(false);

  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus){
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders']
      })

      ordersListCache.forEach(([ cachedKey, cachedData ]) => {
        if(!cachedData){
          return 
        }
        queryClient.setQueryData<GetOrdersResponse>(cachedKey, {
          ...cachedData,
          orders: cachedData.orders.map((order) => {
            if(order.orderId === orderId){
              return {...order, status}
            }

            return order
          })
        })
      })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }){
      updateOrderStatusOnCache(orderId, 'canceled')
    }
  });

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
    mutationFn: approveOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "processing");
    },
  });

    const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivered");
      },
    });

      const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
        mutationFn: dispatchOrder,
        async onSuccess(_, { orderId }) {
          updateOrderStatusOnCache(orderId, "delivering");
        },
      });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger>
            <Button variant="ghost" size="sm">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails open={isDetailOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order?.orderId}
      </TableCell>
      <TableCell>
        {formatDistanceToNow(order?.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order?.status} />
      </TableCell>
      <TableCell>{order?.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order?.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell>

        {order.status === "pending" && (
          <Button
            variant="outline"
            disabled={isApprovingOrder}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
          >
            <ArrowRight className="w-3 h-3 mr-2" />
            Aprovar
          </Button>
        )}

        {order.status === "processing" && (
          <Button
            variant="outline"
            disabled={isDispatchingOrder}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
          >
            <ArrowRight className="w-3 h-3 mr-2" />
            Em entrega
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            variant="outline"
            disabled={isDeliveringOrder}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
          >
            <ArrowRight className="w-3 h-3 mr-2" />
            Entregue
          </Button>
        )}

      </TableCell>
      <TableCell className="font-medium">
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancelingOrder
          }
          variant="ghost"
        >
          <X className="w-3 h-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}