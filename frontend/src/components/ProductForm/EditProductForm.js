import './EditProductForm.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProductThunk } from '../../store/products';
import { useModal } from "../../context/Modal";

const EditProductForm = ({productId}) => {
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user)
    const productName = useSelector(state => state.productState[productId]?.name)


    const productColor = useSelector(state => state.productState[productId]?.color)
    const productPrice = useSelector(state => state.productState[productId]?.price)
    const productCateogry = useSelector(state => state.productState[productId]?.category)
    const productType = useSelector(state => state.productState[productId]?.type)
    const productDescription = useSelector(state => state.productState[productId]?.description)
    const productImage = useSelector(state => state.productState[productId]?.image)

    const [name, setName] = useState(productName || "")
    const [color, setColor] = useState(productColor || "")
    const [price, setPrice] = useState(productPrice  || "")
    const [category, setCateogry] = useState(productCateogry || "")
    const [type, setType] = useState(productType || "")
    const [description, setDescription] = useState(productDescription || "")
    const [image, setImage] = useState(productImage || "")


    const editProductName = (e) => setName(e.target.value)
    const editProductColor = (e) => setColor(e.target.value)
    const editProductPrice = (e) => setPrice(e.target.value)
    const editProductCategory = (e) => setCateogry(e.target.value)
    const editProductType = (e) => setType(e.target.value)
    const editProductDescription = (e) => setDescription(e.target.value)

    const handleSubmit = async(e) => {
        e.preventDefault();

        setErrors([])

        const payload = {
         name,
         color,
         price,
         category,
         type,
         description,
         image
        };

        dispatch(editProductThunk(payload))
        .catch(async response => {
            const data = await response.json()
            if (data.errors) setErrors(data.errors);
        })
        closeModal()
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
      };

    return sessionUser.user.id ? (
        <section className="≈">
          <form className="editproductform" onSubmit={handleSubmit}>
          {errors.length > 0 && errors.map((error, i) => {
                return <div key={i} >{error}</div>
            })}

            <input  className='ProductFormInput'
              type="text"
              placeholder="product name"
              value={name}
              onChange={editProductName} />

            <select
          className="ProductFormInput"
          value={color}
          onChange={editProductColor}
            >
          <option value="">Select Color</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="pink">Pink</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="other">Other</option>
           </select>

            <input  className='ProductFormInput'
              type="text"
              placeholder="product price"
              value={price}
              onChange={editProductPrice} />

            <select
          className="ProductFormInput"
          value={category}
          onChange={editProductCategory}
           >
          <option value="">Select Category</option>
          <option value="snowboard">Snowboard</option>
          <option value="ski">Ski</option>
          <option value="snowboard boots">Snowboard Boots</option>
          <option value="ski boots">Ski Boots</option>
          <option value="jackets">Jackets</option>
          <option value="other">Other</option>
            </select>

          <select
          className="ProductFormInput"
          value={type}
          onChange={editProductType}
          >
          <option value="">Select Type</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>

            <input  className='ProductFormInput'
              type="text"
              placeholder="product description"
              value={description}
              onChange={editProductDescription} />

        <input className= 'fileInput' type="file" onChange={updateFile} />

            <button className= "editProductBtn" type="submit" >Edit </button>

          </form>
        </section>
      ):
      null;


}


export default EditProductForm
