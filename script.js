ki// ======================================
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
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
// =========================
// GameLite Social Feed
// =========================

const createPostBtn = document.getElementById("createPostBtn");
const createMenu = document.getElementById("createMenu");
const uploadVideoBtn = document.getElementById("uploadVideoBtn");
const createTextBtn = document.getElementById("createTextBtn");
const videoInput = document.getElementById("videoInput");
const feedPosts = document.getElementById("feedPosts");

// Open / close + menu
if (createPostBtn) {
  createPostBtn.addEventListener("click", () => {
    createMenu.classList.toggle("active");
  });
}

// Upload video
if (uploadVideoBtn) {
  uploadVideoBtn.addEventListener("click", () => {
    videoInput.click();
  });
}

// When a video is selected
if (videoInput) {
  videoInput.addEventListener("change", () => {
    const file = videoInput.files[0];

    if (!file) return;

    const videoURL = URL.createObjectURL(file);

    const post = document.createElement("article");
    post.className = "feed-post";

    post.innerHTML = `
      <div class="feed-post-text">
        🎮 New gaming video
      </div>

      <video controls playsinline>
        <source src="${videoURL}" type="${file.type}">
        Your browser does not support video playback.
      </video>

      <div class="feed-actions">
        <button onclick="likePost(this)">❤️ Like</button>
        <button onclick="sharePost()">🔗 Share</button>
      </div>
    `;

    feedPosts.prepend(post);

    createMenu.classList.remove("active");

    videoInput.value = "";
  });
}

// Create text post
if (createTextBtn) {
  createTextBtn.addEventListener("click", () => {
    const text = prompt("What do you want to share?");

    if (!text || !text.trim()) return;

    const post = document.createElement("article");
    post.className = "feed-post";

    post.innerHTML = `
      <div class="feed-post-text">
        ${escapeHTML(text)}
      </div>

      <div class="feed-actions">
        <button onclick="likePost(this)">❤️ Like</button>
        <button onclick="sharePost()">🔗 Share</button>
      </div>
    `;

    feedPosts.prepend(post);

    createMenu.classList.remove("active");
  });
}

// Like button
function likePost(button) {
  button.classList.toggle("liked");

  if (button.classList.contains("liked")) {
    button.textContent = "❤️ Liked";
  } else {
    button.textContent = "❤️ Like";
  }
}

// Share
function sharePost() {
  if (navigator.share) {
    navigator.share({
      title: "GameLite",
      text: "Check out this gaming post on GameLite!"
    });
  } else {
    alert("Share is not supported on this browser.");
  }
}

// Basic text protection
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
    }
<script type="module" src="script.js"></script>
// ==========================================
// FIREBASE + GOOGLE LOGIN
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// ==========================================
// 1. FIREBASE CONFIG
// ==========================================
// Firebase Console → Project Settings → Your apps
// से अपनी actual Firebase configuration यहाँ डालो.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};


// ==========================================
// 2. INITIALIZE FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


// ==========================================
// 3. GOOGLE LOGIN
// ==========================================

window.googleLogin = async function () {

  try {

    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log("Google Login Successful:", user);

    alert("Welcome, " + (user.displayName || "User") + " 🎉");

    // User information
    console.log("Name:", user.displayName);
    console.log("Email:", user.email);
    console.log("Photo:", user.photoURL);

  } catch (error) {

    console.error("Google Login Error:", error);

    alert("Google Login failed ❌\n" + error.message);

  }

};


// ==========================================
// 4. LOGOUT
// ==========================================

window.googleLogout = async function () {

  try {

    await signOut(auth);

    alert("Logged out successfully ✅");

  } catch (error) {

    console.error("Logout Error:", error);

    alert("Logout failed ❌");

  }

};


// ==========================================
// 5. CHECK LOGIN STATUS
// ==========================================

onAuthStateChanged(auth, (user) => {

  if (user) {

    console.log("User is logged in ✅");

    console.log("Name:", user.displayName);
    console.log("Email:", user.email);

  } else {

    console.log("No user is logged in.");

  }

});


// ==========================================
// END
// ==========================================
// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In
const googleLoginBtn = document.getElementById("googleLogin");

if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log("Google Login Successful:", user);

      alert(`Welcome, ${user.displayName}!`);

    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google Sign-In failed: " + error.message);
    }
  });
}

// Check login status
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in:", user.displayName);
    console.log("Email:", user.email);
    console.log("Photo:", user.photoURL);
  } else {
    console.log("User is not logged in");
  }
});

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  });
}
<script type="module" src="script.js"></script>
