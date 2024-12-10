export function getLocalStorage(key: string): any {
    if (typeof window !== 'undefined') { // Check if running in the browser
        const item = localStorage.getItem(key);
        if (item) {
            try {
                return JSON.parse(item);
            } catch (e) {
                return item;
            }
        }
    }
    return null;
}