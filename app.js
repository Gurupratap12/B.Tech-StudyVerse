import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyArw35FUsbZBvestPAGpownObSy1eYggoU",
  authDomain: "collage-notes-a27f8.firebaseapp.com",
  projectId: "collage-notes-a27f8",
  storageBucket: "collage-notes-a27f8.firebasestorage.app",
  messagingSenderId: "761826284769",
  appId: "1:761826284769:web:4add16e9be55455303d3a0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const semesterData = {
  semester1: {
    math: "math",
    physics: "physics",
    PPS: "PPS"
  },
  semester2: {
    math: "bet",
    bet: "math",
    chemistry: "chemistry",
    english: "english"
  }
};

let currentSemester = "semester2";

// 🔥 navigation state
let currentPage = "semester";
let currentSubject = "";

// initial history push
history.pushState({ page: "semester" }, "", "");

// ------------------ SEMESTER SELECT ------------------
window.selectSemester = function (sem) {
  currentSemester = sem;
  currentPage = "subjects";

  history.pushState({ page: "subjects" }, "", "");

  loadSubject();
};

// ------------------ SUBJECT LOAD ------------------
function loadSubject() {
  const container = document.querySelector("#content");
  const subjects = semesterData[currentSemester];

  if (!subjects) {
    container.innerHTML = "<h1>No data found</h1>";
    return;
  }

  container.innerHTML = `
    <div class="min-h-screen flex flex-col items-center pt-10">

      <div class="w-40 h-40 rounded-full bg-white/10 backdrop-blur-xl 
        border border-white/20 flex items-center justify-center">
        <h1 class="text-xl font-bold text-white">Subjects</h1>
      </div>

      <div id="cards" 
        class="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      </div>

    </div>
  `;

  const cardsContainer = document.querySelector("#cards");

  Object.keys(subjects).forEach(id => {
    cardsContainer.innerHTML += `
      <div onclick="showOptions('${id}')" 
        class="cursor-pointer bg-gray-200 shadow-md rounded-lg p-4 text-center">
        <h1 class="text-xl font-bold">
          ${id.charAt(0).toUpperCase() + id.slice(1)}
        </h1>
        <p>All notes & PYQs</p>
      </div>
    `;
  });
}

// ------------------ OPTIONS ------------------
window.showOptions = function (subjectId) {
  currentSubject = subjectId;
  currentPage = "options";

  history.pushState({ page: "options" }, "", "");

  const container = document.querySelector("#content");

  container.innerHTML = `
    <div class="flex flex-col items-center gap-6 mt-20">
      <button onclick="loadNotes('${subjectId}')" 
        class="bg-blue-500 text-white px-6 py-3 rounded-lg">
        Notes
      </button>

      <button onclick="loadPYQ('${subjectId}')" 
        class="bg-purple-500 text-white px-6 py-3 rounded-lg">
        PYQ
      </button>

      <button onclick="goBack()" 
        class="bg-gray-500 text-white px-6 py-2 rounded">
        Back
      </button>
    </div>
  `;
};

// ------------------ NOTES ------------------
window.loadNotes = async function (subjectId) {
  currentPage = "notes";
  history.pushState({ page: "notes" }, "", "");

  const container = document.querySelector("#content");
  container.innerHTML = "<h2 class='text-center text-2xl'>Notes</h2>";

  try {
    const snapshot = await getDocs(
      collection(db, "semesters", currentSemester, "subjects", subjectId, "notes")
    );

    if (snapshot.empty) {
      container.innerHTML += `
        <p class='text-center'>No Notes Available</p>
        <div class="text-center mt-6">
          <button onclick="goBack()" class="bg-gray-500 text-white px-6 py-2 rounded">Back</button>
        </div>`;
      return;
    }

    let html = `
      <h2 class='text-center text-2xl mt-4'>Notes</h2>
      <ul class="max-w-xl mx-auto mt-6 space-y-4">
    `;

    snapshot.forEach(doc => {
      const note = doc.data();

      html += `
        <li class="bg-white border rounded-lg px-5 py-4 shadow-sm">
          <a href="${note.url}" target="_blank" 
            class="flex justify-between items-center">
            <span>📄 ${note.title}</span>
            <span>Open ↗</span>
          </a>
        </li>
      `;
    });

    html += `</ul>
      <div class="text-center mt-6">
        <button onclick="goBack()" class="bg-gray-500 text-white px-6 py-2 rounded">Back</button>
      </div>
    `;

    container.innerHTML = html;

  } catch (error) {
    console.log(error);
    container.innerHTML += "<p>Error loading notes</p>";
  }
};

// ------------------ PYQ ------------------
window.loadPYQ = async function (subjectId) {
  currentPage = "pyq";
  history.pushState({ page: "pyq" }, "", "");

  const container = document.querySelector("#content");
  container.innerHTML = "<h2 class='text-center text-2xl'>PYQ</h2>";

  try {
    const snapshot = await getDocs(
      collection(db, "semesters", currentSemester, "subjects", subjectId, "pyq")
    );

    if (snapshot.empty) {
      container.innerHTML += `
        <p class='text-center'>No PYQ Available</p>
        <div class="text-center mt-6">
          <button onclick="goBack()" class="bg-gray-500 text-white px-6 py-2 rounded">Back</button>
        </div>`;
      return;
    }

    let html = `
      <h2 class='text-center text-2xl mt-4'>PYQ</h2>
      <ul class="max-w-xl mx-auto mt-6 space-y-4">
    `;

    snapshot.forEach(doc => {
      const pyq = doc.data();

      html += `
        <li class="bg-white border rounded-lg px-5 py-4 shadow-sm">
          <a href="${pyq.url}" target="_blank" 
            class="flex justify-between items-center">
            <span>📄 ${pyq.title}</span>
            <span>Open ↗</span>
          </a>
        </li>
      `;
    });

    html += `</ul>
      <div class="text-center mt-6">
        <button onclick="goBack()" class="bg-gray-500 text-white px-6 py-2 rounded">Back</button>
      </div>
    `;

    container.innerHTML = html;

  } catch (error) {
    console.log(error);
    container.innerHTML += "<p>Error loading PYQ</p>";
  }
};

// ------------------ BACK FUNCTION ------------------
window.goBack = function () {
  history.back();
};

// ------------------ MOBILE BACK CONTROL ------------------
window.addEventListener("popstate", function () {

  if (currentPage === "notes" || currentPage === "pyq") {
    currentPage = "options";
    showOptions(currentSubject);
  }
  else if (currentPage === "options") {
    currentPage = "subjects";
    loadSubject();
  }
  else if (currentPage === "subjects") {
    currentPage = "semester";
    location.reload(); // optional (semester UI ke liye)
  }
  else {
    history.pushState({ page: "semester" }, "", "");
  }
});
