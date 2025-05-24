import InputMask from 'react-input-mask'
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useTranslation } from '@/context/TranslationContext'

export default function PhoneInput({ form }) {
    const { translate } = useTranslation()
    return (
        <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{translate('Phone number')}</FormLabel>
                    <FormControl>
                        <InputMask
                            mask="+994 (99) 999 99 99"
                            value={field.value}
                            onChange={field.onChange}
                        >
                            {(inputProps) => <Input {...inputProps} />}
                        </InputMask>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
