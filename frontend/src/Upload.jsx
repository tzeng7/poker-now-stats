    import { useState } from "react";

    export default function Upload(){
        const [file, setFile] = useState("")

        const handleFileChange = (e) => {
            setFile(e.target.files[0]);
        }

        const handleUpload = async () => {
            if (!file) {
                return;
            }
            const formData = FormData();
            formData.append("file", file);

            try {
                const res = await fetch("http://127.0.0.1:5000/upload", {
                    method: "POST",
                    body: formData
                });
                const data = await res.json();

            } catch (error) {
                console.error("Upload failed.")
            }
            
        };
        return (
            <div>
                <input type="file" accept=".csv" onChange={handleFileChange}></input>
                <input type="submit" onClick={handleUpload}></input>
            </div>
            
        )
    }