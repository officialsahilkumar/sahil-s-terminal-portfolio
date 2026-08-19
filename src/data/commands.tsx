import type { Command } from "../types";

// Help output is generated from the command registry passed in, so there is
// no separate command list to maintain.
export const renderHelp = (
  commands: Record<string, Command>
): JSX.Element => {
  return (
    <div>
      <br />
      <h3>=== Terminal Help ===</h3>
      <br />
      <p>Terminal Features</p>
      <br />
      <ul>
        <li>1. AI Agent:</li>
        <ul>
          <pre>   - Type 'ask &lt;question&gt;' to ask the AI agent about Sahil, e.g. ask what is his AI experience.</pre>
        </ul>
        <br />
        <li>2. Command History:</li>
        <ul>
          <pre>   - Use the up and down arrow keys to navigate through previous commands.</pre>
        </ul>
        <br />
        <li>3. Clear Screen:</li>
        <ul>
          <pre>   - Type 'clear' to clear the terminal screen.</pre>
        </ul>
        <br />
        <li>4. Help:</li>
        <ul>
          <pre>   - Type 'help' to display this help section.</pre>
        </ul>
      </ul>
      <br />
      <br />
      <p>Available Commands:</p>
      <br />
      <ul>
        {Object.entries(commands).map(([name, command]) => (
          <pre key={name}>
            - {name} ~ {command.description}
          </pre>
        ))}
      </ul>
      <br />
      <p>Enjoy exploring the terminal!</p>
      <br />
    </div>
  );
};
