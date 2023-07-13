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
    const defaultImage = useSelector(state => state.productState[productId]?.previewImageUrl)

    const [name, setName] = useState(productName || "")
    const [color, setColor] = useState(productColor || "")
    const [price, setPrice] = useState(productPrice  || "")
    const [category, setCateogry] = useState(productCateogry || "")
    const [type, setType] = useState(productType || "")
    const [description, setDescription] = useState(productDescription || "")
    const [image, setImage] = useState(defaultImage)


    const editProductName = (e) => setName(e.target.value)
    const editProductColor = (e) => setColor(e.target.value)
    const editProductPrice = (e) => setPrice(e.target.value)
    const editProductCategory = (e) => setCateogry(e.target.value)
    const editProductType = (e) => setType(e.target.value)
    const editProductDescription = (e) => setDescription(e.target.value)

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([])

        if (!name) {
          setErrors(prevErrors => [...prevErrors, "Name cannot be empty"]);
          return;
        }

        if (!color) {
          setErrors(prevErrors => [...prevErrors, "Please select a color"]);
          return;
        }

        if (!price || isNaN(parseFloat(price))) {
          setErrors(prevErrors => [...prevErrors, "Price must be in the right format"]);
          return;
        }

        if (!category) {
          setErrors(prevErrors => [...prevErrors, "Please select a category"]);
          return;
        }

        if (!type) {
          setErrors(prevErrors => [...prevErrors, "Please select a type"]);
          return;
        }

        if (!description) {
          setErrors(prevErrors => [...prevErrors, "Please enter a product description"]);
          return;
        }

        const payload = {
         productId,
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


    // const updateFile = (e) => {
    //   const file = e.target.files[0];
    //   if (file) {
    //     setImage(file);
    //   } else {
    //     setImage(defaultImage);
    //   }
    // };

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
          <option value="red">red</option>
          <option value="orange">orange</option>
          <option value="yellow">yellow</option>
          <option value="green">green</option>
          <option value="blue">blue</option>
          <option value="purple">purple</option>
          <option value="pink">pink</option>
          <option value="silver">silver</option>
          <option value="gold">gold</option>
          <option value="black">black</option>
          <option value="white">white</option>
          <option value="other">other</option>
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
          <option value="snowboard">snowboard</option>
          <option value="ski">ski</option>
          <option value="snowboard boots">snowboard boots</option>
          <option value="ski boots">ski Boots</option>
          <option value="jackets">jackets</option>
          <option value="other">other</option>
            </select>

          <select
          className="ProductFormInput"
          value={type}
          onChange={editProductType}
          >
          <option value="">Select Type</option>
          <option value="men">men</option>
          <option value="women">women</option>
        </select>

            <input  className='ProductFormInput'
              type="text"
              placeholder="product description"
              value={description}
              onChange={editProductDescription} />

<div className='UploadImageContainer'>
<img className="defaultImg" src= {image === defaultImage?defaultImage: URL.createObjectURL(image)} />


            <div className="fileInputEdit">
  <label className="fileInputLabel" htmlFor="fileInput">Choose File</label>
  <input className="fileinputNoFileChosen" id="fileInput" type="file" onChange={updateFile} />
</div>


 </div>
            <button className= "editProductBtn" type="submit" >Edit </button>
          </form>
        </section>
      ):
      null;

}

export default EditProductForm
