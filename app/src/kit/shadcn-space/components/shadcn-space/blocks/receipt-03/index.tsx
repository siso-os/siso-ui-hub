import Recipt03, {
  ReceiptItem,
} from "./receipt";

const items: ReceiptItem[] = [
  {
    id: "apple-watch-s6-gps-60mm",
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-overview/product-overview-06-img-1.webp",
    title: "Apple watch S6 GPS 60MM",
    description: "Black Sport Band - M/L",
    price: 234.6,
  },
  {
    id: "beige-jacket-classic-fit",
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-overview/product-overview-01-img-1.webp",
    title: "Beige Jacket Classic Fit",
    description: "Soft Cotton Fabric",
    price: 114.2,
  },
  {
    id: "space-wireless-headphones",
    image:
      "https://images.shadcnspace.com/assets/ecommerce/product-comparison/product-comparison-1-1.webp",
    title: "Space Wireless Headphones",
    description: "Noise Canceling Feature",
    price: 306,
  },
];

const Recipt03Block = () => {
  return <Recipt03 items={items} />;
};

export default Recipt03Block;
