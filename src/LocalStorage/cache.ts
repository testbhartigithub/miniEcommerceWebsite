const CACHE_EXPIRY_TIME = 3600000;

export function getCachedData(key) {
  try {
    const cached = localStorage.getItem(key);
    const cacheTime = localStorage.getItem(`${key}-time`);
    if (!cached || !cacheTime) return null;
    const now = Date.now();
    if (now - parseInt(cacheTime) > CACHE_EXPIRY_TIME) {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}-time`);
      return null;
    }
    return JSON.parse(cached);
  } catch (error) {
    console.error(`Error reading cache for ${key}:`, error);
    return null;
  }
}

export function setCachedData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${key}-time`, Date.now().toString());
  } catch (error) {
    console.error(`Error writing cache for ${key}:`, error);
  }
}

export function clearCache(key) {
  try {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}-time`);
  } catch (error) {
    console.error(`Error clearing cache for ${key}:`, error);
  }
}
