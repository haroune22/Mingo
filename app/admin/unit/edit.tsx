import { SimpleForm, Edit, TextInput, NumberInput, ReferenceInput } from "react-admin"


export const UnitEdit = () => {
  return (
    <Edit>
        <SimpleForm >
            <NumberInput source="id"  label="Id" />
            <TextInput source="title"  label="Title" />
            <TextInput source="description" label='description' />
            <ReferenceInput 
                source="courseId"
                reference="courses"
            />
            <NumberInput source="order" label='order' />
        </SimpleForm>
    </Edit>
  )
}
