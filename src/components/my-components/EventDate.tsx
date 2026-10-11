import { CalendarIcon } from 'lucide-react';

export default function EventDate({ date }: { date: string }) {
  return (
    <div className='flex items-center gap-2'>
      <div>
        <CalendarIcon className="h-4 w-4" />
      </div>
      <span>{date}</span>
    </div>
  );
}