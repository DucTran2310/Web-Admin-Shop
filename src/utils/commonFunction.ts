export const syncLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value ))
}