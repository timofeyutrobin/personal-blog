const isLocalStorageAvailable = (): boolean => {
    let storage;
    try {
        storage = window.localStorage;
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            !!storage &&
            storage.length !== 0
        );
    }
};

export default isLocalStorageAvailable() ? window.localStorage : {
    getItem: (key: string) => null,
    setItem: (key: string, value: string) => {},
};
