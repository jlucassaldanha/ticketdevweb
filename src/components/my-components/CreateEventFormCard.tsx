import { Control, Controller } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldError } from '../ui/field';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface CreateEventFormCardProps {
  control: Control<{
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    date: string;
    location: string;
    capacity: number;
    price: number;
  }, any, {
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    date: string;
    location: string;
    capacity: number;
    price: number;
  }>
  onSubmit: (e: React.SubmitEvent) => void
}
export function CreateEventFormCard({ control, onSubmit }: CreateEventFormCardProps) {
  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Dados do Evento</CardTitle>
        </CardHeader>

        <CardContent>
          <Controller 
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor='title'>Titulo</Label>
                <Input 
                  {...field}
                  id="title" 
                  aria-invalid={fieldState.invalid}
                  placeholder='Titulo do Evento'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>

        <CardContent className='flex gap-5'>    
          <Controller 
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor='category'>Categoria</Label>
                <Input 
                  {...field}
                  id="category" 
                  aria-invalid={fieldState.invalid}
                  placeholder='Categoria do Evento'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          
          <Controller 
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor='date'>Data e Hora</Label>
                <Input 
                  {...field}
                  id="date" 
                  type='datetime-local'
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>

        <CardContent>
          <Controller 
            name="location"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor='location'>Localização</Label>
                <Input 
                  {...field}
                  id="location" 
                  aria-invalid={fieldState.invalid}
                  placeholder='Local do Evento'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>

        <CardContent className='flex gap-5'>    
          <Controller 
            name="price"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor='price'>Preço</Label>
                <Input 
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  id="price" 
                  type='number'
                  aria-invalid={fieldState.invalid}
                  placeholder='Preço'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller 
            name="capacity"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor='capacity'>Capacidade</Label>
                <Input 
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  id="capacity" 
                  type='number'
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>

        <CardContent>
          <Controller 
            name="imageUrl"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor='imageUrl'>URL da Imagem</Label>
                <Input 
                  {...field}
                  id="imageUrl" 
                  aria-invalid={fieldState.invalid}
                  placeholder='URL da Imagem do Evento'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>

        <CardContent>
          <Controller 
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor='description'>Descrição</Label>
                <Textarea 
                  {...field}
                  id="description" 
                  aria-invalid={fieldState.invalid}
                  placeholder='Descrição do Evento'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>

        <CardFooter>
          <Button type='submit'>
            Publicar Evento
          </Button>
        </CardFooter> 
      </Card>
    </form>
  )
}