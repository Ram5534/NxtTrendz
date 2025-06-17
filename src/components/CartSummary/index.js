import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalItems = cartList.reduce((acc, item) => acc + item.quantity, 0)
      const totalPrice = cartList.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      )

      return (
        <div className="cart-summary-container">
          <h1 className="order-total">
            Order Total: <span className="total-amount">Rs {totalPrice}/-</span>
          </h1>
          <p className="total-items">{totalItems} items in cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
