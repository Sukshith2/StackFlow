import {Pencil, Plus, Search, Trash } from 'lucide-react';
import Styles from './Products.module.css';
import { useState } from 'react';
import AddProduct, { type ProductFormDataProps,} from './AddProduct';
type statusProduct = "In Stock" | "Low Stock" | "Out of Stock";

interface Product {
  id : number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  minStock : number;
  status: statusProduct;
}

const products : Product[] =[
    {
        id: 1,
    name: "Wireless Mouse",
    sku: "WM-101",
    category: "Accessories",
    price: 799,
    stock: 45,
    minStock: 0,
    status: "In Stock",
    },

    {
    id: 2,
    name: "Mechanical Keyboard",
    sku: "MK-202",
    category: "Electronics",
    price: 2499,
    stock: 5,
    minStock: 0,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "USB-C Hub",
    sku: "USB-303",
    category: "Accessories",
    price: 1299,
    stock: 8,
    minStock: 0,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "Monitor",
    sku: "MN-404",
    category: "Electronics",
    price: 12999,
    stock: 0,
    minStock: 0,
    status: "Out of Stock",
  },
]

const Products = () => {
    const [searchTem, setsearchTem] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [sort, setSort] = useState("default");
    const [Currentpage, setCurrentPage] = useState(1);
    const [itemPerPage, SetitemPerPage] = useState(5);
    const [ProductList, setProductList] = useState<Product[]>(products);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [showForm, setShowform] = useState(false);
    


const filterProducts = ProductList.filter((products)=>{
    const search = searchTem.toLocaleLowerCase();
    const matchedSearch = products.name.toLowerCase().includes(search) || products.sku.toLowerCase().includes(search) || products.category.toLowerCase().includes(search)
    const matchedFilter = selectedStatus === "All" || products.status === selectedStatus; 
    return matchedSearch && matchedFilter;

});

const SortProducts = [...filterProducts].sort((a,b)=>{
    switch(sort){
        case "name" :
            return a.name.localeCompare(b.name);
        case "price-low" :
            return a.price - b.price;
        case "price-high":
            return b.price - a.price;
        case "stock-low":
            return a.stock - b.stock;
        case "stock-high":
            return b.stock - a.stock;

        default :
            return 0;
    }
})

const totalProducts = SortProducts.length;
const totalPages = Math.ceil(totalProducts / itemPerPage);
const startIndex = (Currentpage -1 ) * itemPerPage;
const paginatedProducts = SortProducts.slice(startIndex, startIndex + itemPerPage);
const HandleProdcuts= (newProduct : { 
    name: string, 
    sku : string, 
    category: string;
    price: number;
    stock: number;
    minStock: number; }) =>{
        const products : Product={

            id: Date.now(),
            name : newProduct.name,
            sku : newProduct.sku,
            category : newProduct.category,
            price: Number(newProduct.price),
            stock : Number(newProduct.stock),
            minStock : Number(newProduct.minStock),
            status : (newProduct.stock === 0  ? "Out of Stock" : Number(newProduct.stock) <= Number(newProduct.minStock) ? "Low Stock" : "In Stock")
        };
console.log("2. Created product:", products);
       setProductList((prev)=> [...prev, products]);
        setShowform(false);
    
}

const HandleUpdatedProduct = (updatedData : ProductFormDataProps) => {

    if(!editProduct) return;

    setProductList((prev) => prev.map((pr)=> (
        pr.id === editProduct.id ? {
            ...pr, updatedData,
             price: Number(updatedData.price),
            stock : Number(updatedData.stock),
            minStock : Number(updatedData.minStock),
            status : (updatedData.stock === 0  ? "Out of Stock" : Number(updatedData.stock) <= Number(updatedData.minStock) ? "Low Stock" : "In Stock")
        } : pr
        
    )));

    setEditProduct(null);
    setShowform(false);       
    
}

const HandleDeleteProduct = (id : number) =>{
        const confirmDeleted = window.confirm("Are you sure want to deleted the product");

       if (!confirmDeleted) return;
       
       setProductList((prev)=> prev.filter((product) => product.id !== id));
}
  return (
    <div className={Styles.products}>
        <div className={Styles.pageHeading}>
            <div>
          <h1>Products</h1>
          <p>Manage your inventory products.</p>
        </div>

        <button className={Styles.addButton} onClick={() => setShowform(true)}>
            <Plus size={24}/>
            Add Product
        </button>
        </div>

        {showForm && (<AddProduct key={editProduct?.id ?? "new" } 
        onCancel={() => {setShowform(false), setEditProduct(null)}} 
        initialData = { editProduct ? {
         name : editProduct.name,
         sku : editProduct.sku,
         category: editProduct.category,
            price: editProduct.price,
            stock: editProduct.stock,
            minStock: editProduct.minStock,

        } :
        undefined 
        } 
        isEditing = {!!editProduct} onSubmit={editProduct ? HandleUpdatedProduct : HandleProdcuts} />)}

        {!showForm && (
        <div className={Styles.toobar}>
            <div className={Styles.searchBox}>
                <Search size={18}/>
                <input type="text" placeholder='Search Placeholder' value={searchTem} onChange={(e)=>setsearchTem(e.target.value)} />
            </div>
            <select className={Styles.filterButton} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="All">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
            </select>

            <select className={Styles.filterButton} value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="default">Sort By</option>
                <option value="name">Name: A to Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="stock-low">Stock: Low to High</option>
                <option value="stock-high">Stock: High to Low</option>
            </select>

        </div>
)}
        <div className={Styles.tableContainer}>
            <div className={Styles.tabel}>
            <thead>
                <tr>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>minStock</th>
                <th>Status</th>
                </tr>
          </thead>

            <tbody>

                {paginatedProducts.map((prod)=> (
                    <tr  key={prod.id}>
                        <td >{prod.name}</td>
                        <td>{prod.sku}</td>
                        <td>{prod.category}</td>
                        <td>₹{prod.price.toLocaleString("en-IN")}</td>
                        <td>{prod.stock}</td>
                        <td>{prod.minStock}</td>
                        <td>{prod.status}</td>
                        <td>
                           <button onClick={() => {setEditProduct(prod); setShowform(true)}} title='Edit Product'>
                            <Pencil size={18}/>
                           </button>
                        </td>
                        <td>
                       <button onClick={() => {HandleDeleteProduct(prod.id)} } title='Delete Product'>
                            <Trash size={18}/>
                           </button>
                        </td>
                     </tr>
                ))}

            </tbody>


            </div>
        </div>
    

        <div className={Styles.pagination}>
            <div className={Styles.paginationInfo}>
                <span>Rows per page:</span>

                <select value={itemPerPage} onChange={(e) => { SetitemPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                 </select>


                 <span>{totalPages === 0 ? "0" : `${startIndex + 1}-${Math.min(
            startIndex + itemPerPage,totalProducts)} of ${totalProducts}`}</span>
            </div>

            <div className={Styles.paginationButtons}>
                <button disabled={Currentpage === 1} onClick={() => setCurrentPage((prev)=> prev -1)}>
                Previous    
                </button>

                <span> Page {Currentpage} of {Math.max(totalPages, 1)}</span>

                  <button disabled={Currentpage >= totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}    >
                    Next
                  </button>
            </div>

        </div>
        

    </div>
                 
  )
}

export default Products;