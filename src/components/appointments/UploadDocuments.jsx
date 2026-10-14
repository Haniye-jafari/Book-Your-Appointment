import { useState } from 'react';
import styles from './UploadDocuments.module.css';
import { getCurrentUser, getUserDocuments, saveUserDocuments } from '../../utils/auth';

function UploadDocuments({ onNext }) {
  const [documents, setDocuments] = useState([]);
  const [documentName] = useState('Insurance Card');
  const [uploadDate] = useState('');

  const handleFileSelection = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    const nextDocuments = selectedFiles.map((file) => {
      const fileReader = new FileReader();
      return new Promise((resolve) => {
        fileReader.onload = () => resolve({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          name: file.name || 'Uploaded document',
          type: file.type || 'application/octet-stream',
          url: fileReader.result,
          uploadedAt: new Date().toISOString(),
        });
        fileReader.readAsDataURL(file);
      });
    });

    Promise.all(nextDocuments).then((resolvedDocs) => {
      setDocuments((previous) => [...previous, ...resolvedDocs]);
    });
  };

  const handleSave = () => {
    const currentUser = getCurrentUser();
    const existingDocuments = currentUser?.username ? getUserDocuments(currentUser.username) : [];
    const mergedDocuments = [...existingDocuments, ...documents].map((document, index) => ({
      ...document,
      id: document.id || `${document.name || 'document'}-${index}`,
      label: documentName || 'Document',
      uploadDate: uploadDate || document.uploadDate || new Date().toISOString().slice(0, 10),
    }));

    if (currentUser?.username) saveUserDocuments(currentUser.username, mergedDocuments);
    if (onNext) onNext(mergedDocuments);
  };

  return (
    <div className={styles.container}>
      <div className={styles.detailPanel}>
        <div className={styles.detailHeader}>
          <h3>Upload Your Medical Documents</h3>
          <span className={styles.infoBadge}>Secure upload</span>
        </div>

        <label className={styles.uploadBox} htmlFor="document-upload">
          <div className={styles.optionIcon}>📤</div>
          <strong>Drag & drop your files here</strong>
          <p>Accepted formats: PDF, JPG, PNG, DOC. Keep your insurance card and prescriptions ready.</p>
          <input id="document-upload" type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFileSelection} hidden />
        </label>


        <div className={styles.buttonRow}>
          <button className={styles.primaryButton} type="button" onClick={handleSave}>
            Upload Documents
          </button>
       
        </div>
      </div>
    </div>
  );
}

export default UploadDocuments;
