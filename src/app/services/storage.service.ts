
function store(key: any, value: any) {
    localStorage[key] = JSON.stringify(value);
}
function load(key: any, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function saveToSession(key: string, value: any) {
    sessionStorage[key] = JSON.stringify(value);
}

function loadFromSession(key: string, defaultValue: any = null) {
    var value = sessionStorage[key] || defaultValue;
    return JSON.parse(value);
}

export const utilService = {
    store,
    load,
    saveToSession,
    loadFromSession
}
