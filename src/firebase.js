import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCZg011xbujcU5PoMSe9T2rQfsjPrk63hU',
  authDomain: 'react-notes-c99b1.firebaseapp.com',
  projectId: 'react-notes-c99b1',
  storageBucket: 'react-notes-c99b1.appspot.com',
  messagingSenderId: '108489470915',
  appId: '1:108489470915:web:384d821cf0dca485984376',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const notesCollection = collection(db, 'notes')
