import { useItemsData, useUiData, useUserData } from '../../context'
import { useRef, useState } from 'react'
import { myFetch } from '../../utils/myFetch'
import Button from '../UI/Button'

//prettier-ignore
export default function AddItem() {
  const [selectedFile, setSelectedFile] = useState(null)

  const { setItems } = useItemsData()
  const { user } = useUserData()
  const { error, setError } = useUiData()

  const addItemRef = useRef({ newName: '', newQuantity: '', newPrice: '', newDescription: '' })

  if (user.admin === false) return

  const handleFileChange = event => setSelectedFile(event.target.files[0])

  const handleAddItem = async (e) => {
    e.preventDefault()

    if (!selectedFile) {
      setError("must include picture"); return
    }

    const formData = new FormData() 
    
    formData.append('name', addItemRef.current.newName)
    formData.append('quantity', addItemRef.current.newQuantity)
    formData.append('price', addItemRef.current.newPrice)
    formData.append('description', addItemRef.current.newDescription)
    formData.append('image', selectedFile)
 
    try {
      await myFetch({ url: `https://localhost:5000/items`, method: 'POST', data: formData })
      setError('')
      const itemsFetched = await myFetch({ url: 'https://localhost:5000/items' })
      setItems(itemsFetched)
      localStorage.setItem('items', JSON.stringify(itemsFetched))
    } 
    catch(e) {
      setError(e.message)
      setTimeout(() => setError(''), 2000)
    }
  }


  return (
    <>
      <form onSubmit={handleAddItem}>
        <div style={{display:"flex", flexDirection:"column", width:"max-content"}}>
          <p style={{textAlign:"left", marginLeft:"1rem"}}>Add New Item: </p>
          <input type="text" placeholder="new item name" ref={el => (addItemRef.current.newName = el?.value)} className="input__one" required />
          <input type="number" placeholder="quantity 1-100" ref={el => (addItemRef.current.newQuantity = el?.value)} className="input__one" min="1" max="100" required />
          <input type="number" placeholder="price" ref={el => (addItemRef.current.newPrice = el?.value)} className="input__one" min="1" max="1000" step="0.01" required />
          <textarea placeholder="description" ref={el => (addItemRef.current.newDescription = el?.value)} className="input__one" required />
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ width: '14em', marginInline: 'auto' }} required placeholder='Add Image' />
          <Button type="submit"> Add Item </Button>
        </div>
      </form>
      <p style={{ color: 'red' }}>{error && error + ' try again!'}</p>
    </>
  )
}