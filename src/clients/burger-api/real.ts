import { setCookie, getCookie } from "../../utils/cookie";
import type {
  BurgerAPIClient,
  EmptyResponse,
  AuthResponse,
  ForgotPasswordRequest,
  FeedsResponse,
  IngredientsResponse,
  NewOrderResponse,
  OrderResponse,
  RefreshResponse,
  ResetPasswordRequest,
  UserResponse,
} from "./types";

const API_URL = __BURGER_API_BASE_URL__;

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }

  const error = await res.json();
  return Promise.reject(error);
};

const toHeadersObject = (headers: HeadersInit | undefined): Record<string, string> => {
  if (!headers) {
    return {};
  }

  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }

  if (Array.isArray(headers)) {
    return headers.reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  }

  return { ...headers };
};

const createAuthHeaders = (additional: Record<string, string> = {}) => {
  const token = getCookie("accessToken");

  if (!token) {
    return { ...additional };
  }

  return {
    ...additional,
    authorization: token,
  };
};

const refreshToken: BurgerAPIClient["refreshToken"] = () =>
  fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then((res) => checkResponse<RefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);

      return refreshData;
    });

const fetchWithRefresh = async <T>(
  url: RequestInfo | URL,
  options: RequestInit = {},
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (error) {
    if ((error as { message?: string }).message === "jwt expired") {
      const refreshData = await refreshToken();
      const headers = {
        ...toHeadersObject(options.headers),
        authorization: refreshData.accessToken,
      };

      const retryResponse = await fetch(url, {
        ...options,
        headers,
      });

      return await checkResponse<T>(retryResponse);
    }

    return Promise.reject(error);
  }
};

const getFeeds: BurgerAPIClient["getFeeds"] = async () => {
  const response = await fetch(`${API_URL}/orders/all`);
  const data = await checkResponse<FeedsResponse>(response);

  if (data?.success) {
    return data;
  }

  return Promise.reject(data);
};

const getOrder: BurgerAPIClient["getOrder"] = async (orderNumber) => {
  const response = await fetch(`${API_URL}/orders/${orderNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return checkResponse<OrderResponse>(response);
};

const getOrders: BurgerAPIClient["getOrders"] = async () => {
  const data = await fetchWithRefresh<FeedsResponse>(`${API_URL}/orders`, {
    method: "GET",
    headers: createAuthHeaders({
      "Content-Type": "application/json;charset=utf-8",
    }),
  });

  if (data?.success) {
    return data.orders;
  }

  return Promise.reject(data);
};

const getIngredients: BurgerAPIClient["getIngredients"] = async () => {
  const response = await fetch(`${API_URL}/ingredients`);
  const data = await checkResponse<IngredientsResponse>(response);

  if (data?.success) {
    return data.data;
  }

  return Promise.reject(data);
};

const orderBurger: BurgerAPIClient["orderBurger"] = async (ingredients) => {
  const data = await fetchWithRefresh<NewOrderResponse>(`${API_URL}/orders`, {
    method: "POST",
    headers: createAuthHeaders({
      "Content-Type": "application/json;charset=utf-8",
    }),
    body: JSON.stringify({ ingredients }),
  });

  if (data?.success) {
    return data;
  }

  return Promise.reject(data);
};

const registerUser: BurgerAPIClient["registerUser"] = async (payload) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const data = await checkResponse<AuthResponse>(response);

  if (data?.success) {
    return data;
  }

  return Promise.reject(data);
};

const loginUser: BurgerAPIClient["loginUser"] = async (payload) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const data = await checkResponse<AuthResponse>(response);

  if (data?.success) {
    return data;
  }

  return Promise.reject(data);
};

const forgotPassword: BurgerAPIClient["forgotPassword"] = async (
  payload: ForgotPasswordRequest,
) => {
  const response = await fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const data = await checkResponse<EmptyResponse>(response);

  if (data?.success) {
    return data;
  }

  return Promise.reject(data);
};

const resetPassword: BurgerAPIClient["resetPassword"] = async (payload: ResetPasswordRequest) => {
  const response = await fetch(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const data = await checkResponse<EmptyResponse>(response);

  if (data?.success) {
    return data;
  }

  return Promise.reject(data);
};

const getUser: BurgerAPIClient["getUser"] = async () => {
  return fetchWithRefresh<UserResponse>(`${API_URL}/auth/user`, {
    headers: createAuthHeaders(),
  });
};

const updateUser: BurgerAPIClient["updateUser"] = async (userUpdate) => {
  return fetchWithRefresh<UserResponse>(`${API_URL}/auth/user`, {
    method: "PATCH",
    headers: createAuthHeaders({
      "Content-Type": "application/json;charset=utf-8",
    }),
    body: JSON.stringify(userUpdate),
  });
};

const logoutUser: BurgerAPIClient["logoutUser"] = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });

  return checkResponse<EmptyResponse>(response);
};

export const realBurgerAPIClient: BurgerAPIClient = {
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

export { fetchWithRefresh };

export default realBurgerAPIClient;
