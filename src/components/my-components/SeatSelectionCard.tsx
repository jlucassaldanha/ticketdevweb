import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface SeatSelectionCardProps {
  rows: string[];
  seatsPerRow: number;
  occupiedSeats: string[];
  selectedSeat: string | null;
  handleSeatClick: (seatCode: string) => void;
}

export function SeatSelectionCard({ rows, seatsPerRow, occupiedSeats, selectedSeat, handleSeatClick }: SeatSelectionCardProps) {
  return (
    <Card className=" p-5">
        <CardContent>
          <div className='flex flex-col items-center justify-center w-full'>
            <div className="w-full h-1 bg-linear-to-r bg-primary rounded-full z-10" />
            <span className="mt-6 text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
              Tela/Palco
            </span>
          </div>
        </CardContent>

        <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4 custom-scrollbar">
          <div className="flex flex-col items-center min-w-max mx-auto px-4 py-2">
            {rows.map((row) => (
              <div key={row} className="flex justify-center items-center gap-0.5 mb-0.5">
                <span className="w-4 text-center text-sm font-bold shrink-0">{row}</span>

                {Array.from({ length: seatsPerRow }, (_, i) => {
                  const seatCode = `${row}${i + 1}`;
                  
                  return (
                    <Button
                      key={seatCode}
                      className={`h-8 w-8 p-0 text-xs rounded-full shrink-0 transition-colors ${
                        occupiedSeats.includes(seatCode)
                          ? 'bg-primary-foreground text-foreground cursor-not-allowed opacity-60 border-none'
                          : selectedSeat === seatCode
                          ? 'bg-secondary text-secondary-foreground border-secondary'
                          : ''
                      }`}
                      onClick={() => handleSeatClick(seatCode)}
                      disabled={occupiedSeats.includes(seatCode)}
                    >
                      {seatCode}
                    </Button>
                  );
                })}
              </div>
            ))}
          </div>

          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
      </Card>
  )
}