import { RadioGroup} from '@/components/ui/radio-group';
import { Card, CardContent } from '../ui/card';
import { RadioPaymentCard } from './RadioPaymentCard';

export function PaymentMethodCard({ onChange, value }: { onChange: (value: string) => void, value: string }) {
  return (
    <Card className='flex flex-col gap-5 w-full'>
      <CardContent>
        <RadioGroup value={value} onValueChange={onChange}>
          <RadioPaymentCard id="PIX" label="Pix" />

          <RadioPaymentCard id="CREDIT_CARD" label="Cartão de Crédito" />

          <RadioPaymentCard id="DEBIT_CARD" label="Cartão de Débito" />
        </RadioGroup>
      </CardContent>
    </Card>
  )
}