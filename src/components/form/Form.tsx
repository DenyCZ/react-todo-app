import { Card, CardContent, Typography, Button, TextField } from '@mui/material'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import { useAppDispatch } from '@/redux/store'
import { addTodo } from '@/reducers/todo-reducer'
import dayjs from 'dayjs'
import { TodoItem } from '../todo-item/type/TodoItem.type'
import { v4 as uuidv4 } from 'uuid'

const validationSchema = object({
    name: string().required('Name of the task is required'),
    description: string().required('Description of the task is required'),
    time: string().required('Time is required'),
})

const Form = () => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            time: dayjs().format('YYYY-MM-DDTHH:mm'),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(
                addTodo({
                    id: uuidv4(),
                    name: values.name,
                    description: values.description,
                    time: dayjs(values.time).unix(),
                    state: 'active',
                } as TodoItem),
            )
            formik.resetForm()
        },
    })

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Create new task
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        sx={{ marginBottom: '16px' }}
                        fullWidth
                        id="name"
                        name="name"
                        label="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        sx={{ marginBottom: '16px' }}
                        fullWidth
                        id="description"
                        name="description"
                        label="description"
                        type="text"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <TextField
                        sx={{ marginBottom: '16px' }}
                        fullWidth
                        id="time"
                        name="time"
                        type="datetime-local"
                        value={formik.values.time}
                        onChange={formik.handleChange}
                        error={formik.touched.time && Boolean(formik.errors.time)}
                        helperText={formik.touched.time && formik.errors.time}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default Form
