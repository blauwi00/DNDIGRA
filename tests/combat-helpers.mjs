// Разбор записи кубиков для проверок (отдельно от кода игры)
export const parseDiceTest = e => /^\d+d\d+([+-]\d+)?$/.test(String(e).replace(/\s/g, ''));
