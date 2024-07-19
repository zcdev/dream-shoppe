import React, {useEffect, useState} from "react";
import Image from "next/image";

const Shop = () => {
  const [cart, setCart] = useState([]);
  
  const cartTotal = cart.reduce((total, { price = 0 }) => total + price, 0);
 
  // Generate random points
  const randomNumberInRange = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let [points, setPoints] = useState(0);

  // Set points and reset cart
  const handleGenerate = () => {
    setPoints(randomNumberInRange(1, 100000));
    setCart((currentCart) => currentCart = []);
  };

  let pointsLeft = points - cartTotal;

  // Add item to cart and cast votes
  const addToCart = (item) => {
    setCart((currentCart) => [...currentCart, item]);
    let vote = parseInt(item.vote);
    vote++;
      fetch('https://api.apispreadsheets.com/data/2wCduYYU3SRzQjfi', {
        method: "POST",
        body: JSON.stringify({'data': {'vote':`${vote}`}, 'query': `select * from 2wCduYYU3SRzQjfi where id=${item.id}`}),
      })
  }

  // Remove item from cart
  const removeFromCart = (item) => {
    setCart((currentCart) => {
      const indexOfItemToRemove = currentCart.findIndex((cartItem) => cartItem.id === item.id);

      if (indexOfItemToRemove === -1) {
        return currentCart;
      }

      return [
        ...currentCart.slice(0, indexOfItemToRemove),
        ...currentCart.slice(indexOfItemToRemove + 1),
      ];
    });
  };

  let [items, setItems] = useState([]);

  // Fetch items from spreadshseet
  useEffect(() => {
    fetch('https://api.apispreadsheets.com/data/2wCduYYU3SRzQjfi')
    .then(response => response.json())
    .then(data => {
      setItems(data.data);
    })
  },[]);

  // Sort items in ranking order
  items.sort((a, b) => b.vote - a.vote);

  // Display items at wall
  const listItems = items.map((item, index) => (
      <article key={index} className="flex flex-col gap-3 bg-white p-8 rounded-xl shadow-md text-center mb-6">
        <div className="text-7xl cursor-default">{item.emoji}</div>
        <div className="text-lg">{item.name}</div>
        <div className="text-2xl font-semibold mt-auto">{item.price}</div>
        <div className="flex justify-around items-center mt-4">
        <button type="submit" onClick={() => addToCart(item)}>
          <Image className="inline pl-1 pb-1" alt="shop icon" src="./cart.svg" width={40} height={40} />
        </button>
        </div>
     </article>
  ));

  // Display items in cart
  const cartItems = cart.map((item, index) => (
    <div key={index}>
      (${item.price}) {`${item.name}`}
      <button type="submit" onClick={() => removeFromCart(item)}>
        <Image className="inline pl-1 pb-1" alt="delete icon" src="./trash.svg" width={20} height={20} />
        </button>
    </div>
  ));

  return (
    <main className="bg-[#f8f7f5] min-h-[calc(100vh-76px)] px-8 py-8 flex flex-col items-center">
      <button className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleGenerate}>Generate your points</button>
      <div className="pb-5">Here are your points to shop: {points}</div>
      <div className="right-0 top-0 md:right-20 md:mt-5 fixed bg-white p-4 md:p-8 md:rounded-xl shadow-md w-full md:w-max z-10">
      <div className="font-bold"><p className="text-pink-500 md:hidden">Dream Shoppe</p>CART</div>
      <div>{cartItems}</div>
      <div>Points left: <span className="font-bold">{pointsLeft}</span>
      <i>{pointsLeft == 0 ? ' Yay! Next life!' : pointsLeft < 0 ? ' Too much consumption!' : ' Let\'s go'}</i> 
      </div>
      </div>
      <div className="container md:mx-auto md:max-w-[1100px]">
        <div className="grid sm:grid-cols-2 md:grid-cols-6 justify-center mx-auto gap-6 place-center flex-wrap w-100 md:max-w-[1100px]">
      {listItems}
      </div>
      </div>
    </main>
  );
};

export default Shop;

