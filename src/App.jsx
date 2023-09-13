import { useState } from 'react';
import Logo from './Logo.jsx';
import PackingList from './PackingList.jsx';
import Stats from './Stats.jsx';
import Form from './Form.jsx';

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
  function handleClear() {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?'
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAdd={handleAdd} />
      <PackingList
        items={items}
        onDelete={handleDelete}
        onToggleItems={handleToggleItem}
        handleClear={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}
