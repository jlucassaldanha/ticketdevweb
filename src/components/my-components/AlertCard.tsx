import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function AlertCard({ title, description, icon, color }: { title: string; description: string; icon: React.ReactNode; color: string }) {
  return (
    <Alert className={`text-${color}-500`}>
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}