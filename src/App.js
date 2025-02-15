import {Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import CreateAccount from './comonents/createaccount/createaccount';
import Dashboard from './pages/dashboard/dashboard';
import Income from './pages/income/income';
import Expense from './pages/expenses/expense';
import './App.css';

function App() {
  return (
    <div className='app-routes'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/income' element={<Income />} />
      <Route path='/expense' element={<Expense />} />
      <Route path='/createaccount' element={<CreateAccount />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    </div>
  );
}

export default App;
