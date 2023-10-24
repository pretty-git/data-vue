export const HostName = ''
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
  export  function removeCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   }