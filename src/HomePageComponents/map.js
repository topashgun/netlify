import React from "react";
const menuitem = [
  { name: "Biriyani", Price: 200 },
  { name: "Dosai", Price: 50 },
  { name: "Idly", Price: 20 },
  { name: "Pongal", Price: 60 },
  { name: "Chicken", Price: 190 },
  { name: "Mutton", Price: 250 },
  { name: "Noodles", Price: 80 },
  { name: "Fish", Price: 350 },
];

const map = () => {
  const filterElement = menuitem.filter((priceitem) => {
    return priceitem.Price >= 100;
  });
  return (
    <>
      {filterElement.map((menuprice) => {
        return (
          <p>
            {menuprice.name}:{menuprice.Price}
          </p>
        );
      })}
    </>
  );
};

export default map;
