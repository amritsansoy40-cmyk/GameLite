// ======================================
// GameLite - HUMINGO
// Firebase Authentication
// ======================================

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// ======================================
// 🔥 Firebase Configuration
// अपनी Firebase details यहाँ डालना
// ======================================

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};


// ======================================
// Initialize Firebase
// ======================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// ======================================
// Elements
// ======================================

const welcomeScreen = document.getElementById("welcomeScreen");
const termsScreen = document.getElementById("termsScreen");
const authScreen = document.getElementById("authScreen");
const appScreen = document.getElementById("appScreen");

const termsCheckbox = document.getElementById("termsCheckbox");
const continueBtn = document.getElementById("continueBtn");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");

const message = document.getElementById("message");


// ======================================
// Screen Function
// ======================================

function showScreen(screen) {

  [welcomeScreen, termsScreen, authScreen, appScreen]
    .forEach(item => {
      if (item) item.classList.add("hidden");
    });

  if (screen) {
    screen.classList.remove("hidden");
  }
}


// ======================================
// Welcome → Terms
// ======================================

const startBtn = document.getElementById("startBtn");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    showScreen(termsScreen);
  });
}


// ======================================
// Terms Checkbox
// ======================================

if (termsCheckbox && continueBtn) {

  termsCheckbox.addEventListener("change", () => {

    continueBtn.disabled = !termsCheckbox.checked;

  });

}


// ======================================
// Terms → Login
// ======================================

if (continueBtn) {

  continueBtn.addEventListener("click", () => {

    if (termsCheckbox.checked) {
      localStorage.setItem("termsAccepted", "true");
      showScreen(authScreen);
    }

  });

}


// ======================================
// Login
// ======================================

if (loginForm) {

  loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      showMessage("Login successful! 🎮", false);

    } catch (error) {

      showMessage(error.message, true);

    }

  });

}


// ======================================
// Signup
// ======================================

if (signupForm) {

  signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = signupEmail.value.trim();
    const password = signupPassword.value;

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      showMessage("Account created successfully! 🎉", false);

    } catch (error) {

      showMessage(error.message, true);

    }

  });

}


// ======================================
// Google Sign-In
// ======================================

const googleBtn = document.getElementById("googleBtn");

if (googleBtn) {

  googleBtn.addEventListener("click", async () => {

    try {

      await signInWithPopup(
        auth,
        googleProvider
      );

      showMessage("Google login successful! 🚀", false);

    } catch (error) {

      showMessage(error.message, true);

    }

  });

}


// ======================================
// Forgot Password
// ======================================

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {

  forgotPassword.addEventListener("click", async () => {

    const email = loginEmail.value.trim();

    if (!email) {

      showMessage(
        "पहले अपना email address डालो।",
        true
      );

      return;

    }

    try {

      await sendPasswordResetEmail(
        auth,
        email
      );

      showMessage(
        "Password reset email भेज दिया गया है 📩",
        false
      );

    } catch (error) {

      showMessage(error.message, true);

    }

  });

}


// ======================================
// Logout
// ======================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", async () => {

    try {

      await signOut(auth);

      showScreen(authScreen);

    } catch (error) {

      showMessage(error.message, true);

    }

  });

}


// ======================================
// Auth State
// ======================================

onAuthStateChanged(auth, (user) => {

  if (user) {

    showScreen(appScreen);

  } else {

    const termsAccepted =
      localStorage.getItem("termsAccepted");

    if (termsAccepted === "true") {

      showScreen(authScreen);

    } else {

      showScreen(welcomeScreen);

    }

  }

});


// ======================================
// Message
// ======================================

function showMessage(text, isError) {

  if (!message) return;

  message.textContent = text;

  message.classList.remove("hidden");

  if (isError) {
    message.style.color = "#ff4d4d";
  } else {
    message.style.color = "#ffffff";
  }

}
