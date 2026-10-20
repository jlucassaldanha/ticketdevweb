import { MapPinIcon } from 'lucide-react';

export default function EventLocation({ location }: { location: string }) {
  return (
    <div className='flex items-center gap-2'>
      <div className='text-secondary'>
        <MapPinIcon className="h-4 w-4" />
      </div>
      <span>{location}</span>
    </div>
  );
}