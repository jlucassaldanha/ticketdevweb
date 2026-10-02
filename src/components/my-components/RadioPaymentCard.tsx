import { Field, FieldContent, FieldLabel, FieldTitle } from '../ui/field';
import { RadioGroupItem } from '../ui/radio-group';

export function RadioPaymentCard({ id, label, icon }: { id: string, label: string, icon?: React.ReactNode }) {
  return (
    <FieldLabel htmlFor={id}>
      <Field orientation="horizontal" >
        <FieldContent>
          <FieldTitle className="flex items-center gap-2">
            {icon}
            {label}
          </FieldTitle>
        </FieldContent>
        <RadioGroupItem value={id} id={id} />
      </Field>
    </FieldLabel>
  )
}