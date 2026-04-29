// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const EditMenu = () => {
//   const { id } = useParams();

//   const [form, setForm] = useState({
//     name: "",
//     category_id: "",
//     food_type: "veg",
//     price: "",
//     description: "",
//     preparation_time: "",
//     is_available: true,
//     is_bestseller: false,
//     image_url: ""
//   });

//   const [categories, setCategories] = useState([]);

//   // ✅ fetch categories
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/menu/categories")
//       .then(res => setCategories(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   // ✅ fetch item
//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/menu/item/${id}`)
//       .then(res => {
//         const data = res.data;

//         setForm({
//           name: data.name || "",
//           category_id: data.category_id || "",
//           food_type: data.food_type || "veg",
//           price: data.price || "",
//           description: data.description || "",
//           preparation_time: data.preparation_time || "",
//           is_available: data.is_available ?? true,
//           is_bestseller: data.is_bestseller ?? false,
//           image_url: data.image_urls?.[0] || ""
//         });
//       })
//       .catch(err => console.log(err));
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setForm(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         ...form,
//         price: Number(form.price) || 0
//       };

//       await axios.put(
//         `http://localhost:5000/api/menu/update-full/${id}`,
//         payload
//       );

//       alert("Updated successfully");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="bg-[#161212] min-h-screen p-6 text-white">
//       <h2 className="text-lg mb-6">Edit Menu Item</h2>

//       <div className="grid grid-cols-2 gap-4">

//         {/* Name */}
//         <input
//           name="name"
//           placeholder="Item Name"
//           value={form.name}
//           onChange={handleChange}
//           className="p-2 bg-[#1E1919] rounded"
//         />

//         {/* Category */}
//         <select
//           name="category_id"
//           value={form.category_id}
//           onChange={handleChange}
//           className="p-2 bg-[#1E1919] rounded"
//         >
//           <option value="">Select Category</option>
//           {categories.map(cat => (
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         {/* Food Type */}
//         <select
//           name="food_type"
//           value={form.food_type}
//           onChange={handleChange}
//           className="p-2 bg-[#1E1919] rounded"
//         >
//           <option value="veg">Veg</option>
//           <option value="non_veg">Non Veg</option>
//         </select>

//         {/* Price */}
//         <input
//           name="price"
//           placeholder="Price"
//           value={form.price}
//           onChange={handleChange}
//           className="p-2 bg-[#1E1919] rounded"
//         />

//         {/* Prep Time */}
//         <input
//           name="preparation_time"
//           placeholder="Preparation Time"
//           value={form.preparation_time}
//           onChange={handleChange}
//           className="p-2 bg-[#1E1919] rounded"
//         />

//         {/* Image */}
//         <input
//           name="image_url"
//           placeholder="Image URL"
//           value={form.image_url}
//           onChange={handleChange}
//           className="p-2 bg-[#1E1919] rounded"
//         />

//         {/* Description */}
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           className="p-2 bg-[#1E1919] rounded col-span-2"
//         />

//         {/* Toggles */}
//         <div className="flex gap-6 col-span-2 mt-2">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="is_available"
//               checked={form.is_available}
//               onChange={handleChange}
//             />
//             Available
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               name="is_bestseller"
//               checked={form.is_bestseller}
//               onChange={handleChange}
//             />
//             Bestseller
//           </label>
//         </div>
//       </div>

//       {/* Button */}
//       <button
//         onClick={handleSubmit}
//         className="mt-6 bg-[#FF7A18] px-6 py-2 rounded"
//       >
//         Update Item
//       </button>
//     </div>
//   );
// };

// export default EditMenu;
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

const EditMenu = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    food_type: "veg",
    price: "",
    description: "",
    preparation_time: "",
    is_available: true,
    is_bestseller: false,
    image_url: "",
    chef_note: "",
    calories: "",
    ingredients: "",
    tags: "",
    allergens: "",
    nutritional_info: "",
    is_recommended: false,
    is_popular: false,
    is_new: false
  });

  const [categories, setCategories] = useState([]);

  // ✅ Load categories
  useEffect(() => {
    // axios.get("http://localhost:5000/api/menu/categories")
    axios.get(`${import.meta.env.VITE_API_URL}/api/menu/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  // ✅ Load item data
  useEffect(() => {
    // axios.get(`http://localhost:5000/api/menu/item/${id}`)
    axios.get(`${import.meta.env.VITE_API_URL}/api/menu/item/${id}`)

      .then(res => {
        const data = res.data;

        setForm({
          name: data.name || "",
          category_id: data.category_id || "",
          food_type: data.food_type || "veg",
          price: data.price || "",
          description: data.description || "",
          preparation_time: data.preparation_time || "",
          is_available: data.is_available ?? true,
          is_bestseller: data.is_bestseller ?? false,
          image_url: data.image_urls?.[0] || "",
          chef_note: data.chef_note || "",
          calories: data.calories || "",
          ingredients: (data.ingredients || []).join(", "),
          tags: (data.tags || []).join(", "),
          allergens: (data.allergens || []).join(", "),
          nutritional_info: data.nutritional_info || "",
          is_recommended: data.is_recommended ?? false,
          is_popular: data.is_popular ?? false,
          is_new: data.is_new ?? false
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        price: Number(form.price) || 0
      };

      await axios.put(
        // `http://localhost:5000/api/menu/update-full/${id}`,
        `${import.meta.env.VITE_API_URL}/api/menu/update-full/${id}`,
        payload
      );

      alert("Updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <Topbar />

        {/* Main */}
        <div className="flex-1 bg-[#0D0B0A] p-6 overflow-y-auto">

          <div className="bg-[#161212] p-6 rounded-xl text-white">

            <h2 className="text-lg mb-6">Edit Menu Item</h2>

            <div className="grid grid-cols-2 gap-4">

              <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 bg-[#1E1919] rounded" />

              <select name="category_id" value={form.category_id} onChange={handleChange} className="p-2 bg-[#1E1919] rounded">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <select name="food_type" value={form.food_type} onChange={handleChange} className="p-2 bg-[#1E1919] rounded">
                <option value="veg">Veg</option>
                <option value="non_veg">Non Veg</option>
              </select>

              <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="p-2 bg-[#1E1919] rounded" />

              <input name="preparation_time" placeholder="Prep Time" value={form.preparation_time} onChange={handleChange} className="p-2 bg-[#1E1919] rounded" />

              <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} className="p-2 bg-[#1E1919] rounded" />

              <input name="chef_note" placeholder="Chef Note" value={form.chef_note} onChange={handleChange} className="p-2 bg-[#1E1919] rounded" />

              <input name="calories" placeholder="Calories" value={form.calories} onChange={handleChange} className="p-2 bg-[#1E1919] rounded" />

              <input name="ingredients" placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={handleChange} className="p-2 bg-[#1E1919] rounded col-span-2" />

              <input name="tags" placeholder="Tags" value={form.tags} onChange={handleChange} className="p-2 bg-[#1E1919] rounded" />

              <input name="allergens" placeholder="Allergens" value={form.allergens} onChange={handleChange} className="p-2 bg-[#1E1919] rounded" />

              <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-2 bg-[#1E1919] rounded col-span-2" />

              <textarea name="nutritional_info" placeholder="Nutritional Info" value={form.nutritional_info} onChange={handleChange} className="p-2 bg-[#1E1919] rounded col-span-2" />

              {/* Toggles */}
              <div className="flex gap-6 col-span-2 mt-2 flex-wrap">
                <label><input type="checkbox" name="is_available" checked={form.is_available} onChange={handleChange} /> Available</label>
                <label><input type="checkbox" name="is_bestseller" checked={form.is_bestseller} onChange={handleChange} /> Bestseller</label>
                <label><input type="checkbox" name="is_recommended" checked={form.is_recommended} onChange={handleChange} /> Recommended</label>
                <label><input type="checkbox" name="is_popular" checked={form.is_popular} onChange={handleChange} /> Popular</label>
                <label><input type="checkbox" name="is_new" checked={form.is_new} onChange={handleChange} /> New</label>
              </div>

            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 bg-[#FF7A18] px-6 py-2 rounded"
            >
              Update Item
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default EditMenu;