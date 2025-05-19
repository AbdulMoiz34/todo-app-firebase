const redirect = () => {
    const currentPath = location.pathname;
    const authPages = ["login", "signup"];
    const mainPages = ["profile"];
    const isLoggedIn = false;


    for (let i = 0; i < authPages.length; i++) {
        if (currentPath.includes(authPages[i]) && isLoggedIn) {
            location = "/"; 
            break;
        }
    }
    for (let i = 0; i < mainPages.length; i++) {
        if (currentPath.includes(mainPages[i]) && !isLoggedIn) {
            location = "/user/signup/";
            break;
        }
    }
}

redirect();