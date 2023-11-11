// User NavBar Items Section
export const UserNavItems = [
  {
    id: "nav1",
    title: "Men",
    link: "/pages/men",
  },
  {
    id: "nav2",
    title: "Women",
    link: "/pages/women",
  },
  {
    id: "nav3",
    title: "Kids",
    link: "/pages/kids",
  },
];

// Admin NavBar Items Section
export const AdminNavItems = [
  {
    id: "admin1",
    title: "Panel",
    link: "/pages/adminPanel",
  },
  {
    id: "admin2",
    title: "Add Product",
    link: "/pages/adminPanel/addProduct",
  },
  {
    id: "admin3",
    title: "Manage Products",
    link: "/pages/adminPanel/manageProducts",
  },
  {
    id: "admin4",
    title: "Add Admin",
    link: "/pages/adminPanel/createAdmin",
  },
];

// Auth Items Section
export const authItems = [
  {
    id: "auth1",
    title: "Login",
    link: "/pages/login",
  },
  {
    id: "auth2",
    title: "Register",
    link: "/pages/register",
  },
];

// Register Form Elements
export const registerForm = [
  {
    id: "username",
    type: "text",
    label: "Username",
  },
  {
    id: "email",
    type: "email",
    label: "Email",
  },
  {
    id: "password",
    type: "password",
    label: "Password",
  },
];

// Register Form Elements
export const registerAdminForm = [
  {
    id: "username",
    type: "text",
    label: "Admin Name",
  },
  {
    id: "email",
    type: "email",
    label: "Admin Email",
  },
  {
    id: "password",
    type: "password",
    label: "Admin Password",
  },
];

// Login Form Elements
export const loginForm = [
  {
    id: "email",
    type: "email",
    label: "Email",
  },
  {
    id: "password",
    type: "password",
    label: "Password",
  },
];

// Product Sizes Section
export const productSizes = [
  {
    id: "S",
    label: "S",
  },
  {
    id: "M",
    label: "M",
  },
  {
    id: "L",
    label: "L",
  },
];

// Product Cart Title Section
export const productDetailsTitles = [
  {
    id: "d-1",
    label: "Product Details",
    width: "200px",
  },
  {
    id: "d-2",
    label: "Price",
    width: "80px",
  },
  {
    id: "d-3",
    label: "Quantity",
    width: "80px",
  },
  {
    id: "d-4",
    label: "Shipping",
    width: "60px",
  },
  {
    id: "d-5",
    label: "Subtotal",
    width: "70px",
  },
  {
    id: "d-6",
    label: "Action",
    width: "50px",
  },
];

// Adding Product Details
export const addProductInfo = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    componentType: "text",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "men",
        label: "men",
      },
      {
        id: "women",
        label: "women",
      },
      {
        id: "kids",
        label: "kids",
      },
    ],
  },
  {
    id: "delivery",
    type: "",
    placeholder: "",
    label: "Delivery",
    componentType: "select",
    options: [
      {
        id: "Paid",
        label: "Paid",
      },
      {
        id: "Free",
        label: "Free",
      },
    ],
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "discount",
    type: "number",
    placeholder: "Enter Discount on Product",
    label: "Discount",
    componentType: "input",
  },
];

// Account Information Section
export const accountItems = [
  {
    id: "account1",
    title: "Your Name",
    link: "username",
  },
  {
    id: "account2",
    title: "Email Address",
    link: "email",
  },
  {
    id: "account3",
    title: "Role",
    link: "role",
  },
];

// Adding Address Details
export const addAddressInfo = [
  {
    id: "clientName",
    type: "input",
    placeholder: "Enter Full Name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Enter Country",
    label: "Country",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Enter City",
    label: "City",
    componentType: "input",
  },
  {
    id: "address",
    type: "text",
    placeholder: "Enter Address",
    label: "Address",
    componentType: "text",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Enter Postal Code",
    label: "Postal Code",
    componentType: "input",
  },
];

// Product Order Title Section
export const productOrdersTitles = [
  {
    id: "d-1",
    label: "Product Details",
    width: "250px",
  },
  {
    id: "d-2",
    label: "Price",
    width: "100px",
  },
  {
    id: "d-3",
    label: "Quantity",
    width: "120px",
  },
  {
    id: "d-4",
    label: "Shipping",
    width: "90px",
  },
  {
    id: "d-5",
    label: "Subtotal",
    width: "100px",
  },
];

// Footer Catalogue
export const catalogue = [
  {
    id: "catalogue-1",
    title: "Men Catalogue",
    link: "/pages/men",
  },
  {
    id: "catalogue-2",
    title: "Women Catalogue",
    link: "/pages/women",
  },
  {
    id: "catalogue-3",
    title: "Kids Catalogue",
    link: "/pages/kids",
  },
];

// Footer User Details
export const details = [
  {
    id: "detail-1",
    title: "Your Profile",
    link: "/pages/profile",
  },
  {
    id: "detail-2",
    title: "Your Orders",
    link: "/pages/orders",
  },
  {
    id: "detail-3",
    title: "View Cart Items",
    link: "/pages/cart",
  },
];

// Footer More Details
export const moreItems = [
  {
    id: "more-1",
    title: "Home",
    link: "/",
  },
  {
    id: "more-2",
    title: "Sign in",
    link: "/pages/login",
  },
  {
    id: "more-3",
    title: "Sign up",
    link: "/pages/register",
  },
];

// Footer Location Details
export const locationItems = [
  {
    id: "location-1",
    title: "support@shoppingcenter.in",
  },
  {
    id: "location-2",
    title: "DHA Phase II, Islamabad",
  },
  {
    id: "location-3",
    title: "Nearby Askari Apartments",
  },
];
