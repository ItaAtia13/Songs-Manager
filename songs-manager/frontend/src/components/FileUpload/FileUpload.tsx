import React, { useCallback, useState, useRef } from 'react';
import './FileUpload.css';

interface FileUploadProps {
  onFileUpload: (file: File) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  loading = false,
  error = null,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('אנא בחר קובץ CSV');
      return;
    }

    await onFileUpload(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onFileUpload]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  return (
    <div className="upload-container">
      <div
        className={`drop-zone ${dragActive ? 'active' : ''} ${loading ? 'disabled' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden-input"
          disabled={loading}
        />

        <div className="upload-content">
          {loading ? (
            <>
              <div className="upload-icon">⏳</div>
              <p>מעלה קובץ...</p>
            </>
          ) : (
            <>
              <div className="upload-icon">📁</div>
              <p>גרור ושחרר קובץ CSV כאן, או לחץ לבחירה</p>
              <p className="upload-hint">פורמט נתמך: קבצי CSV (עד 10MB)</p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          <span>⚠️ {error}</span>
        </div>
      )}
    </div>
  );
};