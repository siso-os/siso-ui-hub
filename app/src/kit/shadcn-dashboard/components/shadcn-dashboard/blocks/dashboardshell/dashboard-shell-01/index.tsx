"use client";
import OverviewTab from "./OverviewTabCode";
import UpdateBanner from "./UpdateBannerCode";
import TotalSales from "./TotalSalesCode";
import TotalOrders from "./TotalOrdersCode";
import TotalProfit from "./TotalProfitCode";
import AdvertisementCost from "./AdvertisementCostCode";
import TotalAssets from "./AssetsBlockCode";
import ProjectsOrders from "./ProjectsOrdersCode";

const DashboardShell01 = () => {
  return (
    <div className="w-full contain-layout max-w-7xl mx-auto py-6" id="dashboard-shell-01">
        <div className="grid grid-cols-12 gap-4 p-0 bg-transparent">
          <div className="col-span-12">
            <OverviewTab />
          </div>
          <div className="col-span-12">
            <UpdateBanner />
          </div>
          <div className="lg:col-span-7 col-span-12">
            <TotalSales />
          </div>
          <div className="lg:col-span-5 col-span-12">
            <TotalAssets />
          </div>
          <div className="lg:col-span-4 col-span-12 ">
            <TotalOrders />
          </div>
          <div className="lg:col-span-4 col-span-12">
            <TotalProfit />
          </div>
          <div className="lg:col-span-4 col-span-12">
            <AdvertisementCost />
          </div>
          <div className="col-span-12">
            <ProjectsOrders />
          </div>
        </div>
    </div>
  );
}

export default DashboardShell01
