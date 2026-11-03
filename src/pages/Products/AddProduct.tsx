import React, { useState } from 'react'


import Styles from './Products.module.css';

interface ProductFormDataProps {
    name: string;
    sku: string;
    category: string;
    price: number;
    stock:number;
    minStock: number;
}

interface addProductProps {
    onCancel: () => void;
    onSubmit : (productData : ProductFormDataProps) => void;
}


const AddProduct = ({onCancel, onSubmit} : addProductProps) => {
    const [formData, setFormData] = useState<ProductFormDataProps>({name: "",
        sku: "", 
        category: "", price: 0, stock:0 , minStock: 0});


        const [error, SetError] = useState<Partial <Record<keyof ProductFormDataProps, string>>>({});

        const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
            const {name, value} = event.target;
            setFormData((prev)=> ({ ...prev, [name] : value}));           
        }


        const validateForm = () => {
            const newErrors : Partial<Record<keyof ProductFormDataProps, string>> ={};

            if(!formData.name.trim()){
                newErrors.name= "Product name is required";
            }

            if(!formData.sku.trim()){
                newErrors.sku = "SKU is required";
            }
            if (!formData.category) {
            newErrors.category = "Please select a category";
            }

            if(formData.price === 0 || Number(formData.price) <= 0 ){
                newErrors.price = "Please enter a valid price";
            }

            if(formData.stock === 0 || !Number.isInteger(Number(formData.stock)) || Number(formData.stock) < 0){
                newErrors.stock = "Please enter a valid stock quantity";
            }

            if(formData.minStock === 0 || !Number.isInteger(Number(formData.minStock)) || Number(formData.minStock) < 0){
                newErrors.minStock = "Please enter a valid minimum stock level";
            }
            SetError(newErrors);
            return Object.keys(newErrors).length === 0;

        }

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            if(!validateForm){
                return
            }

            onSubmit(formData);
        }



  return (
    <div className={Styles.formContainer}>
        <div className={Styles.heading}>
             <h2>Add New Product</h2>
        <p>Enter the details of your new inventory product.</p>
        </div>


            <form onChange={handleSubmit} >
                <div className={Styles.formGrid}>
                    <div className={Styles.formGroup}>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" placeholder="Product Name" id="name" name="name" value={formData.name} onChange={handleChange}/>
                        {error.name && <span>{error.name}</span> }
                                  
                    </div>

                    <div className={Styles.formGroup}>
                        <label htmlFor="sku">SKU</label>
                        <input type="text" name="sku" id="sku" placeholder="enter SKU" value={formData.sku} onChange={handleChange}/>
                        {error.sku && <span>{error.sku}</span> }
                    </div>


                    <div className={Styles.formgroup}>
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" value={formData.category} onChange={handleChange}>
                            <option value="">Select a Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Stationery">Stationery</option>
                            {error.category && <span>{error.category}</span> }
                        </select>

                    </div>

                    <div className={Styles.formGroup}>
                        <label htmlFor="price">Price</label>
                        <input type="Number" name="price" id="price" value={formData.price} min="0" step="0.1" placeholder="Enter price" onChange={handleChange}/>
                        {error.price && <span>{error.price}</span> }
                    </div>

                    <div className={Styles.formGroup}>
                        <label htmlFor="stock">Stock Quantity</label>
                        <input name="stock" id="stock" min="0" step="1" value={formData.stock} placeholder='Enter the Stock Quantity' onChange={handleChange}/>
                        {error.stock && <span>{error.stock}</span>}

                    </div>

                    <div className={Styles.formGroup}>
                        <label htmlFor="minStock">Minimum Stock Level</label>
                        <input name="minStock" id="minStock" min="0" step="1" value={formData.minStock} placeholder='Enter minimum stock level' onChange={handleChange}/>
                        {error.minStock && <span>{error.minStock}</span> }
                    </div>

                    <div className={Styles.actions}>
                        <button type="submit" onClick={onCancel}>
                           Cancel
                        </button>
                        <button type="submit"> Save Product </button>
                    </div>

                    </div>

            </form>




    </div>
  )
}

export default AddProduct