/ Import Firebase modules
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

  // Firebase config
  const firebaseConfig = {
  apiKey: "AIzaSyArw35FUsbZBvestPAGpownObSy1eYggoU",
  authDomain: "collage-notes-a27f8.firebaseapp.com",
  projectId: "collage-notes-a27f8",
  storageBucket: "collage-notes-a27f8.firebasestorage.app",
  messagingSenderId: "761826284769",
  appId: "1:761826284769:web:4add16e9be55455303d3a0"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

 const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const emial = document.getElementById("email");
const password = document.getElementById("password");

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "semester.html";
  }
});

loginBtn.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      window.location.href = "semester.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

signupBtn.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      window.location.href = "semeste.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
