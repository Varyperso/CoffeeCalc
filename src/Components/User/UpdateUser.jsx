import { useRef, useState } from 'react'
import { useUiData } from '../../context'
import { myFetch } from '../../utils/myFetch'
import Button from '../UI/Button'

const UpdateUser = ({ user, setUser }) => {
  const [selectedFile, setSelectedFile] = useState(null)

  const { error } = useUiData()

  const nameInputRef = useRef('')

  const handleFileChange = event => setSelectedFile(event.target.files[0])

  const handleSubmit = async event => {
    event.preventDefault()
    if (!nameInputRef.current.value && !selectedFile) return

    const formData = new FormData()
    formData.append('id', user._id) // first append the user._id BEFORE appending the image so the multer can read the user._id for the image name
    nameInputRef.current.value && formData.append('user', nameInputRef.current.value)
    selectedFile && formData.append('image', selectedFile)

    try {
      const data = await myFetch({ url: `https://localhost:5000/api/form`, method: 'POST', data: formData })
      setUser(prevUser => ({
        ...prevUser,
        image: data.imageUrl ? data.imageUrl : prevUser.image,
        user: data.user ? data.user : prevUser.user
      }))
    } catch (error) {
      console.error('Error updating form', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Change Name:
        <input id="username" type="text" ref={nameInputRef} className="input__one" pattern="^.{3,16}$" placeholder={'3-16 characters'} />
      </label>
      <br />
      <label>
        Upload Image: <input type="file" accept="image/*" onChange={handleFileChange} style={{ width: '15em', marginInline: 'auto' }} />
      </label>
      <br />
      <Button type="submit"> Apply Changes </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

export default UpdateUser