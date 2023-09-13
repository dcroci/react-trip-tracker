import { useState } from 'react';
import Item from './Item.jsx';
export default function PackingList({
  items,
  onDelete,
  onToggleItems,
  handleClear,
}) {
  const [sortBy, setSortBy] = useState('input');
  function handleSort(e) {
    setSortBy(e.target.value);
  }
  let sortedItems;
  if (sortBy === 'input') {
    sortedItems = items;
  } else if (sortBy === 'description') {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
    console.log(sortedItems.sort());
  } else if (sortBy === 'packed') {
    let packedItems = items.filter((item) => item.packed);
    let unPackedItems = items.filter((item) => !item.packed);
    sortedItems = [...unPackedItems, ...packedItems];
    console.log(sortedItems);
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDelete={onDelete}
            key={item.id}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={handleSort}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClear}>Clear List</button>
      </div>
    </div>
  );
}
