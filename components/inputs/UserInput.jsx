import {TextInput} from "@mantine/core";

export default function CreateUsernameInput(props) {
    return (
        <TextInput
            mt="xl"
            id="create-session-username"
            label="Enter your name"
            placeholder="Name"
            {...props.form.getInputProps('username')}
        />
    )
}
