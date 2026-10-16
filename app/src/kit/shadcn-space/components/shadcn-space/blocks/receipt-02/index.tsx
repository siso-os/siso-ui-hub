import Recipt02, { ParcelItem } from "./receipt";

const items: ParcelItem[] = [
  {
    id: "aerostride-pro-headphone",
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-comparison/product-comparison-1-1.webp",
    title: "AeroStride Pro Headphone",
    weight: "200g",
    qty: 1,
    color: "Matte Black",
    price: 149,
  },
  {
    id: "driftwood-premium-wireless-headphone",
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-comparison/product-comparison-1-3.webp",
    title: "Driftwood Premium Wireless Headphone",
    weight: "268g",
    qty: 1,
    color: "Gold",
    price: 110,
  },
  {
    id: "high-top-classic-wireless-headphone",
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-comparison/product-comparison-1-4.webp",
    title: "High-Top Classic Wireless Headphone",
    weight: "300g",
    qty: 1,
    color: "Clay Black",
    price: 165,
  },
];

const Recipt02Block = () => {
  return <Recipt02 items={items} />;
};

export default Recipt02Block;
