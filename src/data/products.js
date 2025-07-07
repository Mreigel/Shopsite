const products = [
  {
    id: 1,
    name: "Vintage Hoodie",
    price: 49.99,
    category: "Women",
    subcategory: "New Arrivals",
    images: [
      "https://picsum.photos/id/1011/600/400",
      "https://picsum.photos/id/1012/600/400",
      "https://picsum.photos/id/1013/600/400"
    ],
    description: "A comfortable and stylish vintage hoodie.",
    variants: [
      { size: "S", stock: 10 },
      { size: "M", stock: 0 },
      { size: "L", stock: 5 }
    ],
  },
  {
    id: 2,
    name: "Graphic Tee",
    price: 24.99,
    category: "Men",
    subcategory: "T-Shirts",
    images: [
      "https://picsum.photos/id/1005/600/400",
      "https://picsum.photos/id/1006/600/400",
      "https://picsum.photos/id/1007/600/400"
    ],
    description: "A bold tee with custom graphic art.",
    variants: [
      { size: "M", stock: 7 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 4 }
    ],
  },
  {
    id: 3,
    name: "Corduroy Jacket",
    price: 89.99,
    category: "Women",
    subcategory: "New Arrivals",
    images: [
      "https://picsum.photos/id/1003/600/400",
      "https://picsum.photos/id/1004/600/400",
      "https://picsum.photos/id/1008/600/400"
    ],
    description: "Durable, warm, and designed for the street.",
    variants: [
      { size: "S", stock: 2 },
      { size: "M", stock: 0 },
      { size: "L", stock: 1 }
    ],
  },
  {
    id: 4,
    name: "Skate Shoes",
    price: 69.99,
    category: "Men",
    subcategory: "New Arrivals",
    images: [
      "https://picsum.photos/id/1010/600/400",
      "https://picsum.photos/id/1011/600/400",
      "https://picsum.photos/id/1012/600/400"
    ],
    description: "Built for grip and everyday wear.",
    variants: [
      { size: "8", stock: 3 },
      { size: "9", stock: 6 },
      { size: "10", stock: 0 }
    ],
  },
  {
    id: 5,
    name: "Denim Jeans",
    price: 59.99,
    category: "Women",
    subcategory: "Jeans",
    images: [
      "https://picsum.photos/id/1001/600/400",
      "https://picsum.photos/id/1002/600/400",
      "https://picsum.photos/id/1009/600/400"
    ],
    description: "Classic denim with a modern cut.",
    variants: [
      { size: "28", stock: 15 },
      { size: "30", stock: 0 },
      { size: "32", stock: 7 }
    ],
  },
  {
    id: 6,
    name: "Bucket Hat",
    price: 19.99,
    category: "Men",
    subcategory: "New Arrivals",
    images: [
      "https://picsum.photos/id/1015/600/400",
      "https://picsum.photos/id/1016/600/400",
      "https://picsum.photos/id/1017/600/400"
    ],
    description: "For sun, shade, and swagger.",
    variants: [
      { size: "One Size", stock: 20 }
    ],
  },
  {
    id: 7,
    name: "Classic Leather Jacket",
    price: 129.99,
    category: "Men",
    subcategory: "New Arrivals",
    images: [
      "https://picsum.photos/id/1016/600/400",
      "https://picsum.photos/id/1018/600/400",
      "https://picsum.photos/id/1019/600/400"
    ],
    description: "Premium leather jacket with a timeless style.",
    variants: [
      { size: "M", stock: 3 },
      { size: "L", stock: 2 }
    ],
  },
  {
    id: 8,
    name: "Floral Summer Dress",
    price: 79.99,
    category: "Women",
    subcategory: "Dresses",
    images: [
      "https://picsum.photos/id/1017/600/400",
      "https://picsum.photos/id/1020/600/400",
      "https://picsum.photos/id/1021/600/400"
    ],
    description: "Light and breezy floral dress perfect for summer.",
    variants: [
      { size: "S", stock: 8 },
      { size: "M", stock: 6 },
      { size: "L", stock: 0 }
    ],
  },
  {
    id: 9,
    name: "Slim Fit Chinos",
    price: 49.99,
    category: "Men",
    subcategory: "Pants",
    images: [
      "https://picsum.photos/id/1018/600/400",
      "https://picsum.photos/id/1022/600/400",
      "https://picsum.photos/id/1023/600/400"
    ],
    description: "Comfortable slim fit chinos for casual or office wear.",
    variants: [
      { size: "30", stock: 5 },
      { size: "32", stock: 7 },
      { size: "34", stock: 0 }
    ],
  },
  {
    id: 10,
    name: "Graphic Hoodie",
    price: 59.99,
    category: "Women",
    subcategory: "New Arrivals",
    images: [
      "https://picsum.photos/id/1019/600/400",
      "https://picsum.photos/id/1024/600/400",
      "https://picsum.photos/id/1025/600/400"
    ],
    description: "Cozy hoodie with bold graphic design.",
    variants: [
      { size: "S", stock: 12 },
      { size: "M", stock: 9 },
      { size: "L", stock: 4 }
    ],
  },
{
  id: 12,
  name: "Crew Neck T-Shirt",
  price: 19.99,
  category: "Men",
  subcategory: "T-Shirts",
  images: [
    "https://picsum.photos/id/1021/600/400",
    "https://picsum.photos/id/1028/600/400",
    "https://picsum.photos/id/1029/600/400"
  ],
  description: "Basic crew neck t-shirt in multiple colors.",
  variants: [
    { size: "M", stock: 15 },
    { size: "L", stock: 12 },
    { size: "XL", stock: 6 }
  ],
},
{
  id: 13,
  name: "Kids Graphic Tee",
  price: 14.99,
  category: "Boys",
  subcategory: "T-Shirts",
  images: [
    "https://picsum.photos/id/1022/600/400",
    "https://picsum.photos/id/1030/600/400",
    "https://picsum.photos/id/1031/600/400"
  ],
  description: "Fun graphic tee perfect for active kids.",
  variants: [
    { size: "S", stock: 9 },
    { size: "M", stock: 8 },
    { size: "L", stock: 5 }
  ],
},
{
  id: 14,
  name: "Toddler Denim Jacket",
  price: 44.99,
  category: "Toddler",
  subcategory: "Jackets",
  images: [
    "https://picsum.photos/id/1023/600/400",
    "https://picsum.photos/id/1032/600/400",
    "https://picsum.photos/id/1033/600/400"
  ],
  description: "Durable denim jacket designed for toddlers.",
  variants: [
    { size: "2T", stock: 4 },
    { size: "3T", stock: 3 },
    { size: "4T", stock: 2 }
  ],
},
{
  id: 15,
  name: "Women's Running Shoes",
  price: 89.99,
  category: "Women",
  subcategory: "Shoes",
  images: [
    "https://picsum.photos/id/1024/600/400",
    "https://picsum.photos/id/1034/600/400",
    "https://picsum.photos/id/1035/600/400"
  ],
  description: "Lightweight and comfortable running shoes.",
  variants: [
    { size: "6", stock: 5 },
    { size: "7", stock: 8 },
    { size: "8", stock: 0 }
  ],
},
{
  id: 16,
  name: "Men's Casual Sneakers",
  price: 79.99,
  category: "Men",
  subcategory: "Shoes",
  images: [
    "https://picsum.photos/id/1025/600/400",
    "https://picsum.photos/id/1036/600/400",
    "https://picsum.photos/id/1037/600/400"
  ],
  description: "Versatile sneakers for everyday wear.",
  variants: [
    { size: "8", stock: 10 },
    { size: "9", stock: 7 },
    { size: "10", stock: 0 }
    ],
  }
];

export default products;