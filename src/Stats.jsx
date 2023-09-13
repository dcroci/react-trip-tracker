export default function Stats({ items }) {
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
