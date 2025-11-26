
import { useEffect, useState } from "react";

function parseStringToBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const val = value.toLowerCase().trim();
    if (val === "true" || val === "1") return true;
    if (val === "false" || val === "0") return false;
  }
  if (typeof value === "number") {
    return value === 1;
  }
  return false; // default
}

const MenuItemsSimUmira = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    
  }, []);
  
  return menuItems;
};

export default MenuItemsSimUmira;