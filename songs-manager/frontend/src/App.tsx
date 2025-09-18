import React, { useCallback, useState } from "react";
import "./App.css";
import { FileUpload } from "./components/FileUpload/FileUpload";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";
import { SongTable } from "./components/SongTable/SongTable";
import { useFileUpload } from "./hooks/useFileUpload";
import { useSongs } from "./hooks/useSongs";

const App: React.FC = () => {
  const { songs, loading, error, refetchSongs } = useSongs();
  const { uploadFile, uploading, uploadError } = useFileUpload();
  const [notification, setNotification] = useState<string | null>(null);

  const handleFileUpload = useCallback(
    async (file: File) => {
      try {
        const result = await uploadFile(file);
        setNotification(`הועלו בהצלחה ${result.count} שירים!`);
        await refetchSongs();

        setTimeout(() => setNotification(null), 5000);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    },
    [uploadFile, refetchSongs]
  );

  if (loading && songs.length === 0) {
    return <LoadingSpinner message="טוען שירים..." />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>מערכת ניהול שירים</h1>
        <p>
          העלה קובץ CSV כדי לאכלס את מסד הנתונים. השירים יוצגו ממוינים לפי שם
          הלהקה.
        </p>
      </header>

      {notification && (
        <div className="notification" onClick={() => setNotification(null)}>
          <span>{notification}</span>
          <button className="close-button">×</button>
        </div>
      )}

      <section className="upload-section">
        <FileUpload
          onFileUpload={handleFileUpload}
          loading={uploading}
          error={uploadError}
        />
      </section>

      <section className="table-section">
        <div className="table-header">
          <h2>שירים ({songs.length})</h2>
          {loading && <LoadingSpinner size="small" message="מרענן..." />}
        </div>

        {error ? (
          <div className="error-message">
            <p>שגיאה בטעינת השירים: {error}</p>
            <button onClick={refetchSongs} className="retry-button">
              נסה שוב
            </button>
          </div>
        ) : (
          <SongTable songs={songs} loading={loading} />
        )}
      </section>
    </div>
  );
};

export default App;
