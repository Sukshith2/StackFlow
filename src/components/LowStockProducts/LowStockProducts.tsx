
import Styles from './LowStockProducts.module.css';
import { AlertTriangle } from 'lucide-react';

interface Products {
    id : number;
    name : string;
    sku : string;
    stock : number;
    minStock : number;
}

const products : Products[] = [
    {
    id: 1,
    name: "Wireless Mouse",
    sku: "WM-101",
    stock: 5,
    minStock: 10,
    },

    {
    id: 2,
    name: "Mechanical Keyboard",
    sku: "MK-202",
    stock: 3,
    minStock: 15,
  },
    {
    id: 3,
    name: "USB-C Hub",
    sku: "USB-303",
    stock: 8,
    minStock: 20,
  },

];

const LowStockProducts = () => {
        const lowStcockproduct = products.filter((product) => product.stock < product.minStock);

  return (
    <section className={Styles.ProductsContainer}>
        <div className={Styles.heading}>
             <h2>Low-Stock Products</h2>
        <p>Products requiring restocking</p>
        </div>

        <div className={Styles.productList}>
        {lowStcockproduct.map((pro)=> (
                <div className={Styles.product} key={pro.id}>
                    <div className={Styles.iconWrapper}>
                      <AlertTriangle size={18} />
                    </div>

                    <div className={Styles.productInfo}>
                         <h3>{pro.name}</h3>
                         <p>SKU: {pro.sku}</p>
                    </div>      

                    <div className={Styles.stockInfo}>
                      <strong>{pro.stock} left</strong>
                     <span>Min: {pro.minStock}</span>
                    </div>
                </div>
        ))}

        </div>

    </section>
  )
}

export default LowStockProducts;