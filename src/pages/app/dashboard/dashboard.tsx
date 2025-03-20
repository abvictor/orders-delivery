import { DayOrdersAmountCard } from "./day-orders-amount-card";
import { MonthCanceledAmountOrders } from "./month-canceled-orders-amount-card";
import { MonthOrdersAmountCard } from "./month-orders-amount-card";
import { MonthRevenueCard } from "./month-revenue-card";
import { PopularProductsChart } from "./popular-products";
import { RevenueChart } from "./revenue-chart";

export function Dashboard() {
  return (
    <>
      <title>Dashboard | Orders.shop</title>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledAmountOrders />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
