export let csrfToken = "";

export function fetchCsrfToken(){
  const storedToken = localStorage.getItem("csrfToken");
  const storedTime = localStorage.getItem("csrfTokenTime");
  const now = Date.now();

  if(storedToken && storedTime && now - storedTime < 30 * 60 * 1000){
    return Promise.resolve(storedToken);
  }

  return fetch("../../php/includes/csrf.php")
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("csrfToken", data.csrf_token);
      localStorage.setItem("csrfTokenTime", now);
      return data.csrf_token;
    })
    .catch(error => {
      console.error("CSRFトークン取得エラー:", error);
      return null;
    });
}

/*
export function resetCsrfToken() {
    return fetch("../../php/includes/reset_csrf.php", { method: "POST" })
        .then(response => {
          return response.json();
        })
        .then(async (data) => {
            await fetchCsrfToken();
            return data.new_csrf_token;
        })
        .catch(error => {
          console.error("CSRFトークンリセットエラー:", error);
          throw error;
        });
}
*/