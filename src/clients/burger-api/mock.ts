import { setCookie, getCookie } from "../../utils/cookie";
import type { TIngredient, TOrder, TUser } from "../../utils/types";
import type {
  BurgerAPIClient,
  TAuthResponse,
  TEmptyServerResponse,
  TForgotPasswordRequest,
  TFeedsResponse,
  TRefreshResponse,
  TResetPasswordRequest,
  TUserResponse,
} from "./types";

const MOCK_DELAY_MS = 250;
const MOCK_ACCESS_TOKEN = "Bearer mock-access-token";
const MOCK_REFRESH_TOKEN = "mock-refresh-token";

const withDelay = <T>(factory: () => T, ms = MOCK_DELAY_MS): Promise<T> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(factory());
      } catch (error) {
        reject(error);
      }
    }, ms);
  });

const cloneIngredient = (ingredient: TIngredient): TIngredient => {
  return {
    ...ingredient,
  };
};

const cloneOrder = (order: TOrder): TOrder => {
  return {
    ...order,
    ingredients: [...order.ingredients],
  };
};

const mockIngredients: TIngredient[] = [
  {
    _id: "bun-moon",
    name: "Moon Bun",
    type: "bun",
    proteins: 13,
    fat: 5,
    carbohydrates: 28,
    calories: 310,
    price: 110,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  },
  {
    _id: "bun-galaxy",
    name: "Galaxy Bun",
    type: "bun",
    proteins: 15,
    fat: 6,
    carbohydrates: 32,
    calories: 340,
    price: 125,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  },
  {
    _id: "sauce-mars",
    name: "Mars Chili Sauce",
    type: "sauce",
    proteins: 2,
    fat: 4,
    carbohydrates: 12,
    calories: 80,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-01.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
  },
  {
    _id: "sauce-nebula",
    name: "Nebula Mayo",
    type: "sauce",
    proteins: 1,
    fat: 7,
    carbohydrates: 5,
    calories: 120,
    price: 70,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  },
  {
    _id: "sauce-stardust",
    name: "Stardust BBQ",
    type: "sauce",
    proteins: 3,
    fat: 6,
    carbohydrates: 15,
    calories: 140,
    price: 85,
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
  },
  {
    _id: "main-meteor",
    name: "Meteor Steak",
    type: "main",
    proteins: 34,
    fat: 17,
    carbohydrates: 5,
    calories: 450,
    price: 560,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  },
  {
    _id: "main-comet",
    name: "Comet Fillet",
    type: "main",
    proteins: 28,
    fat: 9,
    carbohydrates: 8,
    calories: 320,
    price: 415,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  },
  {
    _id: "main-vega",
    name: "Vega Cutlet",
    type: "main",
    proteins: 22,
    fat: 11,
    carbohydrates: 20,
    calories: 290,
    price: 330,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  },
  {
    _id: "main-asteroid",
    name: "Asteroid Patty",
    type: "main",
    proteins: 30,
    fat: 14,
    carbohydrates: 6,
    calories: 400,
    price: 470,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  },
];

const initialOrders: TOrder[] = [
  {
    _id: "order-10001",
    status: "done",
    name: "Galaxy Special",
    createdAt: new Date("2024-05-05T14:21:00.000Z").toISOString(),
    updatedAt: new Date("2024-05-05T14:21:00.000Z").toISOString(),
    number: 10001,
    ingredients: ["bun-galaxy", "main-meteor", "sauce-mars"],
  },
  {
    _id: "order-10002",
    status: "pending",
    name: "Nebula Combo",
    createdAt: new Date("2024-05-06T09:10:00.000Z").toISOString(),
    updatedAt: new Date("2024-05-06T09:10:00.000Z").toISOString(),
    number: 10002,
    ingredients: ["bun-moon", "main-comet", "sauce-nebula"],
  },
  {
    _id: "order-10003",
    status: "created",
    name: "Stardust Veggie",
    createdAt: new Date("2024-05-06T12:45:00.000Z").toISOString(),
    updatedAt: new Date("2024-05-06T12:45:00.000Z").toISOString(),
    number: 10003,
    ingredients: ["bun-moon", "main-vega", "sauce-stardust"],
  },
];

let ordersFeed: TOrder[] = [...initialOrders];
let profileOrders: TOrder[] = initialOrders.slice(0, 2);
let lastOrderNumber = Math.max(...initialOrders.map((order) => order.number));
const feedStats = {
  total: 5840,
  totalToday: 34,
};

type TStoredUser = TUser & { password: string };

const defaultUserEmail = "space.cook@example.com";
const users = new Map<string, TStoredUser>([
  [defaultUserEmail, { email: defaultUserEmail, name: "Space Cook", password: "space-123" }],
]);
let activeUserEmail: string | null = null;

const setRefreshTokenToStorage = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

const deriveNameFromEmail = (email: string) => {
  const [localPart] = email.split("@");

  if (!localPart) {
    return "Guest";
  }

  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
};

const ensureAuthorized = () => {
  const accessToken = getCookie("accessToken");

  return accessToken === MOCK_ACCESS_TOKEN && activeUserEmail !== null;
};

const getActiveUser = (): TStoredUser | null => {
  if (!activeUserEmail) {
    return null;
  }

  return users.get(activeUserEmail) ?? null;
};

const refreshToken: BurgerAPIClient["refreshToken"] = () => {
  return withDelay<TRefreshResponse>(() => {
    if (!activeUserEmail) {
      throw new Error("Session expired");
    }

    const refreshData: TRefreshResponse = {
      success: true,
      accessToken: MOCK_ACCESS_TOKEN,
      refreshToken: MOCK_REFRESH_TOKEN,
    };

    setRefreshTokenToStorage(refreshData.refreshToken);
    setCookie("accessToken", refreshData.accessToken);

    return refreshData;
  });
};

