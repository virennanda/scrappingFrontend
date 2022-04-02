import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'
import productService from '../../Services/productService';

const Products = ({ user }) => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if(user){
            productService.getProducts(page).then(response => {
                setProducts([...products, ...response.data])
            })
        }
    }, [])
    if (!user) {
        return <Navigate to='/login' />
    }
    return (
        <div className='mt-2'>
            <table className='table'>
                <thead>
                    <tr>

                        <th>
                            Product Name
                        </th>
                        <th>Product Price</th>
                        <th>Product Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(item => <ItemRow key={item._id} data={item} />)}
                </tbody>
            </table>
            <Button variant='primary' onClick={handleLoadMore}> LoadMore</Button>
        </div>
    )
    function ItemRow({ data }) {
        return <tr key={data._id}>
            <td>{data.productTitle}</td>
            <td>{data.productPrice}</td>
            <td><img src={data.productImage} height={100} width={100} /></td>
            <td><Button variant='danger' onClick={() => deleteRow(data._id)} >Delete</Button></td>
        </tr>
    }
    async function deleteRow(id) {
        try {
            await productService.deleteProduct(id);
            setProducts(products.filter(item => item._id !== id));

        } catch (error) {
            alert('something went wrong')
        }
    }
    async function handleLoadMore(){
        productService.getProducts(page+1).then(response=>{
            setProducts([...products,...response.data])
            setPage(page+1);
        });
    }
}

export default Products