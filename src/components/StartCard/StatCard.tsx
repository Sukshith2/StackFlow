import type { LucideIcon } from "lucide-react";
import Styles from './StatCard.module.css';


interface StateCardProps {
    title: string;
    value: number;
    description : string;
    icon: LucideIcon;
}

const StatCard = ({title, value, description, icon: Icon} : StateCardProps) => {
  return (
  <article className={Styles.card}>

    <div className={Styles.CardHeader}>
        <h3>{title}</h3>

        <div className={Styles.iconWrapper}>
            <Icon size={24}/>
        </div>
    </div>

    <h2 className={Styles.value}>{value}</h2>
    <p className={Styles.description}>
         {description}
    </p>



  </article>
  )
}

export default StatCard