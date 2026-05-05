import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const MenuTable = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([])
  const [editingCell, setEditingCell] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios
      // .get('http://localhost:5000/api/menu/categories')
      .get(`${import.meta.env.VITE_API_URL}/api/menu/categories`)
      .then(res => setCategories(res.data))
  }, [])
  const handleDoubleClick = (id, field, value) => {
    setEditingCell({ id, field })
    setEditValue(value)
  }
  const handleSave = async () => {
    try {
      // await axios.put('http://localhost:5000/api/menu/update', {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/menu/update`, {
        id: editingCell.id,
        field: editingCell.field,
        value: editValue
      })

      // update UI instantly
      setItems(prev =>
        prev.map(item =>
          item.id === editingCell.id
            ? { ...item, [editingCell.field]: editValue }
            : item
        )
      )

      setEditingCell(null)
    } catch (err) {
      console.log(err)
    }
  }
  const handleSaveDirect = async (id, field, value) => {
    try {
      // await axios.put('http://localhost:5000/api/menu/update', {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/menu/update`, {
        id,
        field,
        value
      })

      setItems(prev =>
        prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
      )
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    axios
      // .get('http://localhost:5000/api/menu/items')
      .get(`${import.meta.env.VITE_API_URL}/api/menu/items`)
      .then(res => setItems(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    // <div className="bg-[#161212] border border-[#241E1E] rounded-xl p-4">

    //   <h2 className="text-white mb-4 text-sm">Menu Items</h2>

    //   <table className="w-full text-sm text-gray-300">
    //     <thead className="text-gray-400 border-b border-[#241E1E]">
    //       <tr>
    //         {/* <th>Code</th> */}
    //         <th>Name</th>
    //         <th>Category</th>
    //         <th>Type</th>
    //         <th>Status</th>
    //         <th>price</th>
    //         <th>Best Seller</th>
    //         <th>Description</th>
    //         <th>Preparation Time</th>
    //         <th>Chef Notes</th>
    //         <th>Image Url</th>
    //       </tr>
    //     </thead>

    //     <tbody>
    //       {items.map((item) => (
    //         <tr key={item.id} className="border-b border-[#241E1E]">
    //           {/* <td>{item.item_code}</td> */}
    //           <td>{item.name}</td>
    //           <td>{item.category}</td>
    //           <td>{item.food_type}</td>
    //           <td>
    //             {item.is_available ? "Available" : "Not Available"}
    //           </td>
    //           <td>₹{item.price.toFixed(2)}</td>
    //           <td>
    //             {item.is_bestseller ? "Yes" : "No"}
    //           </td>
    //           <td>{item.description}</td>
    //           <td>{item.preparation_time} mins</td>
    //           <td>{item.chef_note}</td>
    //           <td>{item.image_urls}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>

    // </div>
    <div className='h-full flex flex-col bg-[#161212] border border-[#241E1E] rounded-xl p-4 overflow-hidden'>
      {/* HEADER */}
      <div className='flex justify-between mb-4'>
        <h2 className='text-white text-sm'>Menu Items</h2>

        <button
          onClick={() => navigate("/add-menu")}
          className="flex items-center gap-1 bg-[#FF7A18] px-3 py-1 text-xs rounded text-white hover:bg-[#ff8c3a]"
        >
          + Add Item
        </button>
      </div>

      {/* SCROLL FIX */}
      <div className='w-full overflow-auto'>
        {/* <div className="min-w-max"> */}
        <table className='min-w-[1600px] text-sm text-gray-300'>
          <thead className='sticky top-0 bg-[#161212] z-10 text-gray-400 border-b border-[#241E1E]'>
            <tr>
              <th className='px-2 text-left py-2'>Code</th>
              <th className='px-2 text-left py-2'>Name</th>
              <th className='px-2 text-left py-2'>Category</th>
              <th className='px-2 text-left py-2'>Type</th>
              <th className='px-2 text-left py-2'>Price</th>
              <th className='px-2 text-left py-2'>Status</th>
              <th className='px-2 text-left py-2'>Best Seller</th>
              <th className='px-2 text-left py-2'>Prep Time</th>
              <th className='px-2 text-left py-2'>Description</th>
            </tr>
          </thead>

          <tbody>
            {items.map(item => (
              <tr
                key={item.id}
                className='border-b border-[#241E1E] hover:bg-[#1E1919]'
              >
                {/* <td className="px-2 py-2 text-white">{item.item_code}</td> */}
                <td
                  className="px-2 py-2 text-blue-400 cursor-pointer hover:underline"
                  onClick={() => navigate(`/edit-menu/${item.id}`)}
                >
                  {item.item_code}
                </td>
                <td
                  className='px-2 py-2 text-white'
                  onDoubleClick={() =>
                    handleDoubleClick(item.id, 'name', item.name)
                  }
                >
                  {editingCell?.id === item.id &&
                  editingCell?.field === 'name' ? (
                    <input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={handleSave}
                      onKeyDown={e => e.key === 'Enter' && handleSave()}
                      autoFocus
                      className='bg-[#1E1919] text-white px-1 rounded'
                    />
                  ) : (
                    item.name
                  )}
                </td>

                {/* <td className="px-2 py-2">{item.category}</td> */}
                <td className='px-2 py-2'>
                  <select
                    value={item.category_id}
                    onChange={e =>
                      handleSaveDirect(item.id, 'category_id', e.target.value)
                    }
                    className='bg-[#1E1919] text-white text-xs px-2 py-1 rounded'
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </td>
                {/* <td
              className="px-2 py-2 text-white"
              onDoubleClick={() => handleDoubleClick(item.id, "category", item.category)}
            >
              {editingCell?.id === item.id && editingCell?.field === "category" ? (
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  autoFocus
                  className="bg-[#1E1919] text-white px-1 rounded"
                />
              ) : (
                item.category
              )}
            </td> */}

                {/* <td className="px-2 py-2 capitalize">{item.food_type}</td> */}
                <td className='px-2 py-2'>
                  <select
                    value={item.food_type}
                    onChange={e =>
                      handleSaveDirect(item.id, 'food_type', e.target.value)
                    }
                    className='bg-[#1E1919] text-white text-xs px-2 py-1 rounded'
                  >
                    <option value='veg'>Veg</option>
                    <option value='non_veg'>Non Veg</option>
                  </select>
                </td>
                {/* <td className="px-2 py-2">
              ₹{Number(item.price || 0).toFixed(2)}
            </td> */}
                <td
                  className='px-2 py-2 text-white'
                  onDoubleClick={() =>
                    handleDoubleClick(item.id, 'price', item.price)
                  }
                >
                  {editingCell?.id === item.id &&
                  editingCell?.field === 'price' ? (
                    <input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={handleSave}
                      onKeyDown={e => e.key === 'Enter' && handleSave()}
                      autoFocus
                      className='bg-[#1E1919] text-white px-1 rounded'
                    />
                  ) : (
                    item.price
                  )}
                </td>
                <td className='px-2 py-2'>
                  <button
                    onClick={() =>
                      handleSaveDirect(
                        item.id,
                        'is_available',
                        !item.is_available
                      )
                    }
                    className={`px-2 py-1 rounded text-xs ${
                      item.is_available
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {item.is_available ? 'Available' : 'Unavailable'}
                  </button>
                </td>

                {/* <td className="px-2 py-2">
              {item.is_best_seller ? "Yes" : "No"}
            </td> */}
                <td className='px-2 py-2'>
                  <button
                    onClick={() =>
                      handleSaveDirect(
                        item.id,
                        'is_bestseller',
                        !item.is_bestseller
                      )
                    }
                    className={`px-2 py-1 rounded text-xs ${
                      item.is_bestseller
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {item.is_bestseller ? 'Yes' : 'No'}
                  </button>
                </td>

                {/* <td className='px-2 py-2'>{item.preparation_time || 0} min</td> */}
                <td
                  className='px-2 py-2 text-white'
                  onDoubleClick={() =>
                    handleDoubleClick(item.id, 'preparation_time', item.preparation_time)
                  }
                >
                  {editingCell?.id === item.id &&
                  editingCell?.field === 'preparation_time' ? (
                    <input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={handleSave}
                      onKeyDown={e => e.key === 'Enter' && handleSave()}
                      autoFocus
                      className='bg-[#1E1919] text-white px-1 rounded'
                    />
                  ) : (
                    item.preparation_time
                  )}
                </td>

                {/* <td className="px-2 py-2 max-w-[200px] truncate">
              {item.description}
            </td> */}
                <td
                  className='px-2 py-2 text-white'
                  onDoubleClick={() =>
                    handleDoubleClick(item.id, 'description', item.description)
                  }
                >
                  {editingCell?.id === item.id &&
                  editingCell?.field === 'description' ? (
                    <input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={handleSave}
                      onKeyDown={e => e.key === 'Enter' && handleSave()}
                      autoFocus
                      className='bg-[#1E1919] text-white px-1 rounded'
                    />
                  ) : (
                    item.description
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </div>
  )
}

export default MenuTable
