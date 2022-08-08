import React, { useState } from "react";
// import firebase from "firebase/app";

function FileUpload() {
  // const [uploadValue, setUploadValue] = useState(0);
  // const [picture, setPicture] = useState(null);
  // const handleUpload = (event) => {
  //   const file = event.target.file[0];
  //   const storage = firebase.storage();
  //   console.log(file, storage);
  //   const metadata = {
  //     contentType: "image/jpeg",
  //   };
  //   const uploadTask = firebase.storageRef
  //     .child("fotos/" + file.name)
  //     .put(file, metadata);
  //   //
  //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, [
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setUploadValue({ uploadValue: progress });
  //       console.log("Upload is " + progress + "% done");
  //       switch (snapshot.state) {
  //         case firebase.storage.TaskState.PAUSED: // or 'paused'
  //           console.log("Upload is paused");
  //           break;
  //         case firebase.storage.TaskState.RUNNING: // or 'running'
  //           console.log("Upload is running");
  //           break;
  //         default:
  //           console.log("WAIT PLEASE");
  //       }
  //     },
  //     (error) => {
  //       // A full list of error codes is available at
  //       // https://firebase.google.com/docs/storage/web/handle-errors
  //       switch (error.code) {
  //         case "storage/unauthorized":
  //           // User doesn't have permission to access the object
  //           break;
  //         case "storage/canceled":
  //           // User canceled the upload
  //           break;
  //         case "storage/unknown":
  //           // Unknown error occurred, inspect error.serverResponse
  //           break;
  //         default:
  //           console.log("error");
  //       }
  //     },
  //     () => {
  //       // Upload completed successfully, now we can get the download URL
  //       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //         console.log("File available at", downloadURL);
  //       });
  //     },
  //   ]);
  // };
  // return (
  //   <div>
  //     <progress value={uploadValue} max="100"></progress>
  //     <br />
  //     <input type="file" onChange={handleUpload} />
  //     <br />
  //     <img width="320" src={setPicture(picture)} alt="" />
  //   </div>
  // );
}

export default FileUpload;
