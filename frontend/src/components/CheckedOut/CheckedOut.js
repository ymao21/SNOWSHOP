import './CheckedOut.css'
import { useHistory } from 'react-router-dom';

const CheckedOut = () => {

    const history = useHistory()

    const handleContinueShopping = () => {
        history.push('/products')
      }

    return (
        <div className='checkOutPage'>
        <h1>Successfully checked out!</h1>
        <img src="https://media.istockphoto.com/id/1129280887/vector/shopping-bags-linear-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=rIS9G2OmPdFw8RKLTN7D9r-RH32VX_upI2o8zy4NWXI=" alt="Shopping Bags" className='CheckoutBag'></img>
         <h2>Thank you for your purchase.</h2>
         <> The order confirmation email with details of your order and a link to track its progress has been sent to your email address</>
         <p>&nbsp;&nbsp;&nbsp;&nbsp; </p>
         <button className="ContinueShoppingButton" onClick={handleContinueShopping}>Continue Shopping</button>
        </div>
    )
}

export default CheckedOut
