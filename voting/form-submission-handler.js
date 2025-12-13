const url = "https://script.google.com/macros/s/AKfycbyanF1DXAMYIP7MQc6gGhjh7bCjrFGxnNvWysrHb7hr4qRjmDEFgBwLFTPrQ6fPHMgh/exec";

function urlEncode(data) {
  return Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
  }).join('&');
}

async function handleFormSubmit(event) {
  event.preventDefault();
  let sendBtn = document.getElementById("sendBtn");
  sendBtn.disabled = true;
  sendBtn.textContent = "HOLD...";

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncode(votes)
    });
    response = await response.json();
    if (response.result !== 'success') throw new Error();
    sendBtn.disabled = false;
    sendBtn.textContent = "Successfully sent!";
    let resendMsg = document.getElementById("resendMsg");
    resendMsg.style.display = "";
  } catch {
    sendBtn.disabled = false;
    sendBtn.textContent = "Failed to send! Please try again.";
  }
}