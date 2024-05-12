import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    // console.log(imagePercent);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    // console.log("form data ", formData);

    const { currentUser } = useSelector((state) => state.user);
    // console.log("Cur", currentUser);
    if (!currentUser) {
        return <div>Loading...</div>;
    }

    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image]);
    const handleFileUpload = async (image) => {
        // console.log("Image: ", image);
        const storage = getStorage(app);
        // console.log("Storage: ", storage);
        const fileName = new Date().getTime() + image.name;
        // console.log("FileName: ", fileName);
        const storageRef = ref(storage, fileName);
        // console.log("StorageRef: ", storageRef);
        const uploadTask = uploadBytesResumable(storageRef, image);
        // console.log("UploadTask: ", uploadTask);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log("Upload is " + progress.toFixed(2) + " % done");
                setImagePercent(Math.round(progress));
            },
            (error) => {
                console.log(error);
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setFormData({ ...formData, profilePicture: downloadUrl });
                });
            }
        );
    };
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <h1></h1>
            <form className="flex flex-col gap-4">
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                    src={formData.profilePicture || currentUser.profilePicture}
                    alt="Profile"
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                    onClick={() => fileRef.current.click()}
                />
                <p className="text-sm self-center">
                    {imageError ? (
                        <span className="text-red-700">
                            Error uploading image (file size must be less than 2MB)
                        </span>
                    ) : imagePercent > 0 && imagePercent < 100 ? (
                        <span className="text-slate-700">
                            {" "}
                            {`Uploading: ${imagePercent}%`}
                        </span>
                    ) : imagePercent === 100 ? (
                        <span className="text-green-700">
                            Image uploaded successfully
                        </span>
                    ) : (
                        ""
                    )}
                </p>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="bg-slate-100 rounded-lg p-3"
                    defaultValue={currentUser.username}
                />
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="bg-slate-100 rounded-lg p-3"
                    defaultValue={currentUser.email}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="bg-slate-100 rounded-lg p-3"
                />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    Update
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-red-700 cursor-pointer">Sign out</span>
            </div>
        </div>
    );
}
