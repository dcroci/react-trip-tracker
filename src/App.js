import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);
  function handleAdd(item) {
    setItems((items) => [...items, item]);
  }
  function handleDelete(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAdd={handleAdd} />
      <PackingList
        items={items}
        onDelete={handleDelete}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
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
function PackingList({ items, onDelete, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDelete={onDelete}
            key={item.id}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDelete, onToggleItems }) {
  return (
    <li className={item.packed ? 'packed' : ''}>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  const totalItemsCount = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = (numPacked / items.length) * 100;
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list!</em>{' '}
      </p>
    );
  }

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'You got everything! Ready to go!'
          : `💼 You have ${totalItemsCount} ${
              totalItemsCount === 1 ? 'item' : 'items'
            }
        on your list and you 
        ${
          numPacked < 1
            ? 'have not yet packed any '
            : `already packed ${numPacked}`
        }
        ${numPacked > 1 || numPacked === 0 ? ' items ' : ' item '}(
        ${numPacked ? percentage.toFixed(2) + '%' : 0 + '%'})`}
      </em>
    </footer>
  );
}
