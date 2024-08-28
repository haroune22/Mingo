import { SimpleForm, Create, TextInput, ReferenceInput, NumberInput} from "react-admin"


export const UnitCreate = () => {
  return (
    <Create>
        <SimpleForm >
            <TextInput source="title"  label="Title" />
            <TextInput source="description" label='description' />
            <ReferenceInput 
                source="courseId"
                reference="courses"
            />
            <NumberInput source="order" label='order' />
        </SimpleForm>
    </Create>
  )
}
