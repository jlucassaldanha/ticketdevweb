import { Control, Controller, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldError } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export interface ValidationFormData {
  hash: string;
}

interface ManualValidatorCardProps {
  isPending: boolean
  control: Control<ValidationFormData>
  handleSubmit: UseFormHandleSubmit<ValidationFormData>
  onSubmit: SubmitHandler<ValidationFormData>
}

export function ManualValidatorCard({ isPending, control, handleSubmit, onSubmit}: ManualValidatorCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Validação Manual</CardTitle>
        <CardDescription>
          Digite ou cole o Hash do Ingresso (`secureHash`) abaixo:
        </CardDescription>
      </CardHeader>

      <form id='validate-form' onSubmit={handleSubmit(onSubmit)}>
        <CardContent className='max-w-100 flex flex-col gap-3'>
          <Controller 
            name='hash'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor='hash'>Hash</Label>
                <Input 
                  {...field}
                  id="hash" 
                  aria-invalid={fieldState.invalid}
                  placeholder='Hash do Ingresso'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>
      </form>
      
      <CardFooter>
        <Button className='w-full' type='submit' form='validate-form' disabled={isPending} >
          {!isPending ? 'Validar Ingresso' : 'Validando...'}
        </Button>
      </CardFooter>
    </Card>
  )
}