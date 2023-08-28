import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);
  // const [isPacked, setIsPacked] = useState(false);
  function handleAdd(item) {
    setItems((items) => [...items, item]);
  }
  function handleDelete(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAdd={handleAdd} />
      <PackingList items={items} onDelete={handleDelete} />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Trip Tracker 💼</h1>;
}
function Form({ onAdd }) {
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
    </form>
  );
}
function PackingList({ items, onDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDelete={onDelete} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDelete }) {
  return (
    <li className={item.packed ? 'packed' : ''}>
      <input type="checkbox" value={item.packed}></input>
      <span>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list and you already packed x (X%)</em>
    </footer>
  );
}
