import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// functions
import { readData, update } from '../functions/product';

const FromEditProduct = () => {
  const [product, setProduct] = useState({});
  const [oldFile, setOldFile] = useState();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadProduct(params.id)
  }, [params.id]);

  const loadProduct = async (id) => {
    readData(id)
      .then((res) => {
        setProduct(res.data);
        setOldFile(res.data.file);
      })
      .catch((err) => console.log(err));
  }

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setProduct({
        ...product,
        [e.target.name]: e.target.files[0]
      })
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formWithImage = new FormData();

    for (const key in product) {
      formWithImage.append(key, product[key]);
    }
    formWithImage.append('oldFile', oldFile);

    update(params.id, formWithImage)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={ handleSubmit } encType='multipart/form-data'>
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

        <label htmlFor='file'>Image</label> <br/>
        <input type='file'
          id='file'
          name='file'
          onChange={(e) => handleChange(e)}
        /> <br/>

        <label htmlFor='price'>Price</label> <br/>
        <input type='Number'
          id='price'
          name='price'
          onChange={(e) => handleChange(e)}
          placeholder='0'
          value={ product.price }
        /> <br/>

        <input type='submit' value="submit" />
      </form>
    </div>
  )
}

export default FromEditProduct