
window.addEventListener('DOMContentLoaded', () => {
  // chặn zoom bằng Ctrl + cuộn chuột
  document.addEventListener('wheel', function (e) {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }, { passive: false });

  // chặn Ctrl + + / - / =
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
      e.preventDefault();
    }
  });
});
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const remember = document.getElementById('remember').checked;
  const errorDiv = document.getElementById('login-error');

  // Kiểm tra nếu thiếu tên hoặc mật khẩu
  if (!username || !password) {
    const errorDiv = document.getElementById("login-error");
    errorDiv.textContent = "Vui lòng nhập tên đăng nhập và mật khẩu!";
    errorDiv.style.display = "block";
    return;
  }
  // Kiểm tra tài khoản
  if (username === 'admin' && password === '123456') {
    localStorage.setItem('savedUsername', username);  // ✅ lưu lại tên
    window.location.href = 'home.html';
  } else {
    errorDiv.innerText = 'Sai tên đăng nhập hoặc mật khẩu!';
    errorDiv.style.display = 'block';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebarToggleBtn = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");

      // Đổi icon toggle nếu muốn
      const icon = sidebarToggleBtn.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-chevron-right");
    });
  }
});


window.addEventListener('DOMContentLoaded', () => {
  // 🔄 Tự động điền nếu đã lưu
  const savedUsername = localStorage.getItem('savedUsername');
  const savedPassword = localStorage.getItem('savedPassword');
  if (savedUsername && savedPassword) {
    document.getElementById('username').value = savedUsername;
    document.getElementById('password').value = savedPassword;
    document.getElementById('remember').checked = true;
  }

  // chặn zoom
  document.addEventListener('wheel', function (e) {
    if (e.ctrlKey) e.preventDefault();
  }, { passive: false });

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && ['+', '-', '='].includes(e.key)) {
      e.preventDefault();
    }
  });
});
document.getElementById('forgot-link').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.login-box').style.display = 'none';
  document.querySelector('.reset-box').style.display = 'flex';
});
function backToLogin() {
  // Ẩn các box còn lại
  document.querySelector(".reset-box").style.display = "none";
  document.querySelector(".verify-box").style.display = "none";

  // Hiện lại box đăng nhập
  const loginBox = document.querySelector(".login-box");
  loginBox.style.display = "block";

  // Reset lại nội dung và vị trí input
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";

  document.getElementById("reset-email").value = "";
  document.getElementById("reset-feedback").style.display = "none";

  // Cố định lại vị trí nếu cần (nếu layout bị lệch)
  loginBox.style.top = "55%";
  loginBox.style.right = "8%";
  loginBox.style.transform = "translateY(-50%)";
  document.getElementById('username').value = '';
document.getElementById('password').value = '';
const errorMessage = document.querySelector('.error-message');
if (errorMessage) errorMessage.remove();

}


function sendReset() {
  const email = document.getElementById("reset-email").value.trim();
  const feedback = document.getElementById("reset-error");

  if (!email) {
    feedback.innerText = "Vui lòng nhập email!";
    feedback.style.display = "block";
    return;
  }

  feedback.style.display = "none";

  // 👉 Gán mã xác thực giả định
  const code = "123456";
  localStorage.setItem("verificationCode", code); // Lưu vào localStorage

  // Chuyển sang giao diện xác nhận
  document.querySelector(".reset-box").style.display = "none";
  document.querySelector(".verify-box").style.display = "flex";

  const desc = document.getElementById('verify-desc');
  desc.innerHTML = `Một mã xác nhận đã được gửi đến địa chỉ email <strong style="color:#00e1ff">${email}</strong>. Vui lòng nhập mã vào ô bên dưới.`;
}


function backToReset() {
  document.querySelector('.verify-box').style.display = 'none';
  document.querySelector('.reset-box').style.display = 'flex';
}

function verifyCode() {
  const code = Array.from(document.querySelectorAll('.code-box')).map(input => input.value).join('');
  if (code === '123456') {
    document.querySelector('.verify-box').style.display = 'none';
    document.querySelector('.newpass-box').style.display = 'flex'; // hiện bảng mới
  } else {
    alert("Mã xác nhận không đúng!");
  }
}


let generatedCode = "";

function generateCode() {
  generatedCode = "";
  for (let i = 0; i < 6; i++) {
    generatedCode += Math.floor(Math.random() * 10); // mỗi số 0-9
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver(() => {
    const verifyBox = document.querySelector('.verify-box');
    if (verifyBox && verifyBox.style.display !== 'none') {
      const inputs = verifyBox.querySelectorAll('.code-box');
      if (inputs.length > 0 && !inputs[0].dataset.ready) {
        inputs.forEach((input, index) => {
          input.dataset.ready = "true"; // Đánh dấu đã gắn rồi, tránh lặp

          input.addEventListener("input", (e) => {
            const val = e.target.value;
            if (!/^\d$/.test(val)) {
              e.target.value = ""; // Chỉ nhận số
            }
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight" && index < inputs.length - 1) {
              inputs[index + 1].focus();
            }
            if (e.key === "ArrowLeft" && index > 0) {
              inputs[index - 1].focus();
            }
            if (e.key === "Backspace" && !e.target.value && index > 0) {
              inputs[index - 1].focus();
            }
            if (e.key === "Enter") {
              document.querySelector(".verify-btn").click();
            }
          });
        });

        // Focus ô đầu tiên
        inputs[0].focus();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true, attributes: true });
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
});
function submitNewPassword() {
  const newPass = document.getElementById("new-password").value.trim();
  const confirmPass = document.getElementById("confirm-password").value.trim();

  if (!newPass || !confirmPass) {
    alert("Vui lòng nhập đầy đủ mật khẩu!");
    return;
  }

  if (newPass !== confirmPass) {
    alert("Mật khẩu xác nhận không khớp!");
    return;
  }

  

  // ✅ Lưu mật khẩu nếu muốn (tuỳ chọn)
  localStorage.setItem('savedPassword', newPass);  // hoặc lưu vào session/local

  alert("Mật khẩu đã được cập nhật!");
  document.querySelector(".newpass-box").style.display = "none";
  document.querySelector(".login-box").style.display = "flex";
  // ✅ Đặt đoạn này ở đây
  const errorDiv = document.getElementById("login-error");
  if (errorDiv) errorDiv.style.display = "none";

  document.querySelector(".newpass-box").style.display = "none";
  document.querySelector(".login-box").style.display = "flex";

  alert("Mật khẩu đã được cập nhật thành công!");
  // Focus lại vào ô tên đăng nhập
  document.getElementById("username").focus();

}
document.addEventListener("DOMContentLoaded", () => {
  const newPass = document.getElementById("new-password");
  const confirmPass = document.getElementById("confirm-password");

  [newPass, confirmPass].forEach(input => {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        submitNewPassword(); // Tự động xác nhận
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("savedUsername");
  const display = document.getElementById("username-display");
  if (username && display) {
    display.textContent = username;
  } else {
    display.textContent = "người dùng";
  }
});
function navigateTo(page) {
  window.location.href = page;
}
function logout() {
  localStorage.removeItem('savedUsername');
  localStorage.removeItem('savedPassword');
  window.location.href = 'login.html';
}
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll(".sidebar ul li a");

  menuLinks.forEach(link => {
    if (link.href.includes(currentPath)) {
      link.classList.add("active");
    }
  });
});



