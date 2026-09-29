import { MapPinIcon } from 'lucide-react';

export default function EventLocation({ location }: { location: string }) {
  return (
    <div className='flex items-center gap-2'>
      <MapPinIcon className="h-4 w-4" />
      <span>{location}</span>
    </div>
  );
}