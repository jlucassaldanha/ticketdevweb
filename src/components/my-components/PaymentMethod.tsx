import { Field, FieldContent, FieldLabel, FieldTitle } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '../ui/card';

export function PaymentMethod() {
  return (
    <Card className='flex flex-col gap-5 w-full'>
      <CardContent>
      <RadioGroup defaultValue="pix">
          <FieldLabel htmlFor="pix">
            <Field orientation="horizontal" >
              <FieldContent>
                <FieldTitle>PIX</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="PIX" id="pix" />
            </Field>
          </FieldLabel>

          <FieldLabel htmlFor="debit-card">
            <Field orientation="horizontal" >
              <FieldContent>
                <FieldTitle>Cartão de Débito</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="Cartão de Débito" id="debit-card" />
            </Field>
          </FieldLabel>


          <FieldLabel htmlFor="credit-card">
            <Field orientation="horizontal" >
              <FieldContent>
                <FieldTitle>Cartão de Crédito</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="Cartão de Crédito" id="credit-card" />
            </Field>
          </FieldLabel>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}