import { SimpleForm, Edit, TextInput, ReferenceInput, BooleanInput } from "react-admin"


export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm >
          <TextInput source="text"  label="text" />
          <BooleanInput source="correct" label='correct option'/>
          <ReferenceInput
              source="challengeId"
              reference="challenges"
            />
            <TextInput source="imageSrc" label='image Url' />
            <TextInput source="audioSrc" label='audio Url' />
      </SimpleForm>
  </Edit>
  )
}
