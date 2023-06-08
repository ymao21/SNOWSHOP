import './ProductCard.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductCard = ({ product }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className='productCardContainer'>

      <a className='productImgTag' href={`/products/${product.id}`}>
        <img className='productimg' src={product.previewImageUrl} alt='productimg' />
      </a>

      <Link className='titlelink' key={product?.id} to={`/products/${product.id}`}>
        {product.name}
      </Link>

    </div>
  );
};

export default ProductCard;
