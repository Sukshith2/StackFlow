
import { Routes, Route} from 'react-router-dom';
import './App.css'
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';

function App() {


  return (
     <Routes>
      <Route element={<DashboardLayout/>}>

      <Route path="/" element={<Dashboard/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/inventory" element={<h1>"Inventory"</h1>}/>
      <Route path="/orders" element={<h1>"Orders"</h1>}/>
      <Route path="/customers" element={<h1>"Customers"</h1>}/>
      <Route path="/settings" element={<h1>"Settings"</h1>}/>
      </Route>
     </Routes>
  
  )
}

export default App
