import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAzaXMhxB2qpOO5O6cyrD7WSdeNgJ-KMsg",
	authDomain: "bookstore-fda75.firebaseapp.com",
	databaseURL: "https://bookstore-fda75-default-rtdb.firebaseio.com",
	projectId: "bookstore-fda75",
	storageBucket: "bookstore-fda75.appspot.com",
	messagingSenderId: "172729914102",
	appId: "1:172729914102:web:fc0e1192cf698d1f4d92d7",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file, ID) {
	const storageRef = ref(storage, `userImages/${ID}`);
	await uploadBytes(storageRef, file);
	const url = getDownloadURL(storageRef);
	return url;

}
export async function uploadFileBookImage(file, bookTitle) {
	const storageRef = ref(storage, `bookImages/${bookTitle}`);
	await uploadBytes(storageRef, file);
	const url = getDownloadURL(storageRef);
	return url;
}
