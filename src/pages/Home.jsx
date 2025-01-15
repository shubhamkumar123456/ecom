import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/CartSlice';
import { Link } from 'react-router-dom';
const Home = () => {

  let searchRef = useRef()
 let category =  [
    "All",
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches"
  ]
    const [allproducts, setAllproducts] = useState([]);
    console.log(allproducts)

    let dispatch = useDispatch()

    const getAllProducts = async()=>{
        let res = await axios.get('https://dummyjson.com/products?limit=0');
        let data = res.data
        // console.log(data.products)
        setAllproducts(data.products)
    }

    useEffect(()=>{
getAllProducts()
    },[])

   const [filteredProducts, setfilteredProducts] = useState([]);

    const handleSearch = (item)=>{
      console.log(item)
      if(item==="All"){
        item = ''
      }
        let val = searchRef.current.value || item
      let productsCopy = allproducts.filter((ele)=>ele.title.toLowerCase().includes(val.toLowerCase()) || ele.category.toLowerCase().includes(val.toLowerCase()))
      setfilteredProducts(productsCopy)
      searchRef.current.value = ""
      // console.log(productsCopy)
    }
    let finalProducts = [...allproducts]
    if(filteredProducts.length>0){
      finalProducts = filteredProducts
    }

   
   
  return (
   <div className="font-sans flex gap-2 p-4">
      <div className='bg-gray-500 h-max'>
        <ul >
          {
            category.map((cat,i)=>{
              return <li onClick={()=>handleSearch(cat)} className='p-3 cursor-pointer border-b-2 text-white text-center '>{cat}</li>
            })
          }
        </ul>
      </div>

  <div className='flex flex-col items-center '>
   <div className='flex gap-3 items-center'>
   <input type="text" ref = {searchRef} className='px-4 py-2 outline-none border-2 border-black rounded-lg my-3' placeholder='search products..'  />
   <button onClick={()=>handleSearch('')} className='bg-green-700 px-4 py-2 h-max  rounded-md'>Search</button>
   </div>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
   {
    finalProducts.map((ele, i )=>{
        return  <div key={ele.id} className="bg-gray-100 p-2 overflow-hidden cursor-pointer">
        <div className="bg-white flex flex-col h-full">
          <div className="w-full">
            <img src={ele.thumbnail} alt="food1" className="aspect-[139/125] w-full object-cover" />
          </div>
          <div className="p-4 text-center flex-1">
            <h4 className="text-sm sm:text-base font-bold text-gray-800">{ele.title}</h4>
            <h4 className="text-sm sm:text-base text-gray-800 font-bold mt-2">$22 <strike className="text-gray-500 ml-1">$28</strike></h4>
          </div>
          <button onClick={()=> dispatch(addToCart(ele))} type="button" className="bg-gray-700 font-semibold hover:bg-gray-800 text-white text-sm px-2 py-2 w-full">Add to Cart</button>
          <Link to={'/view'} state={ele} type="button" className="bg-green-700 text-center mt-2 font-semibold hover:bg-green-800 text-white text-sm px-2 py-2 w-full">View Detail</Link>
        </div>
      </div>
    })
   }
  
  </div>
  </div>
</div>

  )
}

export default Home
