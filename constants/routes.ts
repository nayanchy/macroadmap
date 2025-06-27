export const ROUTES = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  account: "/account",
  shop: "/products",
  roadmaps: "/api/roadmaps",
};
export const SITEGLOBAL = {
  logo: "/images/logo.png",
};

export const PUBLIC_ROUTES = {
  login: ROUTES.signIn,
  register: ROUTES.signUp,
  home: ROUTES.home,
  shop: ROUTES.shop,
  roadmaps: ROUTES.roadmaps,
};

export const PROTECTED_SUB_ROUTES = {
  checkout: "/checkout",
};
