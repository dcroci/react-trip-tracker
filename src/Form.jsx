import { useState } from 'react';

export default function Form({ onAdd }) {
  const [description, setDescription] = useState('');
  const [itemCount, setItemCount] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      id: new Date(),
      description,
      quantity: itemCount,
      packed: false,
    };
    console.log(newItem);
    onAdd(newItem);
    setDescription('');
    setItemCount(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <div>
        <select
          value={itemCount}
          onChange={(e) => setItemCount(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((e) => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button>Add</button>
      </div>
    </form>
  );
}
