import { useRef, useState, useEffect } from "react";

const UploadMedia = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {preview ? (
        <img
          src={preview}
          style={{ objectFit: "contain", width: "90%", height: "100%", margin: "0 auto" }}
          onClick={() => {
            setImage(null);
          }}
          alt=""
        />
      ) : (
        <button
          className="add-person-preview"
          onClick={event => {
            event.preventDefault();
            fileInputRef.current.click();
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        accept="image/*"
        onChange={event => {
          const file = event.target.files[0];
          if (file && file.type.substr(0, 5) === "image") {
            setImage(file);
          } else {
            setImage(null);
          }
        }}
      />
    </div>
  );
};

export default UploadMedia;
