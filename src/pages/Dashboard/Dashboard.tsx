
 import Styles from './Dashboard.module.css'
import { AlertTriangle, Package, ShoppingCart, Warehouse } from 'lucide-react'
import StatCard from '../../components/StartCard/StatCard'
import RecentOrders from '../../components/RecentOrders/RecentOrders'
import LowStockProducts from '../../components/LowStockProducts/LowStockProducts'

 const stats = [
    {
        id:1,
        title : "Total Products",
        value : 1250,
         description: "Products registered",
        icon : Package
    },
    {
        id : 2,
        title : "Total Stock",
        value : 8500,
        description: "Units available",
        icon: Warehouse,
    },
    {
    id: 3,
    title: "Low Stock Items",
    value: 24,
    description: "Products need restocking",
    icon: AlertTriangle,
  },
  {
    id: 4,
    title: "Total Orders",
    value: 350,
    description: "Orders received",
    icon: ShoppingCart,
  },
 ]

const Dashboard = () => {
  return (
    <div className={Styles.dashBoard}>
        <div className={Styles.pageHeading}>
            <h1>DashBoard</h1>
            <p> Welcome back! Here's your inventory overview.</p>
        </div>

        <div className={Styles.statsGrid}>
            {stats.map((item)=>(
                <StatCard 
                key={item.id}
                title={item.title}
                value={item.value}
            description={item.description}
            icon={item.icon}              
                /> 
            ))}
            
        </div>

        <div className={Styles.overview}>
        <RecentOrders/>
        <LowStockProducts/>
        </div>
    </div>
  )
}

export default Dashboard;