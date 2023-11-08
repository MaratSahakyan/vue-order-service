const setItemToSessionStorage = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.error("Error storing data in sessionStorage:", error);
  }
};

const setItemToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Error storing data in localStorage:", error);
  }
};

const getItemFromSessionStorage = (key) => {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

const getItemFromLocalStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

const removeItemFromSessionStorage = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data from sessionStorage:", error);
  }
};

const removeItemFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data from localStorage:", error);
  }
};

export {
  setItemToSessionStorage,
  setItemToLocalStorage,
  getItemFromSessionStorage,
  getItemFromLocalStorage,
  removeItemFromSessionStorage,
  removeItemFromLocalStorage,
};
