

import Styles from './RecentOrders.module.css';

type orderStatus = "Delivered" | "Pending" | "Processing";

interface Orders{
    Id: string,
    customer:string,
    amount: number,
    date:string,
    status: orderStatus,
}


const recentOrder: Orders[] = [
    {
        Id : "ORD-001",
        customer : "Rahul Sharma",
        amount : 4500,
        date : "2026-10-28",
        status : "Delivered",
    }, 
    {
         Id: "ORD-002",
    customer: "Priya Kumar",
    date: "2026-10-29",
    amount: 2800,
    status: "Pending",

    },{
        Id: "ORD-003",
    customer: "Amit Patel",
    date: "2026-10-30",
    amount: 6200,
    status: "Processing",
    }

]

const RecentOrders = () => {
  return (
    <section className={Styles.orderContainer}>
        <div className={Styles.heading}>
            <h2>Recent Orders</h2>
        <p>Latest customer orders</p>
        </div>

        <div className={Styles.tableWrapper}>
            <table className={Styles.table}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {recentOrder.map((orderItem)=> (
                        <tr key={orderItem.Id}>
                            <td>{orderItem.Id}</td>
                            <td>{orderItem.customer}</td>
                            <td>{orderItem.date}</td>
                             <td>₹{orderItem.amount.toLocaleString("en-IN")}</td>
                             <td>
                                <span className={`${Styles.status} ${Styles[orderItem.status.toLowerCase()]}`}>
                                    {orderItem.status}
                                </span>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    </section>
  )
}

export default RecentOrders;