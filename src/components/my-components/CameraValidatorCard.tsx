import { QrCode } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface CameraValidatorCardProps {
  isCameraActive: boolean
  toggleCamera: () => Promise<void>
}

export function CameraValidatorCard({ isCameraActive, toggleCamera }: CameraValidatorCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Validar com Câmera</CardTitle>
      </CardHeader>

      <CardContent>
        {isCameraActive ? (
          <div 
            id="qr-reader" 
            className="w-full max-w-[320px] rounded-xl overflow-hidden border border-zinc-700 [&_video]:rounded-xl" 
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-primary">
            <QrCode className="w-16 h-16 mb-2 animate-pulse" />
          </div>
        )}

        <p>
          {isCameraActive
            ? 'Aponte a câmera traseira para o QR Code do ingresso.'
            : 'Clique no botão abaixo para ligar a câmera e escanear o bilhete.'}
        </p>
      </CardContent>

      <CardFooter>
        <Button 
          variant={isCameraActive ? "destructive" : "default"} 
          onClick={toggleCamera}
          className="w-full"
        >
          {isCameraActive ? 'Desligar Câmera' : 'Ligar Câmera'}
        </Button>
      </CardFooter>
    </Card>
  )
}