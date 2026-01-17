interface GreetingProps {
  name: string;
  messageCount: number;
}

const Greeting = ({ name, messageCount }: GreetingProps) => {
  return (
    <div className="card">
      <h2>Exercise 2: Greeting Component</h2>
      <p>Hello, {name}!</p>
      <p>You have {messageCount} new messages.</p>
    </div>
  );
};

export default Greeting;
