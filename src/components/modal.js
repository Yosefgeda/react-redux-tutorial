import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../features/modal/modalSlice'
import { clearCart } from '../features/cart/cartSlice'

function Modal() {
    const dispatch = useDispatch();
    const handleClear = () => {
        dispatch(clearCart());
        dispatch(closeModal());
    }
  return (
    <aside className='modal-container'>
        <div className='modal'>
            <h4>remove all items?</h4>
            <div className='btn-container'>
                <button type='button' className='btn confirm-btn' onClick={handleClear}>confirm</button>
                <button type='button' className='btn clear-btn' onClick={() => dispatch(closeModal())}>cancel</button>
            </div>
        </div>
    </aside>
  )
}

export default Modal