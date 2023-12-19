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
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    create(form)
      .then((res) => {
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
      <form onSubmit={ handleSubmit }>
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
        /> <br />

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