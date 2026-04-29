import { useEffect, useState } from "react";
import axios from "axios";

const AddMenuForm = () => {
  const [categories, setCategories] = useState([]);

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
    ingredients: "",
    portion: "",
    nutritional_info: "",
    allergens: "",
    tags: "",
    is_recommended: false,
    is_popular: false,
    is_new: false,
    available_in: "",
    rating: ""
});

  useEffect(() => {
    axios
    //   .get("http://localhost:5000/api/menu/categories")
          .get(`${import.meta.env.VITE_API_URL}/api/menu/categories`)

      .then((res) => setCategories(res.data));
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({
        ...prev,
        [field]: value,
    }));
};

  const handleSubmit = async () => {
    try {
    //   await axios.post("http://localhost:5000/api/menu/create", form);
        await axios.post(`${import.meta.env.VITE_API_URL}/api/menu/create`, form);

      alert("Menu Item Added ✅");

      // reset form
      setForm({
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
        ingredients: "",
        portions: "",
        nutritional_info: "",
        allergens: "",
        tags: "",
        is_recommended: false,
        is_popular: false,
        is_new: false,
        available_in: "",
        rating: ""
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <div className="bg-[#161212] border border-[#241E1E] rounded-xl p-6 w-full">

    //   <h2 className="text-white text-lg mb-6">Add Menu Item</h2>

    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    //     {/* NAME */}
    //     <input
    //       placeholder="Item Name"
    //       value={form.name}
    //       onChange={(e) => handleChange("name", e.target.value)}
    //       className="bg-[#1E1919] text-white p-2 rounded"
    //     />

    //     {/* CATEGORY */}
    //     <select
    //       value={form.category_id}
    //       onChange={(e) => handleChange("category_id", e.target.value)}
    //       className="bg-[#1E1919] text-white p-2 rounded"
    //     >
    //       <option value="">Select Category</option>
    //       {categories.map((cat) => (
    //         <option key={cat.id} value={cat.id}>
    //           {cat.name}
    //         </option>
    //       ))}
    //     </select>

    //     {/* TYPE */}
    //     <select
    //       value={form.food_type}
    //       onChange={(e) => handleChange("food_type", e.target.value)}
    //       className="bg-[#1E1919] text-white p-2 rounded"
    //     >
    //       <option value="veg">Veg</option>
    //       <option value="non_veg">Non Veg</option>
    //     </select>

    //     {/* PRICE */}
    //     <input
    //       placeholder="Price"
    //       type="number"
    //       value={form.price}
    //       onChange={(e) => handleChange("price", e.target.value)}
    //       className="bg-[#1E1919] text-white p-2 rounded"
    //     />

    //     {/* PREP TIME */}
    //     <input
    //       placeholder="Preparation Time (mins)"
    //       type="number"
    //       value={form.preparation_time}
    //       onChange={(e) =>
    //         handleChange("preparation_time", e.target.value)
    //       }
    //       className="bg-[#1E1919] text-white p-2 rounded"
    //     />

    //     {/* IMAGE */}
    //     <input
    //       placeholder="Image URL"
    //       value={form.image_url}
    //       onChange={(e) => handleChange("image_url", e.target.value)}
    //       className="bg-[#1E1919] text-white p-2 rounded col-span-2"
    //     />

    //     {/* DESCRIPTION */}
    //     <textarea
    //       placeholder="Description"
    //       value={form.description}
    //       onChange={(e) => handleChange("description", e.target.value)}
    //       className="bg-[#1E1919] text-white p-2 rounded col-span-2"
    //     />

    //     {/* TOGGLES */}
    //     <div className="flex gap-4 col-span-2">

    //       <label className="text-white text-sm flex items-center gap-2">
    //         <input
    //           type="checkbox"
    //           checked={form.is_available}
    //           onChange={(e) =>
    //             handleChange("is_available", e.target.checked)
    //           }
    //         />
    //         Available
    //       </label>

    //       <label className="text-white text-sm flex items-center gap-2">
    //         <input
    //           type="checkbox"
    //           checked={form.is_bestseller}
    //           onChange={(e) =>
    //             handleChange("is_bestseller", e.target.checked)
    //           }
    //         />
    //         Best Seller
    //       </label>

    //     </div>

    //   </div>

    //   {/* SUBMIT */}
    //   <button
    //     onClick={handleSubmit}
    //     className="mt-4 bg-[#FF7A18] px-4 py-2 rounded text-white"
    //   >
    //     Save Item
    //   </button>

    // </div>
<div className="bg-[#161212] border border-[#241E1E] rounded-xl p-6 w-full">

  <h2 className="text-white text-lg mb-6">Add Menu Item</h2>

  {/* ================= REQUIRED ================= */}
  <h3 className="text-orange-400 text-sm mb-3">Basic Details (Mandatory)</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

    <input
      placeholder="Item Name"
      value={form.name}
      onChange={(e) => handleChange("name", e.target.value)}
      className="bg-[#1E1919] text-white p-2 rounded"
    />

    <select
      value={form.category_id}
      onChange={(e) => handleChange("category_id", e.target.value)}
      className="bg-[#1E1919] text-white p-2 rounded"
    >
      <option value="">Select Category</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>

    <select
      value={form.food_type}
      onChange={(e) => handleChange("food_type", e.target.value)}
      className="bg-[#1E1919] text-white p-2 rounded"
    >
      <option value="veg">Veg</option>
      <option value="non_veg">Non Veg</option>
    </select>

    <input
      placeholder="Price"
      type="number"
      value={form.price}
      onChange={(e) => handleChange("price", e.target.value)}
      className="bg-[#1E1919] text-white p-2 rounded"
    />

    <input
      placeholder="Preparation Time (mins)"
      type="number"
      value={form.preparation_time}
      onChange={(e) =>
        handleChange("preparation_time", e.target.value)
      }
      className="bg-[#1E1919] text-white p-2 rounded"
    />
    <input
      placeholder="Image URL"
      value={form.image_url}
      onChange={(e) => handleChange("image_url", e.target.value)}
      className="bg-[#1E1919] text-white p-2 rounded col-span-2"
    />

    <textarea
      placeholder="Description"
      value={form.description}
      onChange={(e) => handleChange("description", e.target.value)}
      className="bg-[#1E1919] text-white p-2 rounded col-span-2"
    />
    {/* TOGGLES */}
    <div className="flex gap-6 col-span-2 mt-2">

      <label className="text-white text-sm flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.is_available}
          onChange={(e) =>
            handleChange("is_available", e.target.checked)
          }
        />
        Available
      </label>

      <label className="text-white text-sm flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.is_bestseller}
          onChange={(e) =>
            handleChange("is_bestseller", e.target.checked)
          }
        />
        Best Seller
      </label>

    </div>

  </div>

  {/* ================= OPTIONAL ================= */}
  <h3 className="text-orange-400 text-sm mb-3">Additional Details</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    

    {/* NEW FIELD */}
    {/* <input
      placeholder="Spice Level (1-5)"
      type="number"
      value={form.spice_level || ""}
      onChange={(e) => handleChange("spice_level", e.target.value)}
      className="bg-[#1E1919] text-white p-2 rounded"
    /> */}
    <select

      value={form.spice_level || "spice level"}
      onChange={(e) => handleChange("spice_level", e.target.value)}
      className="bg-[#1E1919] text-white p-2 rounded"
    >
    <option value="">Spice Level</option>
      <option value="mild">Mild</option>
      <option value="medium">Medium</option>
      <option value="hot">Hot</option>
    </select>

    {/* NEW FIELD */}
    <input
      placeholder="Calories"
      type="number"
      value={form.calories || ""}
      onChange={(e) => handleChange("calories", e.target.value)}
      className="bg-[#1E1919] text-white p-2 rounded"
    />
    <input
  placeholder="Chef Note"
  value={form.chef_note || ""}
  onChange={(e) => handleChange("chef_note", e.target.value)}
        className="bg-[#1E1919] text-white p-2 rounded"

/>

<input
  placeholder="Ingredients (comma separated)"
  value={form.ingredients || ""}
  onChange={(e) => handleChange("ingredients", e.target.value)}
        className="bg-[#1E1919] text-white p-2 rounded"
/>
 <input
      placeholder="portions"
      type="number"
      value={form.portions || ""}
      onChange={(e) => handleChange("portions", e.target.value)}
      className="bg-[#1E1919] text-white p-2 rounded"
    />
    <input
  placeholder="Nutritional Info (comma separated)"
  value={form.nutritional_info || ""}
  onChange={(e) => handleChange("nutritional_info", e.target.value)}
        className="bg-[#1E1919] text-white p-2 rounded"
/>
<input
  placeholder="Allergens (comma separated)"
  value={form.allergens || ""}
  onChange={(e) => handleChange("allergens", e.target.value)}
        className="bg-[#1E1919] text-white p-2 rounded"
/>
    
<input
  placeholder="Tags (comma separated)"
  value={form.tags || ""}
  onChange={(e) => handleChange("tags", e.target.value)}
        className="bg-[#1E1919] text-white p-2 rounded"
/>

<input
  placeholder="Availability (comma separated lunch/dinner)"
  value={form.availability || ""}
  onChange={(e) => handleChange("availability", e.target.value)}
        className="bg-[#1E1919] text-white p-2 rounded"
/>
<input
      placeholder="rating"
      type="number"
      value={form.rating || ""}
      onChange={(e) => handleChange("rating", e.target.value)}
      className="bg-[#1E1919] text-white p-2 rounded"
    />
  </div>


  <div className="flex gap-6 col-span-2 mt-2">

      <label className="text-white text-sm flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.is_recommended}
          onChange={(e) =>
            handleChange("is_recommended", e.target.checked)
          }
        />
        Recommended
      </label>

      <label className="text-white text-sm flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.is_popular}
          onChange={(e) =>
            handleChange("is_popular", e.target.checked)
          }
        />
        Popular
      </label>

      <label className="text-white text-sm flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.is_new}
          onChange={(e) =>
            handleChange("is_new", e.target.checked)
          }
        />
        is New
      </label>

    </div>

  {/* BUTTON */}
  <button
    onClick={handleSubmit}
    className="mt-6 bg-[#FF7A18] px-6 py-2 rounded text-white hover:bg-[#ff8c3a]"
  >
    Save Item
  </button>

</div>
  );
};

export default AddMenuForm;