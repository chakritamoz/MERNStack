import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// functions
import { readData, update } from '../functions/product';

const FromEditProduct = () => {
  const [product, setProduct] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadProduct(params.id)
  }, [params.id]);

  const loadProduct = async (id) => {
    readData(id)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((err) => console.log(err));
  }

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    update(params.id, product)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor='name'>Name</label> <br/>
        <input type='text'
          id='name'
          name='name'
          onChange={(e) => handleChange(e)}
          placeholder='name'
          value={ product.name }
        /> <br/>

        <label htmlFor='description'>Description</label> <br/>
        <input type='text'
          id='description'
          name='description'
          onChange={(e) => handleChange(e)}
          placeholder='description'
          value={ product.description }
        /> <br/>

        <label htmlFor='price'>Price</label> <br/>
        <input type='Number'
          id='price'
          name='price'
          onChange={(e) => handleChange(e)}
          placeholder='0'
          value={ product.price }
        /> <br/>

        <button>Submit</button>
      </form>
    </div>
  )
}

export default FromEditProduct