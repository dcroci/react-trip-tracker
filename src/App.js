import { useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: false },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Trip Tracker 💼</h1>;
}
function Form() {
  const [description, setDescription] = useState('');
  const [itemCount, setItemCount] = useState(1);
  const newItem = {
    id: initialItems.length + 1,
    description,
    quantity: itemCount,
    packed: false,
  };
  function handleSubmit(e) {
    e.preventDefault();
    setDescription('');
    setItemCount(1);
  }
  function handleAdd() {
    if (!description) return;
    initialItems.push(newItem);
    console.log(initialItems);
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
      <button onClick={handleAdd}>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item }) {
  return (
    <li className={item.packed ? 'packed' : ''}>
      <span>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
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
