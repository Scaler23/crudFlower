import { useState, useRef } from "react";
import Data from "../data.json";
import "./Table.css";

// Type Definition (Single Declaration Only)
type Flower = {
  name: string;
  color: string;
  species: string;
  habitat: string;
  description: string;
};

const Table = () => {
  // Ensure Data is correctly typed
  const initialData: Flower[] = Array.isArray(Data) ? (Data as Flower[]) : [];
  const [data, setData] = useState<Flower[]>(initialData);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Delete handler
  const handleDelete = (index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  // Edit handler
  const handleEdit = (index: number) => {
    setEditIndex(index);
  };

  return (
    <div className="container">
      <AddFlower setData={setData} editIndex={editIndex} setEditIndex={setEditIndex} data={data} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Species</th>
            <th>Habitat</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((current, index) => (
            <tr key={index}>
              <td>{current.name}</td>
              <td>{current.color}</td>
              <td>{current.species}</td>
              <td>{current.habitat}</td>
              <td>{current.description}</td>
              <td className="action">
                <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// AddFlower component
function AddFlower({
  setData,
  editIndex,
  setEditIndex,
  data,
}: {
  setData: React.Dispatch<React.SetStateAction<Flower[]>>;
  editIndex: number | null;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  data: Flower[];
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const speciesRef = useRef<HTMLInputElement>(null);
  const habitatRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  function handleValues(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = nameRef.current?.value.trim() || "";
    const color = colorRef.current?.value.trim() || "";
    const species = speciesRef.current?.value.trim() || "";
    const habitat = habitatRef.current?.value.trim() || "";
    const description = descriptionRef.current?.value.trim() || "";

    if (!name || !color || !species || !habitat || !description) {
      alert("All fields are required!");
      return;
    }

    const newFlower: Flower = {
      name,
      color,
      species,
      habitat,
      description,
    };

    if (editIndex !== null) {
      setData((prevData) => prevData.map((item, index) => (index === editIndex ? newFlower : item)));
      setEditIndex(null);
    } else {
      setData((prevData) => [...prevData, newFlower]);
    }

    // Clear inputs
    if (nameRef.current) nameRef.current.value = "";
    if (colorRef.current) colorRef.current.value = "";
    if (speciesRef.current) speciesRef.current.value = "";
    if (habitatRef.current) habitatRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
  }

  return (
    <form className="form" onSubmit={handleValues}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" placeholder="Name.." ref={nameRef} required />

      <label htmlFor="color">Color</label>
      <input type="text" name="color" placeholder="Color.." ref={colorRef} required />

      <label htmlFor="species">Species</label>
      <input type="text" name="species" placeholder="Species.." ref={speciesRef} required />

      <label htmlFor="habitat">Habitat</label>
      <input type="text" name="habitat" placeholder="Habitat.." ref={habitatRef} required />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        placeholder="Description.."
        className="description"
        ref={descriptionRef}
        required
      />

      <button type="submit" className="addbtn">
        {editIndex !== null ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default Table;