const getFeeds: BurgerAPIClient["getFeeds"] = () => {
  return withDelay<TFeedsResponse>(() => ({
    success: true,
    orders: ordersFeed.map(cloneOrder),
    total: feedStats.total,
    totalToday: feedStats.totalToday,
  }));
};

const getOrder: BurgerAPIClient["getOrder"] = (number) => {
  return withDelay(() => {
    const order =
      ordersFeed.find((item) => item.number === number) ??
      profileOrders.find((item) => item.number === number);

    if (!order) {
      throw new Error("Order not found");
    }

    return {
      success: true,
      orders: [cloneOrder(order)],
    };
  });
};

const getOrders: BurgerAPIClient["getOrders"] = () => {
  return withDelay(() => {
    if (!ensureAuthorized()) {
      throw new Error("Not authorized");
    }

    return profileOrders.map(cloneOrder);
  });
};

const getIngredients: BurgerAPIClient["getIngredients"] = () => {
  return withDelay(() => mockIngredients.map(cloneIngredient));
};

const orderBurger: BurgerAPIClient["orderBurger"] = (data) => {
  return withDelay(() => {
    if (!data.length) {
      throw new Error("Order must contain at least one ingredient");
    }

    lastOrderNumber += 1;

    const now = new Date().toISOString();
    const order: TOrder = {
      _id: `order-${lastOrderNumber}`,
      status: "done",
      name: `Custom Stellar Burger #${lastOrderNumber}`,
      createdAt: now,
      updatedAt: now,
      number: lastOrderNumber,
      ingredients: [...data],
    };

    ordersFeed = [order, ...ordersFeed].slice(0, 20);

    if (ensureAuthorized()) {
      profileOrders = [order, ...profileOrders].slice(0, 20);
    }

    feedStats.total += 1;
    feedStats.totalToday += 1;

    return {
      success: true,
      order: cloneOrder(order),
      name: order.name,
    };
  });
};

const registerUser: BurgerAPIClient["registerUser"] = (data) => {
  return withDelay<TAuthResponse>(() => {
    if (users.has(data.email)) {
      throw new Error("User already exists");
    }

    const user: TUser = {
      email: data.email,
      name: data.name || deriveNameFromEmail(data.email),
    };

    users.set(data.email, { ...user, password: data.password });
    activeUserEmail = data.email;

    return {
      user,
      success: true,
      accessToken: MOCK_ACCESS_TOKEN,
      refreshToken: MOCK_REFRESH_TOKEN,
    };
  });
};

const loginUser: BurgerAPIClient["loginUser"] = (data) => {
  return withDelay<TAuthResponse>(() => {
    const existingUser = users.get(data.email);

    const userRecord: TStoredUser = existingUser
      ? { ...existingUser, password: data.password || existingUser.password }
      : {
          email: data.email,
          name: deriveNameFromEmail(data.email),
          password: data.password,
        };

    users.set(userRecord.email, userRecord);
    activeUserEmail = userRecord.email;

    return {
      success: true,
      user: {
        name: userRecord.name,
        email: userRecord.email,
      },
      accessToken: MOCK_ACCESS_TOKEN,
      refreshToken: MOCK_REFRESH_TOKEN,
    };
  });
};

const forgotPassword: BurgerAPIClient["forgotPassword"] = (data: TForgotPasswordRequest) => {
  return withDelay<TEmptyServerResponse>(() => {
    if (data.email !== defaultUserEmail) {
      return { success: false };
    }

    return { success: true };
  });
};

const resetPassword: BurgerAPIClient["resetPassword"] = (data: TResetPasswordRequest) => {
  return withDelay<TEmptyServerResponse>(() => {
    if (activeUserEmail) {
      const activeUser = users.get(activeUserEmail);

      if (activeUser) {
        users.set(activeUserEmail, { ...activeUser, password: data.password });
      }
    }

    return { success: true };
  });
};

const getUser: BurgerAPIClient["getUser"] = () => {
  return withDelay<TUserResponse>(() => {
    if (!ensureAuthorized()) {
      throw new Error("Not authorized");
    }

    const activeUser = getActiveUser();

    if (!activeUser) {
      throw new Error("User not found");
    }

    return {
      success: true,
      user: {
        name: activeUser.name,
        email: activeUser.email,
      },
    };
  });
};

const updateUser: BurgerAPIClient["updateUser"] = (user) => {
  return withDelay<TUserResponse>(() => {
    if (!ensureAuthorized()) {
      throw new Error("Not authorized");
    }

    const activeUser = getActiveUser();

    if (!activeUser) {
      throw new Error("User not found");
    }

    const updatedEmail = user.email ?? activeUser.email;
    const updatedRecord: TStoredUser = {
      email: updatedEmail,
      name: user.name ?? activeUser.name,
      password: user.password ?? activeUser.password,
    };

    if (updatedEmail !== activeUser.email) {
      users.delete(activeUser.email);
    }

    users.set(updatedRecord.email, updatedRecord);
    activeUserEmail = updatedRecord.email;

    return {
      success: true,
      user: {
        name: updatedRecord.name,
        email: updatedRecord.email,
      },
    };
  });
};

const logoutUser: BurgerAPIClient["logoutUser"] = () => {
  return withDelay<TEmptyServerResponse>(() => {
    activeUserEmail = null;

    return { success: true };
  });
};

export const mockBurgerAPIClient: BurgerAPIClient = {
  refreshToken,
  getIngredients,
  getFeeds,
  getOrders,
  orderBurger,
  getOrder,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUser,
  updateUser,
  logoutUser,
};

export default mockBurgerAPIClient;
