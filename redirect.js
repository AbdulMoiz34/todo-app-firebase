
export const redirect = () => {
    const isLoggedIn = localStorage.getItem("loggedIn") == "true";
    const currentPath = location.pathname;
    const authPages = ["login", "signup"];
    const mainPages = ["profile"];

    if (isLoggedIn && authPages.some(page => currentPath.includes(page))) {
        location = "/";
        return;
    }
    
    if (!isLoggedIn && mainPages.some(page => currentPath.includes(page))) {
        location.href = "/user/signup/";
    }
}