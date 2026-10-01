import { Field, FieldContent, FieldLabel, FieldTitle } from '../ui/field';
import { RadioGroupItem } from '../ui/radio-group';

export function RadioPaymentCard({ id, label }: { id: string, label: string }) {
  return (
    <FieldLabel htmlFor={id}>
      <Field orientation="horizontal" >
        <FieldContent>
          <FieldTitle>{label}</FieldTitle>
        </FieldContent>
        <RadioGroupItem value={id} id={id} />
      </Field>
    </FieldLabel>
  )
}