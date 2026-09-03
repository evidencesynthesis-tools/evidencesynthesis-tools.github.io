

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1WgI7YLCxRMF-rs7NfqQV9Y3q9u4Cwx4",
  authDomain: "evidencesynthesistools.firebaseapp.com",
  projectId: "evidencesynthesistools",
  storageBucket: "evidencesynthesistools.firebasestorage.app",
  messagingSenderId: "904366106522",
  appId: "1:904366106522:web:eeb147c44871a5ccab7c23",
  measurementId: "G-HGV9X2SCBZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const counterRef = doc(db, "stats", "total_visits");

const currentPath = window.location.pathname;
const isIndexPage = currentPath === '/' || currentPath.endsWith('index.html');

try {
  if (isIndexPage) {
    const snap = await getDoc(counterRef);
    if (snap.exists()) {
      await updateDoc(counterRef, { total_visits: increment(1) });
    } else {
      await setDoc(counterRef, { total_visits: 1 });
    }
  }

  const latestSnap = await getDoc(counterRef);
  let count = 0;
  if (latestSnap.exists()) {
    count = latestSnap.data().total_visits || 0;
  }

  const visitsEl = document.getElementById("visits");
  if (visitsEl) {
    visitsEl.innerText = "Total Visits: " + count;
  }
} catch (error) {
  console.error("Error fetching stats: ", error);
  const visitsEl = document.getElementById("visits");
  if (visitsEl) {
    visitsEl.innerText = "Stats unavailable";
  }
}
