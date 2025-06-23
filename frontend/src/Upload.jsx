    import { useEffect, useState } from "react";
    import StatsTable from "./statsTable";
    

    export default function Upload(){
        const [file, setFile] = useState("")

        const [stats, setStats] = useState(null);

        const handleFileChange = (e) => {
            setFile(e.target.files[0]);
        }

        const handleUpload = async () => {
            if (!file) {
                return;
            }
            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await fetch("http://127.0.0.1:5000/upload", {
                    method: "POST",
                    body: formData
                });
                const data = await res.json();
                console.log(data);
                setStats(data);
            } catch (error) {
                console.error("Upload failed.")
            }
            
        };

        useEffect(() => {
                    console.log(stats);
        }, [stats]);

        return (
            <div>
                <input type="file" accept=".csv" onChange={handleFileChange}></input>
                <input type="submit" onClick={handleUpload}></input>
                {stats && <StatsTable data={stats}></StatsTable>}
            </div>
            
        )
    }