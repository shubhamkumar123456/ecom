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
      setcurrentPage(1); // Reset pagination
      // console.log(productsCopy)
    }
    let finalProducts = [...allproducts]
    if(filteredProducts.length>0){
      finalProducts = filteredProducts
    }


    //******************* */ pagination code starts from here*********************************

    console.log(finalProducts)
    const [currentPage, setcurrentPage] = useState(2);
    let itemPerPage = 8;
    let lastIndex = currentPage * itemPerPage;
    let firstIndex = lastIndex - itemPerPage;

    let slicedArr = [...finalProducts].slice(firstIndex, lastIndex);

    console.log(slicedArr)

    let noOfbutton = Math.ceil(finalProducts.length/itemPerPage)
    console.log(noOfbutton)
    

   const handleNext = ()=>{
      if(currentPage < noOfbutton){
        setcurrentPage(currentPage+1)
      }
   }

   const handlePrev = ()=>{
    if(currentPage >1){
      setcurrentPage(currentPage-1)
    }
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
    slicedArr.map((ele, i )=>{
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

  {/* {
    Array(noOfbutton).fill('').map((ele,i)=>{
      return <p>{i+1}</p>
    })
  } */}
<nav className='mt-7' aria-label="Page navigation example">
  <ul className="inline-flex flex-wrap -space-x-px text-sm">
    <li onClick={handlePrev}>
      <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
{
  Array(noOfbutton).fill(0).map((item,i)=>{
    return  <li onClick={()=>setcurrentPage(i+1)}>
    <a href="#" className={`flex items-center justify-center px-3 ${i+1==currentPage?' bg-blue-800':'bg-gray-700'} h-8 leading-tight text-white  border border-gray-300  `}>{i+1}</a>
  </li>
  })
}
   

    <li onClick={handleNext}>
      <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100   hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>Next</a>
    </li>
  </ul>
</nav>

  </div>
</div>

  )
}

export default Home
