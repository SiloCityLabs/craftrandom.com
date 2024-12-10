export function setLocalStorage(key: string, value: any): void {
    if (typeof window !== 'undefined') { // Check if running in the browser
        if (typeof value === "object") {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    }
}