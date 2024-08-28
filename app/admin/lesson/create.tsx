import { SimpleForm, Create, TextInput, ReferenceInput, NumberInput} from "react-admin"


export const LessonCreate = () => {
  return (
    <Create>
        <SimpleForm >
            <TextInput source="title"  label="Title" />
            <ReferenceInput 
                source="unitId"
                reference="units"
            />
            <NumberInput source="order" label='order' />
        </SimpleForm>
    </Create>
  )
}
