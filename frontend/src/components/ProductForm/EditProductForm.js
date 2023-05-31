import './EditProductForm.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProductThunk } from '../../store/products';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";

const EditProductForm = () => {
    const dispatch = useDispatch()
    const { productId } = useParams();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user)
    const productOwned = useSelector((state)=> state.productState)

    const productName = useSelector(state => state.productState[productId]?.name)
    const productColor = useSelector(state => state.productState[productId]?.color)
    const productPrice = useSelector(state => state.productState[productId]?.price)
    const productCateogry = useSelector(state => state.productState[productId]?.category)
    const productType = useSelector(state => state.productState[productId]?.type)
    const productDescription = useSelector(state => state.productState[productId]?.description)
    const productImage = useSelector(state => state.productState[productId]?.image)



//   console.log("productinfo", productId)

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
    const editProductCateogry = (e) => setCateogry(e.target.value)
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
        <section className="edit-product-form">
          <form className="editproductform" onSubmit={handleSubmit}>
          {errors.length > 0 && errors.map((error, i) => {
                return <div key={i} >{error}</div>
            })}

            <input  className='ProductFormInput'
              type="text"
              placeholder="product name"
              value={name}
              onChange={editProductName} />

            <input  className='ProductFormInput'
              type="text"
              placeholder="product color"
              value={color}
              onChange={editProductColor} />

            <input  className='ProductFormInput'
              type="text"
              placeholder="product price"
              value={price}
              onChange={editProductPrice} />

            <input  className='ProductFormInput'
              type="text"
              placeholder="product category"
              value={category}
              onChange={editProductCateogry} />

            <input  className='ProductFormInput'
              type="text"
              placeholder="product type"
              value={type}
              onChange={editProductType} />

            <input  className='ProductFormInput'
              type="text"
              placeholder="product description"
              value={description}
              onChange={editProductDescription} />

            <input  className='ProductFormInput'
              type="text"
              placeholder="product description"
              value={description}
              onChange={editProductDescription} />


        <label className='imageFileInput'>

        <input type="file" onChange={updateFile} />

        </label>

            <button className= "editProduct" type="submit" >edit </button>

          </form>
        </section>
      ):
      null;


}


export default EditProductForm
