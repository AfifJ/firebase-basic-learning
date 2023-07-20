import { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider, db } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
let loggedUser = "";

onAuthStateChanged(auth, (user) => {
  // user.isAnonymous
  let authChangedText = "anonymous";
  if (user) {
    const uname = user.displayName || user.email;
    loggedUser = user;
    // console.log(user.uid);
    authChangedText = `logged in as ${uname}`;
    document.getElementById("signIn").style.display = "none";
    document.getElementById("signInGoogle").style.display = "none";
    document.getElementById("logout").style.display = "inline";
    console.log('logged in');
  } else {
    document.getElementById("logout").style.display = "none";
    document.getElementById("signIn").style.display = "inline";
    document.getElementById("signInGoogle").style.display = "inline";
    console.log('log out');
  }
  document.getElementById('isanon').textContent = authChangedText;
})
document.getElementById("signIn").addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    const errText = String(err.message);
    gpp.textContent = errText.substring(errText.indexOf(':') + 1, errText.indexOf('(') - 1);
  }
});

document.getElementById('signInGoogle').addEventListener('click', async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
});
document.getElementById('logout').addEventListener('click', async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
})

const dataCollectionRef = collection(db, "stories");

const getDataStories = async () => {
  /* read the data and set the movie list */
  try {
    const data = await getDocs(dataCollectionRef);
    const filtered = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    let htmlResult = "";
    // filtered.forEach(e => console.log(e.title));
    filtered.forEach(e => htmlResult +=
      `<li>
      ${e.title}
      <br>
      <button class="delete" data-id="${e.id}">Delete Story</button>
      <br>
      
      <form class="update-title" data-id=${e.id}>
        <input placeholder="New title" class="new-title" />
        <button type="submit" >Update Title</button>
      </form>
      <br>
      <br>
      </li>`);
    document.querySelector(".result-container").innerHTML = htmlResult;
    // document.getElementById("logout").after(database);
    canUpdate();

  } catch (err) {
    console.error(err);
  }

}
getDataStories();

document.querySelector('.add-stories').addEventListener('submit', async (e) => {
  e.preventDefault();
  const newTitle = document.querySelector(".title-add").value;
  const newSummary = document.querySelector(".summary-add").value;
  try {
    await addDoc(dataCollectionRef, {
      title: newTitle,
      summary: newSummary,
      creator: loggedUser.displayName,
      creatorId: loggedUser.uid
    })
    alert("New stories added");
    getDataStories();
  } catch (err) {
    console.error(err);
  }
  document.querySelector(".title-add").value = "";
  document.querySelector(".summary-add").value = "";
})

document.addEventListener('click', (e) => {
  const eClasslist = e.target.classList;
  // delete story from database
  eClasslist.contains("delete") &&
    deleteStory(e.target.getAttribute('data-id'));
  // update story
})
const canUpdate = () => document.querySelectorAll(".update-title").forEach((e) => {
  e.addEventListener('submit', (el) => {
    el.preventDefault();
    const newTitle = el.target.querySelector('.new-title').value;
    updateStoryTitle(
      el.target.getAttribute('data-id'),
      newTitle
    );
  })
})

const deleteStory = async (id) => {
  const storyDoc = doc(db, "stories", id);
  await deleteDoc(storyDoc);
  getDataStories();
  alert("Story delete success");
}
const updateStoryTitle = async (id, newUpdatedTitle) => {
  const storyDoc = doc(db, "stories", id);
  await updateDoc(storyDoc, { title: newUpdatedTitle });
  getDataStories();
  alert("Story update success");
}