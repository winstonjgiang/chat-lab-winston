import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://loremflickr.com/140/140",
};

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, welcome to simple trivia! Say 'Ready' when you're ready to play!",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  const questionBank = {
    0: {
      question: "Please enter 'ready' if you'd like to begin",
      answer: "ready",
      correct: "Ok heres your first question:\n",
      wrong: "Please enter 'ready' if you'd like to begin. (wrong)",
    },
    1: {
      question:
        "What is the most abundant gas within our sun? Is it... \n 1. Helium \n 2. Hydrogen \n 3. Oxygen \n 4. Nitrogen \n Type the number of your answer!",
      answer: "1",
      correct: "Yay! Next Question",
      wrong: "Boohooo... try again",
    },
    2: {
      question:
        "Is Winston a dog or cat person? \n 1. Dog \n 2. Cat \n 3. Sea Turtle \n 4. Monkey",
      answer: "4",
      correct: "Yay! Next Question",
      wrong: "Boohooo... try again",
    },
    3: {
      question:
        "Is Phoenix a bird, a city, or the SEA coach? \n 1. Bird \n 2. City \n 3. Coach \n 4. Arizona",
      answer: "4",
      correct: "Yay! Next Question",
      wrong: "Boohooo... try again",
    },
    4: {
      question:
        "What is Winston's favorite color? \n 1. Black \n 2. White \n 3. Blue \n 4. Red",
      answer: "2",
      correct: "Yay! Next Question",
      wrong: "Boohooo... try again",
    },
    5: {
      question:
        "What is Jenna's middle name? \n 1. Kim \n 2. Emily \n 3. Julia \n 4. Cho",
      answer: "2",
      correct: "Yay! Final Question",
      wrong: "Boohooo... try again",
    },
    6: {
      question:
        "What is Winston's current favorite artist? \n 1. A Boogie wit a Hoodie \n 2. The Weeknd \n 3. Drake \n 4. Don Toliver",
      answer: "1",
      correct: "wow nice!",
      wrong: "Boohooo... try again",
    },
  };

  const [index, setIndex] = useState(0);
  var bool = false;

  const respondToUser = (userMessages) => {
    console.log("User message text:", userMessages[0].text);

    if (index < 7) {
      if (userMessages[0].text.toLowerCase() === questionBank[index].answer) {
        addBotMessage(questionBank[index].correct);
        addBotMessage(questionBank[index + 1].question);
        setIndex(index + 1);
      } else {
        addBotMessage(questionBank[index].wrong);
      }
    }
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
