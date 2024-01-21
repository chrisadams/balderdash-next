import Head from "next/head";
import { Text, Paper } from "@mantine/core";
import SessionModal from "../components/modals/SessionModal";
import SelectionButton from "../components/buttons/SelectionButton";
import { useState } from "react";

export default function Home() {
  const [createOpened, setCreateOpened] = useState(false);
  const [joinOpened, setJoinOpened] = useState(false);
  return (
    <div>
      <main>
        <div>
          <h2 style={{ fontWeight: "bold" }}>Balderdash • /ˈbɔːldədaʃ/</h2>
          <h4 style={{ fontStyle: "italic" }}>
            senseless talk or writing; nonsense
          </h4>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>Menu</h1>
          <SelectionButton
            content="New Game"
            onClick={() => setCreateOpened(true)}
          />
          <SelectionButton
            content="Join Game"
            onClick={() => setJoinOpened(true)}
          />
        </div>
        <br />
        <br />
        <Paper
          style={{
            padding: "10px 10px",
            maxWidth: "500px",
            margin: "auto auto",
          }}
          shadow="xxl"
          radius="lg"
          p="s"
          withBorder
        >
          <Text size="md">
            Balderdash is a bluffing game where you need to either guess the
            true answer to a prompt or come up with a convincing
            one.
          </Text>
        </Paper>
        <SessionModal
          title="Create New Round"
          join={false}
          opened={createOpened}
          setOpened={setCreateOpened}
        />
        <SessionModal
          title="Join Round"
          join={true}
          opened={joinOpened}
          setOpened={setJoinOpened}
        />
      </main>
    </div>
  );
}
