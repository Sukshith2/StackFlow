import { LayoutDashboard, Package, Warehouse, ShoppingCart, Users, Settings, LogOut} from 'lucide-react'
import styles from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
        <div className={styles.logo}>
            <Package size={32} />
            <h2>Stackflow</h2>
        </div>

        <nav className={styles.navigations}>
            <p className={styles.heading}>MENU</p>
            <NavLink to="/" end className={({ isActive }) => `${styles.navlink} ${isActive ? styles.active : ''}`}>
            <LayoutDashboard size={20} /> 
            <span>Dashboard</span>
            </NavLink> 

            <NavLink to="/products" className={({isActive})=> `${styles.navlink} ${isActive ? styles.active : ''}`}>
                <Package size={20} />
                <span>Products</span>
            </NavLink>
             <NavLink to="/inventory" className={({ isActive }) => `${styles.navlink} ${isActive ? styles.active : ''}`}>
                <Warehouse size={20} />
                <span>Inventory</span>
            </NavLink>

            <NavLink to="/orders" className={({isActive})=> `${styles.navlink} ${isActive ? styles.active : ''}`}>
            <ShoppingCart size={20} />
            <span>Orders</span>
            </NavLink>

            <NavLink to="/customers" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ''}`}>
            <Users size={20} />
            <span>Customers</span>
            </NavLink>
            
            <p className={styles.heading}>GENERAL</p>

            <NavLink to="/settings" className={({isActive}) => `${styles.navlink} ${isActive ? styles.active : ''}`}>
            <Settings size={20} />
            <span>Settings</span>
            </NavLink>

        </nav>
        <button className={styles.logout}>
        <LogOut size={20}/>
        <span>Logout</span>
        </button>
    </aside>
  )
}

export default Sidebar;