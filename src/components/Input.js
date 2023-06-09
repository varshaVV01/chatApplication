import { async } from '@firebase/util'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import '../Pages/style.css'
import {v4 as uuid} from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase'

const Input = () => {
  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };
  const[text,setText]=useState("");
  const[img,setImg]=useState(null)
  const {currentUser}=useContext(AuthContext)
  const {data}=useContext(ChatContext)

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }
  return (
    <div className='inputs'>
      <input type="text" placeholder='Type Something... ' onChange={e=>setText(e.target.value)} value={text}/>
      <div className='send'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2bj1zT139tRPcwOZRSwtiYlv8dRbrm2TK9w&usqp=CAU" alt=" " />
        <input type="file" style={{display:'none'}} id="file" onChange={e=>setImg(e.target.files[0])}/>
        <label htmlFor='file'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQELDcfVDKE1_cJsnGaUfNNYhsa8SEifAs4aQ&usqp=CAU" alt=' '/>
        </label>
        <button onKeyDown={handleKey} onClick={handleSend} value={text}>Send</button>
      </div>
    </div>
  )
}

export default Input;
