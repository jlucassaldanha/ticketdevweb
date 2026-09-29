
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Control, Controller } from 'react-hook-form';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectItem } from '@/components/ui/select';

interface SearchCardProps {
  control: Control<{
      search: string;
      category: string;
  }, any, {
      search: string;
      category: string;
  }>;
  categoryOptions: { label: string, value: string }[];
}
export default function SearchCard({ control, categoryOptions }: SearchCardProps) {
  return (
    <Card>
      <CardContent className='flex flex-col md:flex-row gap-5'>
        <Controller 
          name="search"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <Label htmlFor='search'>Procurar</Label>
              <Input 
                {...field}
                id="search" 
                aria-invalid={fieldState.invalid}
                placeholder='Nome do evento'
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller 
          name='category'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor='category'>Categoria</Label>
              <Select 
                items={categoryOptions}
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="category" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Selecione uma categoria"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categoryOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </CardContent>
    </Card>   
  )
}