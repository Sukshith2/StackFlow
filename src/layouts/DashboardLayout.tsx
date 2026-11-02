
import styles from './DashboardLayout.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className={styles.dashboardLayout}>

        <Sidebar/>
        <div className={styles.mainArea}>
        <Header/>
        <main className={styles.mainContent}>
             <Outlet />
        
        </main>

        </div>
    </div>

  )
}

export default DashboardLayout;