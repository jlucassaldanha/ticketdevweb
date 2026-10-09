"use client";

import { AlertCard } from "@/components/my-components/AlertCard";
import EventDate from '@/components/my-components/EventDate';
import EventLocation from '@/components/my-components/EventLocation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from "@/contexts/authContext";
import { useCameraScanner } from '@/hooks/useCameraScanner';
import useEventDetails from "@/hooks/useEventDetails";
import { useValidateTicket } from '@/hooks/useValidateTicket';
import { AlertCircleIcon, Divide, QrCode } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { Controller } from 'react-hook-form';

export default function GateEventPage() {
  const auth = useAuth();

  if (!auth.token) {
    redirect("/login");
  }

  if (auth.user?.role !== "VALIDATOR" && auth.user?.role !== "ORGANIZER") {
    redirect("/");
  }

  const { id } = useParams() as { id: string };

  const { event, isLoading, error } = useEventDetails(id);

  const {
    validateTicket,
    isPending,
    validationResult,
    control,
    handleSubmit,
    onSubmit
  } = useValidateTicket(id)

  const {
    isCameraActive,
    toggleCamera
  } = useCameraScanner({ onScan: validateTicket })

  return (
    <div className="flex flex-col gap-5 justify-center items-center p-10">
      {!event || isLoading ? (
        <div className='w-150 flex flex-col gap-5'>
          <Skeleton className="h-10 w-3/4"/>

          <Skeleton className="h-4 w-1/3" />

          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : (
        <div>
          <div className="text-3xl font-bold w-full pb-5">{event?.title}</div>

          <div className='w-full'><EventDate date={new Date(event?.date || new Date()).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })} /></div>

          <div className='w-full'><EventLocation location={event?.location || "Local"} /></div>
        </div>
      )}
      

      <div className="flex flex-col gap-5 w-full md:w-1/3 items-center justify-center">
        {error && (
          <div>
            <AlertCard
              color="red"
              title="Erro"
              description={error.message || ""}
              icon={<AlertCircleIcon />}
            />
          </div>
        )}

        {!event || isLoading ? (
          <div>
            <Skeleton className='h-80 w-100'/>
          </div>
        ) : (
          <div className='w-full'>
            <Tabs defaultValue="camera" className="w-full">
              <TabsList variant="line">
                <TabsTrigger value="camera">Camera</TabsTrigger>
                <TabsTrigger value="manual">Manual</TabsTrigger>
              </TabsList>
              <TabsContent value="camera">
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
                        ? 'Aponte a câmara traseira para o QR Code do ingresso.'
                        : 'Clique no botão abaixo para ligar a câmara e escanear o bilhete.'}
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
              </TabsContent>

              <TabsContent value="manual">
                <Card >
                  <CardHeader>
                    <CardTitle>Validação Manual</CardTitle>
                    <CardDescription>
                      Digite ou cole o Hash do Ingresso (`secureHash`) abaixo:
                    </CardDescription>
                  </CardHeader>

                  <form id='validate-form' onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className='max-w-100 flex flex-col gap-3'>
                      <Controller 
                        name='hash'
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <Label htmlFor='hash'>Hash</Label>
                            <Input 
                              {...field}
                              id="hash" 
                              aria-invalid={fieldState.invalid}
                              placeholder='Hash do Ingresso'
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </CardContent>
                  </form>
                  
                  <CardFooter>
                    <Button className='w-full' type='submit' form='validate-form' disabled={isPending} >
                      {!isPending ? 'Validar Ingresso' : 'Validando...'}
                    </Button>
                  </CardFooter>
                </Card>

                {validationResult.status !== 'NONE' && (
                  <div className="mt-4 w-full">
                    <AlertCard 
                      color={validationResult.status === 'VALID' ? 'green' : 'red'}
                      title={validationResult.status === 'VALID' ? 'Sucesso' : 'Atenção'}
                      description={validationResult.message}
                      icon={<AlertCircleIcon />}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
