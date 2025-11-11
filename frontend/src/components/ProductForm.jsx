import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(formData);
    setFormData({ name: "", description: "", price: "" });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Input
        name = "image"
        type = "file"
        accept = "image/*"
        onChange = {(e) => setFormData({ ...formData, image: e.target.files[0]})}
      />
      
      <Input
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="text-black"
      />

      <Input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="text-black"
      />
      
      <Input
        name="price"
        type="number"
        placeholder="Price (KSh)"
        value={formData.price}
        onChange={handleChange}
        className="text-black"
      />

      <Button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-xl"
      >
        Add Product
      </Button>
    </motion.form>
  );
}