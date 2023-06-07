import './CreateProductForm.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProductThunk } from '../../store/products';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";

const CreateProductForm = () => {

    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()

    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [price, setPrice] = useState( )
    const [category, setCateogry] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

   const createName = (e) => setName(e.target.value)
   const createColor = (e) => setColor(e.target.value)
   const createPrice = (e) => setPrice(e.target.value)
   const createCategory = (e) => setCateogry(e.target.value)
   const createType = (e) => setType(e.target.value)
   const createDescription = (e) => setDescription(e.target.value)

   const handleSubmit = async (e) => {
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

    dispatch(createProductThunk(payload))
    .catch(async response => {
        const data = await response.json()
        if (data.errors) setErrors(data.errors);
    })
    closeModal()
   }

  const redirectToProductPage = (()=> {
    history.push('/products')
  })

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return sessionUser.user.id ? (

      <form className ="CreatProductForm" onSubmit={handleSubmit}>
      {errors.length > 0 && errors.map((error, i) => {
            return <div key={i} >{error}</div>
        })}

        <input
          type="text" className='ProductFormInput'
          placeholder="product name"
          value={name}
          onChange={createName} />

          <select className='ProductFormInput' value={color} onChange={createColor}>
        <option value=''>Select color</option>
        <option value='red'>Red</option>
        <option value='orange'>Orange</option>
        <option value='yellow'>Yellow</option>
        <option value='green'>Green</option>
        <option value='blue'>Blue</option>
        <option value='purple'>Purple</option>
        <option value='pink'>Pink</option>
        <option value='silver'>Silver</option>
        <option value='gold'>Gold</option>
        <option value='black'>Black</option>
        <option value='white'>White</option>
        <option value='other'>Other</option>
            </select>

        <input
          type="text" className='ProductFormInput'
          placeholder="product price"
          value={price}
          onChange={createPrice} />

      <select className='ProductFormInput' value={category} onChange={createCategory}>
        <option value=''>Select category</option>
        <option value='snowboard'>Snowboard</option>
        <option value='ski'>Ski</option>
        <option value='snowboard boots'>Snowboard Boots</option>
        <option value='ski boots'>Ski Boots</option>
        <option value='jackets'>Jackets</option>
        <option value='others'>Other</option>
      </select>


        <select className='ProductFormInput' value={type} onChange={createType}>
        <option value=''>Select type</option>
        <option value='men'>Men</option>
        <option value='women'>Women</option>
       </select>

        <input
          type="text" className='ProductFormInput'
          placeholder="product description"
          value={description}
          onChange={createDescription} />

          <input className= 'fileInput' type="file" onChange={updateFile} />

        <button className = "createProductBtn"type="submit" onClick={redirectToProductPage}> Create Product</button>
      </form>
  ) :
  null;

}

export default CreateProductForm
