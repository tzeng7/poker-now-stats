import { useEffect, useState } from "react";
import StatsTable from "./StatsTable";
import "./Upload.css";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setError("");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a CSV file first");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (res.ok) {
                setStats(data);
            } else {
                setError(data.error || "Failed to process file");
            }
        } catch (err) {
            setError("Upload failed. Make sure the server is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setFileName("");
        setStats(null);
        setError("");
    };

    return (
        <div className="upload-container">
            {!stats ? (
                <div className="upload-card">
                    <div className="upload-icon">📊</div>
                    <h2>Upload Your PokerNow Log</h2>
                    <p className="upload-description">
                        Upload a CSV file exported from PokerNow to analyze your session statistics
                    </p>

                    <div className="file-input-wrapper">
                        <label className="file-input-label">
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="file-input-hidden"
                            />
                            <span className="file-input-button">
                                {fileName || "Choose CSV File..."}
                            </span>
                        </label>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button
                        className="analyze-button"
                        onClick={handleUpload}
                        disabled={!file || loading}
                    >
                        {loading ? "Analyzing..." : "Analyze Stats"}
                    </button>
                </div>
            ) : (
                <div className="results-container">
                    <div className="results-header">
                        <h2>Session Statistics</h2>
                        <button className="reset-button" onClick={handleReset}>
                            ← Analyze Another File
                        </button>
                    </div>
                    <StatsTable data={stats} />
                </div>
            )}
        </div>
    );
}
