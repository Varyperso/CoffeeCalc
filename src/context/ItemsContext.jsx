import { createContext, useEffect, useState } from 'react'
import { loadFromLocalStorage, myFetch } from '../utils/myFetch'

export const ItemsContext = createContext()

//prettier-ignore
export const UserProviderItems = ({ children }) => {

  const [items, setItems] = useState([]);
  const [itemStates, setItemStates] = useState({})

  const fetchOnReload = async () => {
    //localStorage.removeItem('items') // for when things go bad with items
    const parsedItems = loadFromLocalStorage("items", []);
    if (parsedItems.length) setItems(parsedItems);
    else {
      const fetchedItems = await myFetch({url: 'https://localhost:5000/items'})
      setItems(fetchedItems)
      localStorage.setItem('items', JSON.stringify(fetchedItems));
    }
  }

  useEffect(()  => {
    fetchOnReload() 
  }, []);

  return <ItemsContext.Provider value={{ items, setItems, itemStates, setItemStates }}> {children} </ItemsContext.Provider>;
};