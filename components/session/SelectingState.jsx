/**
 * What users see when the state is in the "dasher" state
 */

import { Title, Text, Card, Group, Button } from "@mantine/core";
import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";
import { getWordDefinition } from "../../lib/vocab";
import { updateRoundState, updateWord } from "../../lib/firebase";
import { ROUND_STATES } from "../../lib/constants";

const paddingSides = "20px";
const cardStyle = {
  maxWidth: "350px",
  marginLeft: "auto",
  marginRight: "auto",
};

function DasherCaption() {
  return (
    <Text
      mr="auto"
      ml="auto"
      style={{
        paddingLeft: paddingSides,
        paddingRight: paddingSides,
        maxWidth: "350px",
      }}
    >
      Pick a prompt whose answer you think your friends will have a hard time guessing,
      that is not so unlike what they may write that it stands out.
      Everyone can see the prompt, but only you can see the true answer and only
      you can either confirm it or pick a different prompt. Remember: if no one
      guesses the correct answer (either by voting or writing it), then you,
      the dasher will score points!
    </Text>
  );
}

function GuesserCaption() {
  return (
    <Text
      mr="auto"
      ml="auto"
      style={{
        paddingLeft: paddingSides,
        paddingRight: paddingSides,
        maxWidth: "350px",
      }}
    >
      The dasher is picking a prompt. Only the dasher can see the real answer.
    </Text>
  );
}

function DasherControls({ sessionId, roundNumber }) {
  return (
    <Group position="center" spacing="md" grow align="center" style={cardStyle}>
      <Button
        variant="outline"
        color="red"
        onClick={() => updateWord(sessionId, roundNumber)}
      >
        New Word
      </Button>
      <Button
        variant="filled"
        color="red"
        onClick={() =>
          updateRoundState(sessionId, roundNumber, ROUND_STATES.GUESSING)
        }
      >
        Confirm prompt
      </Button>
    </Group>
  );
}

function GuesserWaitScreen() {
  return (
    <Text size="xs" italic>
      Waiting for the dasher to either confirm or reject the prompt...
    </Text>
  );
}

export default function SelectingState({
  sessionId,
  dasher,
  word,
  roundNumber,
}) {
  const isDasher = cookieCutter.get("username") === dasher;
  const [definition, setDefinition] = useState("");
  useEffect(() => {
    getWordDefinition(word)
      .then(setDefinition)
      .catch((error) =>
        console.log(`Error retrieving definition for word ${word}: ${error}`)
      );
  }, [word]);
  return (
    <>
      <Title size="h2">Prompt Selection</Title>
      {isDasher ? <DasherCaption /> : <GuesserCaption />}
      <br />
      <Card shadow="lg" radius="md" withBorder style={cardStyle} mb="md">
        <Title size="h3" color="dimmed" mb="md">
          Prompt
        </Title>
        <Title size="h4" color="red.5" weight={800} transform="uppercase">
          {word}
        </Title>
        {isDasher && (
          <Title size="h4" italic>
            {definition.charAt(0).toUpperCase() + definition.slice(1)}
          </Title>
        )}
      </Card>
      {isDasher ? (
        <DasherControls sessionId={sessionId} roundNumber={roundNumber} />
      ) : (
        <GuesserWaitScreen />
      )}
    </>
  );
}
