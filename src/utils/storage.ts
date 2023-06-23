const STORAGE = {
    SET: (key: string, value: any) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    GET: (key: string) => {
        const items = sessionStorage.getItem(key);
        return items ? JSON.parse(items) : null;
    },
    CLEAR: () => {
        sessionStorage.clear();
    },
    REMOVE_ITEM: (key: string) => {
        sessionStorage.removeItem(key);
    }
}

export default STORAGE;