import { QrCode } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from '../ui/skeleton';

interface CameraValidatorCardProps {
  isCameraActive: boolean
  toggleCamera: () => Promise<void>
}

export function CameraValidatorCard({ isCameraActive, toggleCamera }: CameraValidatorCardProps) {
  return (
    <Card className='h-full flex flex-col justify-between'>
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
            <QrCode className="w-16 h-16 mb-2" />
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

export function CameraValidatorCardSkeleton() {
  return (
    <Card className='h-full flex flex-col justify-between'>
      <CardHeader>
        <Skeleton className='h-5 w-2/4'/>
      </CardHeader>

      <CardContent>  
        <div className="flex flex-col items-center justify-center py-10 text-primary">
          <Skeleton className='h-16 w-16'/>
        </div>

        <Skeleton className='h-4 w-3/4'/>
      </CardContent>

      <CardFooter>
        <Skeleton className='h-8 w-full'/>
      </CardFooter>
    </Card>
  )
}