import { useState, useEffect } from 'react';
import { db, storage } from '../firebase'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';


const useFirestore = (queryCollection: string) => {
  const [docs, setDocs] = useState([]);


  useEffect( () => {
     const unsub = onSnapshot(query(collection(db, queryCollection), ), (snap) =>{
      let documents:Array<String> = [];
      snap.forEach(doc => {
        documents.push({...doc.data(), id:doc.id})
      });
      setDocs(documents);
    })
      return () => unsub();
  } , [])
    
  return {docs};
}

export default useFirestore