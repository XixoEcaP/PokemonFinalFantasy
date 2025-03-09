const BagMenu = ({ items = [] }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{item} (x1)</div>
      ))}
    </div>
  );
};
export default BagMenu;
