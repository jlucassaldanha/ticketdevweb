'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface UseCameraScannerProps {
  onScan: (decodedText: string) => void
}

interface ScannerInstance {
  isScanning?: boolean;
  stop?: () => Promise<void>;
}

export function useCameraScanner({ onScan }: UseCameraScannerProps) {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const scannerRef = useRef<ScannerInstance | null>(null)
  const onScanRef = useRef(onScan)

  useEffect(() => {
    onScanRef.current = onScan
  }, [onScan])

  const stopScanner = useCallback(async () => {
    const activeScanner = scannerRef.current
    if (activeScanner) {
      try {
        if (activeScanner.isScanning && activeScanner.stop) {
          await activeScanner.stop()
        }
      } catch (err) {
        console.error('Erro ao parar a câmara:', err);
      } finally {
        scannerRef.current = null;
      }
    }
  }, [])

  const toggleCamera = useCallback(async () => {
    if (isCameraActive) {
      await stopScanner();
      setIsCameraActive(false);
    } else {
      setIsCameraActive(true);
    }
  }, [isCameraActive, stopScanner]);

  useEffect(() => {
    let isMounted = true;

    async function startScanner() {
      if (!isCameraActive) return;

      try {
        const { Html5Qrcode } = await import('html5-qrcode');
        const html5Qrcode = new Html5Qrcode('qr-reader');
        scannerRef.current = html5Qrcode;

        if (isMounted) {
          await html5Qrcode.start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              onScanRef.current(decodedText);
              stopScanner();
              setIsCameraActive(false);
            },
            () => {}
          );
        }
      } catch (err) {
        console.error('Erro ao iniciar o leitor de QR Code:', err);
        alert('Não foi possível aceder à câmara. Verifique as permissões no navegador.');
        setIsCameraActive(false);
      }
    }

    if (isCameraActive) {
      startScanner();
    }

    return () => {
      isMounted = false;
      stopScanner();
    };
  }, [isCameraActive, stopScanner]);

  return {
    isCameraActive,
    toggleCamera,
  };
}