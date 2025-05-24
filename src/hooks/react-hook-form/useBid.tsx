import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface BidFormFields {
    offer: number;
}

export const useBidForm = () => {
    const BidSchema = Yup.object().shape({

        offer: Yup.number().required('Please enter a bid offer'),

    })
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            offer: 0
        },
        mode: 'onSubmit',
        resolver: yupResolver(BidSchema),
    })

    return {
        handleSubmit,
        errors,
        control,
    }
}

export type RegisterForm = ReturnType<typeof useBidForm>
