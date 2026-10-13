"use client";

import { AlertCard } from "@/components/my-components/AlertCard";
import { CameraValidatorCard, CameraValidatorCardSkeleton } from "@/components/my-components/CameraValidatorCard";
import EventDate from '@/components/my-components/EventDate';
import EventLocation from '@/components/my-components/EventLocation';
import { ManualValidatorCard, ManualValidatorCardSkeleton } from "@/components/my-components/ManualValidatorCard";
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from "@/contexts/authContext";
import { useCameraScanner } from '@/hooks/useCameraScanner';
import useEventDetails from "@/hooks/useEventDetails";
import { useValidateTicket } from '@/hooks/useValidateTicket';
import { AlertCircleIcon, ArrowLeft} from "lucide-react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
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
    <div className="flex flex-col gap-5 justify-center items-center p-5">
      <div className="w-full">
        <Link href="/gate" className="flex gap-2">
          <ArrowLeft />
          Voltar para os eventos
        </Link>
      </div>

      {!event || isLoading ? (
        <div className='w-full flex flex-col gap-5'>
          <Skeleton className="h-10 w-3/4"/>

          <Skeleton className="h-4 w-1/3" />

          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : (
        <div className="w-full">
          <div className="text-3xl font-bold w-full pb-5">{event?.title}</div>

          <div className='w-full'><EventDate date={new Date(event?.date || new Date()).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })} /></div>

          <div className='w-full'><EventLocation location={event?.location || "Local"} /></div>
        </div>
      )}
      

      <div className="flex flex-col gap-5 w-full items-center justify-center">
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
          <div className="w-full flex flex-col md:flex-row gap-5">
            <div className='w-full'>
              <CameraValidatorCardSkeleton />
            </div>

            <div className='w-full'>
              <ManualValidatorCardSkeleton />
            </div>
          </div>
        ) : (
          <div className='w-full'>
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

            <div className="w-full flex flex-col md:flex-row gap-5">
              <div className="w-full">
                <CameraValidatorCard 
                  isCameraActive={isCameraActive} 
                  toggleCamera={toggleCamera} 
                />
              </div>
              
              <div className="w-full">
                <ManualValidatorCard 
                  isPending={isPending}
                  control={control}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
