import { SimpleForm, Edit, TextInput } from "react-admin"


export const CourseEdit = () => {
  return (
    <Edit>
        <SimpleForm >
            <TextInput source="id"  label="Id" />
            <TextInput source="title"  label="Title" />
            <TextInput source="imageSrc" label='Image' />
        </SimpleForm>
    </Edit>
  )
}
