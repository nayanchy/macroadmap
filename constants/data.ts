export const users = [
  {
    email: "a@b.com",
    password: "123456",
  },
  {
    email: "c@d.com",
    password: "123456",
  },
  {
    email: "e@f.com",
    password: "123456",
  },
  {
    email: "g@h.com",
    password: "123456",
  },
  {
    email: "i@j.com",
    password: "password1234",
  },
];

export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};

export const products = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    price: 1199,
    desc: "Experience the pinnacle of mobile technology with the iPhone 16 Pro Max. Featuring our most advanced camera system, a stunning ProMotion display, and unparalleled performance, it's designed for those who demand the best.A large phone with one of the best cameras",
    img: "/images/products/iphone16-pro.jpeg",
    rating: 5,
  },
  {
    id: 2,
    name: "iPhone 16",
    price: 999,
    desc: "Unleash professional-grade power in your palm. The iPhone 16 Pro offers a groundbreaking camera, a vibrant Super Retina XDR display, and the blazing-fast A-series chip, making every task effortless.",
    img: "/images/products/iphone16.jpeg",
    rating: 5,
  },
  {
    id: 3,
    name: "iPhone 16 E",
    price: 799,
    desc: "Get essential iPhone features at an incredible value. The iPhone 16 e delivers a brilliant display, a capable camera, and the intuitive iOS experience, perfect for everyday use.",
    img: "/images/products/iphone16-e.jpeg",
    rating: 5,
  },
  {
    id: 4,
    name: "MacBook Air",
    price: 1399,
    desc: "Impossibly thin, incredibly fast. The new MacBook Air redefines portability with its fanless design, M-series chip, and all-day battery life, making it the perfect laptop for work and play on the go.",
    img: "/images/products/macbook-air.jpeg",
    rating: 5,
  },
  {
    id: 5,
    name: "Mac Studio",
    price: 899,
    desc: "Unleash your creativity with Mac Studio. This powerhouse desktop is engineered for peak performance, offering immense processing power and extensive connectivity for professionals who push boundaries.",
    img: "/images/products/mac-studio.jpeg",
    rating: 5,
  },
  {
    id: 6,
    name: "iPad",
    price: 1299,
    desc: "Experience the pinnacle of mobile technology with the iPhone 16 Pro Max. Featuring our most advanced camera system, a stunning ProMotion display, and unparalleled performance, it's designed for those who demand the best.A large phone with one of the best cameras",
    img: "/images/products/ipad.jpeg",
    rating: 5,
  },
  {
    id: 7,
    name: "iPad Air",
    price: 1099,
    desc: "Experience the pinnacle of mobile technology with the iPhone 16 Pro Max. Featuring our most advanced camera system, a stunning ProMotion display, and unparalleled performance, it's designed for those who demand the best.A large phone with one of the best cameras",
    img: "/images/products/ipad-air.jpeg",
    rating: 5,
  },
  {
    id: 8,
    name: "Watch Pride",
    price: 399,
    desc: "Experience the pinnacle of mobile technology with the iPhone 16 Pro Max. Featuring our most advanced camera system, a stunning ProMotion display, and unparalleled performance, it's designed for those who demand the best.A large phone with one of the best cameras",
    img: "/images/products/watch-pride.png",
    rating: 5,
  },
  {
    id: 9,
    name: "Watch 10 Series",
    price: 499,
    desc: "Experience the pinnacle of mobile technology with the iPhone 16 Pro Max. Featuring our most advanced camera system, a stunning ProMotion display, and unparalleled performance, it's designed for those who demand the best.A large phone with one of the best cameras",
    img: "/images/products/watch-10.jpeg",
    rating: 5,
  },
  {
    id: 10,
    name: "Watch Ultra",
    price: 599,
    desc: "Experience the pinnacle of mobile technology with the iPhone 16 Pro Max. Featuring our most advanced camera system, a stunning ProMotion display, and unparalleled performance, it's designed for those who demand the best.A large phone with one of the best cameras",
    img: "/images/products/watch-ultra.jpeg",
    rating: 5,
  },
];

export const getProductById = (id: number) => {
  return products.find((product) => product.id === id);
};

export const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Roadmaps",
    href: "/roadmaps",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Shop",
    href: "/products",
  },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
