/* eslint-disable */
import Navbar from './components/navbar';
import './App.css';
import CartContainer from './components/cartContainer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals , getCartItems } from './features/cart/cartSlice';
import { useEffect } from 'react';
import Modal from './components/modal';

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart)
  const dispatch = useDispatch();
  const {isOpen} = useSelector((store) => store.modal)
  
  useEffect(()=>{
    dispatch(getCartItems())
  }, [])

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  if(isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }


  return (
    <main className="App">
      
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
