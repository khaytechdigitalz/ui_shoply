import type { Address, Order } from "@/types";
import { products } from "@/data/products";

export const initialAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    fullName: "Alex Johnson",
    phone: "+1 (480) 555-0103",
    line1: "2972 Westheimer Rd.",
    line2: "",
    city: "Santa Ana",
    state: "Illinois",
    zip: "85486",
    country: "United States",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Work",
    fullName: "Alex Johnson",
    phone: "+1 (480) 555-0177",
    line1: "1080 Corporate Drive, Suite 200",
    line2: "",
    city: "Chicago",
    state: "Illinois",
    zip: "60601",
    country: "United States",
    isDefault: false,
  },
];

function buildOrder(
  id: string,
  date: string,
  status: Order["status"],
  productIndexes: number[],
  addressId: string,
): Order {
  const items = productIndexes.map((idx, i) => ({
    product: products[idx % products.length],
    quantity: 1 + (i % 3),
    price: products[idx % products.length].price,
  }));
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const discount = status === "Cancelled" ? 0 : Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + shipping - discount).toFixed(2));

  const stepsByStatus: Record<Order["status"], string[]> = {
    Processing: ["Order Placed", "Processing", "Shipped", "Delivered"],
    Shipped: ["Order Placed", "Processing", "Shipped", "Delivered"],
    Delivered: ["Order Placed", "Processing", "Shipped", "Delivered"],
    Cancelled: ["Order Placed", "Cancelled"],
  };
  const doneCount: Record<Order["status"], number> = {
    Processing: 2,
    Shipped: 3,
    Delivered: 4,
    Cancelled: 2,
  };

  const timeline = stepsByStatus[status].map((label, i) => ({
    label,
    date: i < doneCount[status] ? date : undefined,
    done: i < doneCount[status],
  }));

  return {
    id,
    date,
    status,
    items,
    subtotal: Number(subtotal.toFixed(2)),
    shipping,
    discount,
    total,
    paymentMethod: "Visa •••• 4242",
    addressId,
    timeline,
  };
}

export const orders: Order[] = [
  buildOrder("ST-10245", "Jan 12, 2026", "Delivered", [0, 3, 8], "addr-1"),
  buildOrder("ST-10276", "Jan 28, 2026", "Shipped", [12, 15], "addr-1"),
  buildOrder("ST-10304", "Feb 04, 2026", "Processing", [22, 27, 31, 5], "addr-2"),
  buildOrder("ST-10322", "Feb 15, 2026", "Delivered", [19, 33], "addr-1"),
  buildOrder("ST-10359", "Feb 22, 2026", "Cancelled", [7], "addr-1"),
];

export function getOrderById(id: string | undefined) {
  return orders.find((o) => o.id === id);
}
