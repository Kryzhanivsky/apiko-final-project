const api = {
  login: async (email, password) => {
    const response = await fetch(
      "https://demo-api.apiko.academy/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  },
  registration: async (fullName, email, password, phoneNumber) => {
    const response = await fetch(
      "https://demo-api.apiko.academy/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          password: password,
          phone: phoneNumber,
        }),
      }
    );

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  },
  authentication: async (token) => {
    const response = await fetch("https://demo-api.apiko.academy/api/account", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  },

  defaultItems: async (offset, limit, sortOption, token) => {
    const response = await fetch(
      `https://demo-api.apiko.academy/api/products?offset=${offset}&limit=${limit}&sortBy=${sortOption}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  },
  filteredItems: async (category, offset, limit, sortOption, token) => {
    const response = await fetch(
      `https://demo-api.apiko.academy/api/categories/${category}/products?offset=${offset}&limit=${limit}&sortBy=${sortOption}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  },
  itemsBySearch: async (search, offset, limit, token) => {
    const response = await fetch(
      `https://demo-api.apiko.academy/api/products/search?keywords=${search}&offset=${offset}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  },
  itemsByIds: async (ids, token) => {
    const baseUrl = "https://demo-api.apiko.academy/api/products/ids?";
    const url = ids.reduce((acc, id) => acc.concat("id=", id, "&"), baseUrl);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  },

  fetchFavorites: async (token, offset, limit) => {
    const response = await fetch(
      `https://demo-api.apiko.academy/api/products/favorites?offset=${offset}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  },
  deleteFavoritesByID: async (id, token) => {
    const response = await fetch(
      `https://demo-api.apiko.academy/api/products/${id}/favorite`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  },
  addFavorite: async (id, token) => {
    const response = await fetch(
      `https://demo-api.apiko.academy/api/products/${id}/favorite`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  },

  doOrder: async (items, shipment, token) => {
    const response = await fetch(`https://demo-api.apiko.academy/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: items,
        shipment: shipment,
      }),
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  },
  fetchOrders: async (token, offset, limit) => {
    const response = await fetch(
      `https://demo-api.apiko.academy/api/orders?offset=${offset}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  },

  categories: async () => {
    const response = await fetch(
      "https://demo-api.apiko.academy/api/categories"
    );

    if (!response.ok) {
      throw new Error(
        `The request was resolved with a status code ${response.status}`
      );
    }

    return response.json();
  },
  countries: async () => {
    const response = await fetch(
      "https://demo-api.apiko.academy/api/locations/countries"
    );

    if (!response.ok) {
      throw new Error(
        `The request was resolved with a status code ${response.status}`
      );
    }

    return response.json();
  },
};

export default api;
