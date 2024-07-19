import React, {useState} from "react";
import Image from "next/image";
import { items } from "@/data/items";

const Shop = () => {
  const [cart, setCart] = useState([]);
  
  const cartTotal = cart.reduce((total, { price = 0 }) => total + price, 0);
 
  const randomNumberInRange = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let [points, setPoints] = useState(0);

  const handleGenerate = () => {
    setPoints(randomNumberInRange(1, 100000));
    setCart((currentCart) => currentCart = []);
  };

  const addToCart = (item) => setCart((currentCart) => [...currentCart, item]);

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

  const listItems = items.map((item) => (
      <article key={item.id} className="flex flex-col gap-3 bg-white p-8 rounded-xl shadow-md text-center mb-6">
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

  const cartItems = cart.map((item) => (
    <div key={item.id}>
      (${item.price}) {`${item.name}`}
      <button type="submit" onClick={() => removeFromCart(item)}>
        <Image className="inline pl-1 pb-1" alt="delete icon" src="./trash.svg" width={20} height={20} />
        </button>
    </div>
  ));

  return (
    <main className="bg-[#f8f7f5] min-h-[calc(100vh-76px)] px-10 py-8">
      <button className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleGenerate}>Generate your points</button>
      <div className="pb-5">Here are your points to shop: {points}</div>
      <div className="right-20 top-0 mt-5 fixed bg-white p-8 rounded-xl shadow-md">
      <div className="font-bold">CART</div>
      <div>{cartItems}</div>
      <div>Points left: <span className="font-bold">{points - cartTotal}</span> {points - cartTotal == 0 ? 'Yay! Next life!' : ''}</div>
      </div>
      <div className="container md:mx-auto md:max-w-[1100px]">
        <div class="grid sm:grid-cols-2 md:grid-cols-6 justify-center mx-auto gap-6 place-center flex-wrap w-100 md:max-w-[1100px]">
      {listItems}
      </div>
      </div>
    </main>
  );
};

export default Shop;

