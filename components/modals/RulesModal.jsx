/**
 * Modal that displays the rules of the game
 */

import {Modal} from "@mantine/core";

export default function RulesModal(props) {
    return (
        <Modal
            opened={props.opened}
            onClose={() => props.setOpened(false)}
            title="Rules"
            fullScreen
        >
            <ul>
                <li>You need at least 4 people to play this game</li>
                <li>The game is played in rounds where one person is the dasher and the others are guessers</li>
                <li>The dasher selects and submits an obscure prompt which the others are either trying to guess or come up with a realistic answer for</li>
                <li>Once everyone submits their answers, the dasher reviews them and marks any that are correct while all the other definitions together with a single correct one are submitted for voting</li>
                <li>The guessers vote for the answer they think is the real one</li>
                <li>The scores are awarded in the end of each round: if no one guesses the correct answer, the dasher gets 2 points, players who correctly anwer get a point and players who come up with a false answer get a single point for each vote they receive</li>
                <li>The player with the highest score wins!</li>
            </ul>

        </Modal>
    )
}
