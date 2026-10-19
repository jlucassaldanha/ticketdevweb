
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Control, Controller } from 'react-hook-form';
import { Button } from '../ui/button';
import { SearchFormData } from '@/hooks/useSearchTMDB';

interface SearchCardProps {
  control: Control<SearchFormData>;
  onSubmit: (e: React.SubmitEvent) => void;
}

export default function SearchTMDBCard({ control, onSubmit }: SearchCardProps) {
  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardContent className='flex flex-col md:flex-row gap-5 justify-center items-end'>
          <Controller 
            name="searchtmdb"
            control={control}
            render={({ field, fieldState }) => (
              <Field className='w-full'>
                <Label htmlFor='search-tmdb'>Procurar no catálogo TMDb</Label>
                <Input 
                  {...field}
                  id="search-tmdb" 
                  aria-invalid={fieldState.invalid}
                  placeholder='Nome do filme'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit">Pesquisar</Button>
        </CardContent>
      </form>
    </Card>   
  )
}