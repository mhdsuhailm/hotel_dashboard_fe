// import Sidebar from '../components/layout/Sidebar'
// import Topbar from '../components/layout/Topbar'
// import StatCard from '../components/cards/StatCard'
// import { DollarSign, ShoppingBag, Users, XCircle } from 'lucide-react'
// import { useEffect, useState } from "react";
// import axios from "axios";

// const [stats, setStats] = useState(null);
// const AdminDashboard = () => {
//   useEffect(() => {
//     const fetchStats = async () => {
//       const res = await axios.get("http://localhost:5000/api/dashboard/stats");
//       setStats(res.data);
//     };

//     fetchStats();
//   }, []);

//   const formattedChart = stats.incomeTrend.map(item => ({
//     value: item.total
//   }));

//   return (
//     <div className='h-screen flex overflow-hidden'>
//       <Sidebar />

//       {/* <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         <h1 className="text-2xl font-bold mb-6">Dashboard</h1> */}

//       {/* <DashboardCards />
//         <OrderTable /> */}
//       {/* </div> */}
//       <div className='flex-1 flex flex-col'>
//         <Topbar />
//         <div className='flex-1 bg-[#0D0B0A] p-6 overflow-y-auto'>
//           <div className='grid grid-cols-4 gap-4 mb-6'>
//             <StatCard
//               title="Today's Income"
//               value='$1200.14'
//               change='-2.4%'
//               isPositive={false}
//               icon={<DollarSign size={16} />}
//               chartData={formattedChart}
//             />

//             <StatCard
//               title="Today's Orders"
//               value='240'
//               change='+5.3%'
//               isPositive={true}
//               icon={<ShoppingBag size={16} />}
//               chartData={formattedChart}
//             />

//             <StatCard
//               title="Today's Customers"
//               value={stats.customers}
//               change='+5.6%'
//               isPositive={true}
//               icon={<Users size={16} />}
//               chartData={formattedChart}
//             />

//             <StatCard
//               title='Canceled Order'
//               value={stats.cancelled}
//               change={`${stats.ordersChange}%`}
//               isPositive={stats.ordersChange >= 0}
//               icon={<XCircle size={16} />}
//               chartData={formattedChart}
//             />
//           </div>

