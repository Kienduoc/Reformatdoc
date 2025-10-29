import React, { useState, useEffect } from 'react';
import { Upload, Download, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const WordColorRemover = () => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedFiles, setProcessedFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState('');
  const [error, setError] = useState('');
  const [jsZipLoaded, setJsZipLoaded] = useState(false);

  // Load JSZip library
  useEffect(() => {
    if (window.JSZip) {
      setJsZipLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    script.async = true;
    script.onload = () => {
      setJsZipLoaded(true);
    };
    script.onerror = () => {
      setError('Không thể tải thư viện xử lý. Vui lòng refresh trang.');
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleFile