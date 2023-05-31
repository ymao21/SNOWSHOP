import './CreateProductForm.css';
import { useEffect, useState } from 'react';
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
   const createImage = (e) => setImage(e.target.value)

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

  //  const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   // closeModal()
  // };

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

        <input
          type="text" className='ProductFormInput'
          placeholder="product color"
          value={color}
          onChange={createColor} />

        <input
          type="text" className='ProductFormInput'
          placeholder="product price"
          value={price}
          onChange={createPrice} />

        <input
          type="text" className='ProductFormInput'
          placeholder="product category"
          value={category}
          onChange={createCategory} />

        <input
          type="text" className='ProductFormInput'
          placeholder="product type"
          value={type}
          onChange={createType} />

        <input
          type="text" className='ProductFormInput'
          placeholder="product description"
          value={description}
          onChange={createDescription} />


        <label className='imageFileInput'>

          <input type="file" onChange={updateFile} />

        </label>

        <button className = "createProductBtn"type="submit" > create product</button>
      </form>
  ) :
  null;

}

export default CreateProductForm
