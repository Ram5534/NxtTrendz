import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [selectedPayment, setSelectedPayment] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(false)

  const handlePaymentChange = event => {
    setSelectedPayment(event.target.value)
  }

  const handleConfirmOrder = () => {
    if (selectedPayment === 'cod') {
      setOrderSuccess(true)
    }
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const totalItems = cartList.reduce(
          (acc, item) => acc + item.quantity,
          0,
        )
        const totalPrice = cartList.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0,
        )

        return (
          <div className="cart-summary-container">
            <h1 className="order-total">
              Order Total:{' '}
              <span className="total-amount">Rs {totalPrice}/-</span>
            </h1>
            <p className="total-items">{totalItems} items in cart</p>
            <div className="popup-container">
              <Popup
                modal
                trigger={
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                }
              >
                {close => (
                  <div className="checkout-container">
                    <h1 className="popup-heading">Payments</h1>
                    <h2 className="order-total">
                      Order Total:{' '}
                      <span className="total-amount">Rs {totalPrice}/-</span>
                    </h2>
                    <p className="total-items">{totalItems} items in cart</p>

                    <form className="input-container">
                      <label>
                        <input
                          type="radio"
                          value="card"
                          disabled
                          checked={selectedPayment === 'card'}
                          onChange={handlePaymentChange}
                        />
                        Card (Disabled)
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="banking"
                          disabled
                          checked={selectedPayment === 'banking'}
                          onChange={handlePaymentChange}
                        />
                        Net Banking (Disabled)
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="upi"
                          disabled
                          checked={selectedPayment === 'upi'}
                          onChange={handlePaymentChange}
                        />
                        UPI (Disabled)
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="wallet"
                          disabled
                          checked={selectedPayment === 'wallet'}
                          onChange={handlePaymentChange}
                        />
                        Wallet (Disabled)
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="cod"
                          checked={selectedPayment === 'cod'}
                          onChange={handlePaymentChange}
                        />
                        Cash on Delivery
                      </label>
                    </form>

                    <button
                      type="button"
                      className="confirm-button"
                      disabled={selectedPayment !== 'cod'}
                      onClick={handleConfirmOrder}
                    >
                      Confirm Order
                    </button>

                    {orderSuccess && (
                      <p className="success-message">
                        Your order has been placed successfully
                      </p>
                    )}

                    <button
                      type="button"
                      className="trigger-button"
                      onClick={() => {
                        setOrderSuccess(false)
                        setSelectedPayment('')
                        close()
                      }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
