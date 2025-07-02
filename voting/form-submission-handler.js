const url = "https://script.google.com/macros/s/AKfycbxWHV7SEh6Om97ZId4eeZkowWPJUskjatNcpDK4C70XI1p10ZJ0qT_V6N8qme0GVpIk/exec";

function urlEncode(data) {
  return Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
  }).join('&');
}

function getFormData(form) {
  let elements = form.elements;
  let honeypot;

  let fields = Object.keys(elements).filter(function(k) {
    if (elements[k].name === "honeypot") {
      honeypot = elements[k].value;
      return false;
    }
    return true;
  }).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    // special case for Edge's html collection
    }else if(elements[k].length > 0){
      return elements[k].item(0).name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });

  let formData = {};
  fields.forEach(function(name){
    let element = elements[name];
    
    // singular form elements just have one value
    formData[name] = element.value;

    // when our element has multiple items, get their values
    if (element.length) {
      let data = [];
      for (let i = 0; i < element.length; i++) {
        let item = element.item(i);
        if (item.checked || item.selected) {
          data.push(item.value);
        }
      }
      formData[name] = data.join(', ');
    }
  });

  return {data: formData, honeypot: honeypot};
}

async function handleFormSubmit(event) {
  event.preventDefault();
  let form = event.target;
  let formData = getFormData(form);
  let data = formData.data;
  data.token = JSON.stringify(token);

  // If a honeypot field is filled, assume it was done so by a spam bot.
  if (formData.honeypot) {
    return false;
  }
  let sendBtn = document.getElementById("sendBtn");
  sendBtn.disabled = true;
  sendBtn.textContent = "HOLD...";

  try {
    if (data.code === null) throw new Error();
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncode(data)
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
    let resendMsg = document.getElementById("resendMsg");
    resendMsg.style.display = "";
  }
}

function loaded() {
  let forms = document.querySelectorAll("form.gform");
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", handleFormSubmit, false);
  }
};
document.addEventListener("DOMContentLoaded", loaded, false);