//           <div className='flex-1 overflow-y-auto p-6 bg-[#0D0B0A] text-white'>
//             Dashboard Content
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import StatCard from '../components/cards/StatCard'
import RevenueChart from '../components/charts/RevenueChart'
import BestItemCard from '../components/cards/BestItemCard'
import TrendingMenu from "../components/cards/TrendingMenu";
import OrderTable from '../components/tables/OrderTable';
import { DollarSign, ShoppingBag, Users, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [range, setRange] = useState('1Y')
  const [bestItems, setBestItems] = useState([]);
  // const bestItems = [
  //   {
  //     name: "Chicken Burger",
  //     orders: 64,
  //     price: 10.99,
  //     image: "https://i.imgur.com/5Aqgz7o.png"
  //   },
  //   {
  //     name: "Pizza",
  //     orders: 48,
  //     price: 12.99,
  //     image: "https://i.imgur.com/8Km9tLL.png"
  //   },
  //   {
  //     name: "Fried Chicken",
  //     orders: 80,
  //     price: 15.99,
  //     image: "https://i.imgur.com/YOUR_IMG.png"
  //   }
  // ];
  const trendingItems = [
  {
    name: "Skewered Foods",
    orders: 58,
    price: 16.99,
    image: "https://i.imgur.com/3Q3QZ6K.png"
  },
  {
    name: "Cheese Pizza",
    orders: 48,
    price: 12.99,
    image: "https://i.imgur.com/8Km9tLL.png"
  },
  {
    name: "Chicken Burger",
    orders: 64,
    price: 10.99,
    image: "https://i.imgur.com/5Aqgz7o.png"
  },
  {
    name: "Fried Chicken",
    orders: 108,
    price: 18.99,
    image: "https://i.imgur.com/YOUR_IMG.png"
  }
];
useEffect(() => {
  const fetchBestItems = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/stats/bestsellers`
        // `http://localhost:5000/api/stats/bestsellers`
      );

      const formatted = res.data.map(item => ({
        name: item.name,
        orders: Math.floor(Math.random() * 100), // TEMP (if no orders column)
        price: item.price, // TEMP (replace if you have price)
        image: item.image?.[0] || "/fallback.png"
      }));

      setBestItems(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  fetchBestItems();
}, []);
  useEffect(() => {
    const fetchStats = async () => {
      // const res = await axios.get("http://localhost:5000/api/dashboard/stats");
      // const res = await axios.get(
      //   `http://localhost:5000/api/dashboard/stats?range=${range}`
      // )
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dashboard/stats?range=${range}`
      )
      setStats(res.data)
    }

    fetchStats()
  }, [])

  // ✅ Safe chart data
  const formattedChart =
    stats?.incomeTrend?.map(item => ({
      value: Number(item.total)
    })) || []

  // const revenueData =
  // stats?.incomeTrend?.map((item, index) => {
  //   const date = new Date(item.date);

  //   return {
  //     label: date.toLocaleString("default", { month: "short" }).toUpperCase(),
  //     value: Number(item.total),
  //     highlight: index === stats.incomeTrend.length - 2 // highlight recent
  //   };
  // }) || [];
  const rawData = (stats?.incomeTrend || []).map(item => {
    const date = new Date(item.date)

    let label = ''

    if (range === '1W') {
      label = date.toLocaleDateString('en-US', { weekday: 'short' })
    } else if (range === '1M') {
      label = date.getDate()
    } else {
      label = date.toLocaleString('default', { month: 'short' })
    }

    return {
      label,
      value: Number(item.total)
    }
  })

  // GROUP SAME LABELS
  const revenueData = Object.values(
    rawData.reduce((acc, item) => {
      if (!acc[item.label]) {
        acc[item.label] = { label: item.label, value: 0 }
      }
      acc[item.label].value += item.value
      return acc
    }, {})
  )

  return (
    <div className='h-screen flex overflow-hidden'>
      <Sidebar />

      <div className='flex-1 flex flex-col min-w-0'>
        <Topbar />

        <div className='flex-1 bg-[#0D0B0A] p-6 overflow-y-auto'>
          {/* ✅ Only render when data available */}
          {stats && (
            <div className='grid grid-cols-4 gap-4 mb-6'>
              <StatCard
                title="Today's Income"
                value={`$${stats.income}`}
                change={`${stats.incomeChange}%`}
                isPositive={stats.incomeChange >= 0}
                icon={<DollarSign size={16} />}
                chartData={formattedChart}
              />

              <StatCard
                title="Today's Orders"
                value={stats.orders}
                change={`${stats.orderChange}%`}
                isPositive={stats.orderChange >= 0}
                icon={<ShoppingBag size={16} />}
                chartData={formattedChart}
              />

              <StatCard
                title="Today's Customers"
                value={stats.customers}
                change={`${stats.customerChange}%`}
                isPositive={stats.customerChange >= 0}
                icon={<Users size={16} />}
                chartData={formattedChart}
              />

              <StatCard
                title='Cancelled Orders'
                value={stats.cancelled}
                change={`${stats.cancelChange}%`}
                isPositive={stats.cancelChange >= 0}
                icon={<XCircle size={16} />}
                chartData={formattedChart}
              />
            </div>
          )}

          <div className='grid grid-cols-12 gap-6'>
            {/* BIG CHART */}
            <div className='col-span-6 h-32'>
              <RevenueChart
                data={revenueData}
                range={range}
                setRange={setRange}
              />
            </div>
            <div className='col-span-3 h-52.5'>
              <BestItemCard items={bestItems} />
            </div>

            {/* RIGHT SIDE (later widgets) */}
            <div className='col-span-3'>
              <TrendingMenu items={trendingItems} />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-6">

            {/* LEFT - ORDER TABLE */}
            <div className="col-span-12">
              <OrderTable />
            </div>

            {/* RIGHT - CUSTOMER MAP */}
            {/* <div className="col-span-3">
              <div className="bg-[#161212] border border-[#241E1E] rounded-xl p-4 h-full text-white">
                Customer Map (next step)
              </div>
            </div> */}

          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
