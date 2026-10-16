import AppSidebar from "./app-sidebar";
import StatisticsBlock from "./statistics";
import SalesOverviewChart from "./sales-overview-chart";
import EarningReportChart from "./earning-report-chart";
import TopProductTable from "./top-product-table";
import SalesByCountryWidget from "./salesbycountrywidget";
export default function Page() {
  return (
    <AppSidebar>
      <div className="grid grid-cols-12 gap-6 p-6 max-w-7xl mx-auto">
        <div className="col-span-12">
          <StatisticsBlock />
        </div>
        <div className="xl:col-span-8 col-span-12">
          <SalesOverviewChart />
        </div>
        <div className="xl:col-span-4 col-span-12">
          <EarningReportChart />
        </div>
        <div className="xl:col-span-8 col-span-12">
          <TopProductTable />
        </div>
        <div className="xl:col-span-4 col-span-12">
          <SalesByCountryWidget />
        </div>
      </div>
    </AppSidebar>
  );
}
