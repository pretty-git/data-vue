export function getCookieValue(name) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim().split("=");

    if (cookie[0] === name) {
      return cookie[1];
    }
  }

  return null; // 如果没有找到指定名称的 cookie，则返回 null
}
export function removeCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
export const handleList = [{
  id: 2,
  name: '平台上升',
  key: "platformRise",
}, {
  id: 3,
  name: '平台下降',
  key: "platformDrop",
}, {
  id: 4,
  name: '上盖上翻',
  key: "capUp",
}, {
  id: 5,
  name: '上盖下翻',
  key: "capDown",
}, {
  id: 6,
  name: '插销锁住',
  key: "boltLock",
}, {
  id: 7,
  name: '插销松开',
  key: "boltUnlock",
}, {
  id: 8,
  name: '进料口上翻',
  key: "feedportUp",
}, {
  id: 9,
  name: '进料口下翻',
  key: "feedportDown",
}]
export const autoList = [{
  id: 12,
  name: '自动上升',
  key: "caseRise",
}, {
  id: 13,
  name: '自动下降',
  key: "caseDecline",
}]