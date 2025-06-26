import { createContext, useContext, useEffect, useState } from 'react'
import { loadFromLocalStorage, myFetch } from '../utils/myFetch'

const ItemsContext = createContext()
export const useItemsData = () => useContext(ItemsContext)
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
