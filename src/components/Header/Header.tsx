import { Bell, Menu, Search,  ChevronDown } from 'lucide-react'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.headerleft}>
            <button type="button" className={styles.menuButton} aria-label="Open Navigation">
            <Menu size={24} />
            </button>
            <div className={styles.searchBox}>
                <Search size={20}/>
                 <input type="text" placeholder ="Search..."  aria-label="Search anything"/>
                <span className={styles.shortcut}>Ctrl K</span>

            </div>
        </div>


        <div className={styles.headerRight}>
            <button className={styles.notification} aria-label="Notifications">
                <Bell size={21}/>
                <span className={styles.notificationDot}></span>

            </button>

        <div className={styles.profile}>
            <div className={styles.avatar}>
                S
            </div>
            <div className={styles.profileInfo}>
                <h4>John Doe</h4>
            <span>Administrator</span>        
            </div>

            <ChevronDown size={20}/>

           </div>

        </div>

        
    </header>
  )
}

export default Header



