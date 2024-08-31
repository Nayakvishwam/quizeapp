export async function setLocalStorage(key, value) {
    localStorage.setItem(key, value)
    return true
};

export function getLocalStorage(key) {
    return localStorage.getItem(key)
};
export function getDate(date) {
    const nowUTC = new Date(date);
    const formattedDate = `${nowUTC.getUTCFullYear()}-${String(nowUTC.getUTCMonth() + 1).padStart(2, '0')}-${String(nowUTC.getUTCDate()).padStart(2, '0')}`;
    return formattedDate;
}