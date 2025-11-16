class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    def call(self, other_phone):
        call_str = f"{self.phone_number} called {other_phone.phone_number}"
        print(call_str)
        self.call_history.append(call_str)

    def show_call_history(self):
        if not self.call_history:
            print("No call history.")
        else:
            for record in self.call_history:
                print(record)

    def send_message(self, other_phone, content):
        message = {
            'to': other_phone.phone_number,
            'from': self.phone_number,
            'content': content
        }
        self.messages.append(message)
        print(f"Message sent from {self.phone_number} to {other_phone.phone_number}")

    def show_outgoing_messages(self):
        outgoing = [msg for msg in self.messages if msg['from'] == self.phone_number]
        if not outgoing:
            print("No outgoing messages.")
        else:
            for msg in outgoing:
                print(f"To: {msg['to']}, Content: {msg['content']}")

    def show_incoming_messages(self):
        incoming = [msg for msg in self.messages if msg['to'] == self.phone_number]
        if not incoming:
            print("No incoming messages.")
        else:
            for msg in incoming:
                print(f"From: {msg['from']}, Content: {msg['content']}")

    def show_messages_from(self, from_number):
        filtered = [msg for msg in self.messages if msg['from'] == from_number]
        if not filtered:
            print(f"No messages from {from_number}.")
        else:
            for msg in filtered:
                print(f"From: {msg['from']}, To: {msg['to']}, Content: {msg['content']}")


# Test the Phone class
phone1 = Phone("123-456-7890")
phone2 = Phone("098-765-4321")

# Test calling
phone1.call(phone2)
phone2.call(phone1)

# Show call history
print("\nPhone1 Call History:")
phone1.show_call_history()

print("\nPhone2 Call History:")
phone2.show_call_history()

# Test sending messages
phone1.send_message(phone2, "Hello!")
phone2.send_message(phone1, "Hi there!")

# Show outgoing and incoming messages for phone1
print("\nPhone1 Outgoing Messages:")
phone1.show_outgoing_messages()

print("\nPhone1 Incoming Messages:")
phone1.show_incoming_messages()

# Show messages from phone2 on phone1
print("\nPhone1 Messages From 098-765-4321:")
phone1.show_messages_from("098-765-4321")
