const code = (new URLSearchParams(window.location.search)).get('code');
const redirect = "https://discord.com/oauth2/authorize?client_id=1389365966667780198&response_type=code&redirect_uri=https%3A%2F%2Fthetastypi.github.io%2FNeurofic_Awards_Voting%2Fvoting%2F&scope=identify";
var token = null;

document.getElementById("discordAuthRedirect").setAttribute('href', redirect);

function saveToken() {
    let str = JSON.stringify(token);
    localStorage.setItem("Neurofic_Awards_Discord_Token", str);
}

function loadToken() {
    let str = localStorage.getItem("Neurofic_Awards_Discord_Token");
    if (str) token = JSON.parse(str);
}

async function getToken() {
    let response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncode({
            type: "access",
            code: code
        })
    });
    response = await response.json();
    if (response.result === "access error") return false;
    token = JSON.parse(response.token);
    token.created_on = Math.floor(Date.now() / 1000);
    saveToken();
    return true;
}

async function refreshToken() {
    let response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncode({
            type: "refresh",
            refresh_token: token.refresh_token
        })
    });
    response = await response.json();
    if (response.result === "error") return false;
    token = JSON.parse(response.token);
    token.created_on = Math.floor(Date.now() / 1000);
    saveToken();
    return true;
}

async function initToken() {
    loadToken();
    if (token !== null || code !== null) {
        document.getElementById("loading").style.display = "block";
        document.getElementById("discordAuthSect").style.display = "none";
        if (token === null) {
            let status = await getToken();
            if (!status) {
                document.getElementById("discordAuthSect").style.display = "";
                document.getElementById("discordAuthErrorMsg").style.display = "block";
                document.getElementById("loading").style.display = "";
                return false;
            }
        } else if (Math.ceil(Date.now()/1000)-token.created_on > token.expires_in*6/7) {
            let status = await refreshToken();
            if (!status) {
                document.getElementById("discordAuthSect").style.display = "";
                document.getElementById("discordAuthErrorMsg").style.display = "block";
                document.getElementById("loading").style.display = "";
                return false;
            }
        }
        document.getElementById("loading").style.display = "";
        return true;
    }
    return false;
}