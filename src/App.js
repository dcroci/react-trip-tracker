import { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);
  const [packedItemsCount, setPackedItemsCount] = useState(0);
  // const [isPacked, setIsPacked] = useState(false);
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

    setPackedItemsCount((prevPackedCount) =>
      items.find((item) => item.id === id).packed
        ? prevPackedCount - 1
        : prevPackedCount + 1
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
      <Stats items={items} packedItemsCount={packedItemsCount} />
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
function Stats({ items, packedItemsCount }) {
  const totalItemsCount = items.length;
  const packedPercentage =
    totalItemsCount > 0 ? (packedItemsCount / totalItemsCount) * 100 : 0;

  return (
    <footer className="stats">
      <em>
        💼 You have {items.length} {items.length === 1 ? 'item' : 'items'} on
        your list and you{' '}
        {packedItemsCount < 1
          ? 'have not yet packed any items '
          : `already packed ${packedItemsCount}`}
        {packedItemsCount > 1 ? ' items ' : ' item '}(
        {packedPercentage.toFixed(2)}
        %)
      </em>
    </footer>
  );
}
