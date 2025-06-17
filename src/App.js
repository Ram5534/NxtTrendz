import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const existingProduct = cartList.find(item => item.id === product.id)

      if (existingProduct) {
        const updatedCartList = cartList.map(item => {
          if (item.id === product.id) {
            return {...item, quantity: item.quantity + product.quantity}
          }
          return item
        })
        return {cartList: updatedCartList}
      }

      return {cartList: [...cartList, product]}
    })
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredData = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredData})
  }

  incrementCartItemQuantity = itemId => {
    this.setState(prev => ({
      cartList: prev.cartList.map(item => {
        if (item.id === itemId) {
          return {...item, quantity: item.quantity + 1}
        }

        return item
      }),
    }))
  }

  decrementCartItemQuantity = itemId => {
    this.setState(prev => ({
      cartList: prev.cartList.map(item => {
        if (item.id === itemId) {
          return {...item, quantity: item.quantity - 1}
        }

        return item
      }),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
