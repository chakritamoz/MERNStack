import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

// function
import { listData, create, remove } from '../functions/product';

const FromProduct = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({});
  
  useEffect(() => {
    loadProducts()
  }, []);

  const loadProducts = async () => {
    listData()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0]
      })
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImage = new FormData();
    
    for (const key in form) { 
      formWithImage.append(key, form[key]);
    }
    
    create(formWithImage)
      .then((res) => {
        console.log(res.data)
        loadProducts();
      })
      .catch((err) => console.log(err));
  }

  const handleRemove = async (id) => {
    if (id != null) {
      remove(id)
        .then((res) => {
          console.log(`delete data success`);
          loadProducts();
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <form onSubmit={ handleSubmit } encType='multipart/form-data'>
        <label htmlFor='name'>Name</label> <br/>
        <input type='text'
          id='name'
          name='name'
          onChange={e => handleChange(e)}
          placeholder='name'
        /> <br/>

        <label htmlFor='description'>Description</label> <br/>
        <input type='text'
          id='description'
          name='description'
          onChange={e => handleChange(e)}
          placeholder='description'
        /> <br/>

        <label htmlFor='file'>Image</label> <br/>
        <input type='file'
          id='file'
          name='file'
          onChange={(e) => handleChange(e)}
        /> <br/>

        <label htmlFor='price'>Price</label> <br/>
        <input type='number'
          id='price'
          name='price'
          onChange={e => handleChange(e)}
          placeholder='0'
        /> <br/>

        <button>Submit</button>
      </form>
      <hr/>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products ? products.map((item, idx) => 
              <tr key={ idx }>
                <td>{ idx + 1 }</td>
                <td>{ item.name }</td>
                <td>{ item.description }</td>
                <td>{ item.file }</td>
                <td>{ item.price }</td>
                <td>
                  <Link to={ '/edit/' + item._id }>
                    <button>Edit</button>
                  </Link>
                  &nbsp;|&nbsp;
                  <button onClick={() => handleRemove(item._id) }>Delete</button>
                </td>
              </tr>
            ) : null 
          }
        </tbody>
      </table>
    </>
  )
}

export default FromProduct