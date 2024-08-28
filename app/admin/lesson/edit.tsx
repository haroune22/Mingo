import { SimpleForm, Edit, TextInput, NumberInput, ReferenceInput } from "react-admin"


export const LessonEdit = () => {
  return (
    <Edit>
        <SimpleForm >
            <NumberInput source="id"  label="Id" />
            <TextInput source="title"  label="Title" />
            <ReferenceInput 
                source="unitId"
                reference="units"
            />
            <NumberInput source="order" label='order' />
        </SimpleForm>
    </Edit>
  )
}
