import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://loremflickr.com/140/140",
};

export default function App() {
  const [messages, setMessages] = useState([]);
  const [questionBank, setQBank] = useState({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, welcome to simple trivia! Say 'Ready' when you're ready to play!",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
    fetch5Questions();
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

  function scramble(array) {
    var i = array.length;
    if (i == 0) return false;
    while (--i) {
      var j = Math.floor(Math.random() * (i + 1));
      var tempi = array[i];
      var tempj = array[j];
      array[i] = tempj;
      array[j] = tempi;
    }
  }

  function fetch5Questions() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const firstQuestion = {
      correctAnswer: "ready",
    };

    fetch(
      "https://the-trivia-api.com/v2/questions?limit=10&categories=general_knowledge&difficulties=easy",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        result.unshift(firstQuestion);
        setQBank(result);
      })
      .catch((error) => console.log("error", error));
  }

  const respondToUser = (userMessages) => {
    console.log("User message text:", userMessages[0].text);

    if (index < 10) {
      if (
        userMessages[0].text.toLowerCase() ==
        questionBank[index].correctAnswer.toLowerCase()
      ) {
        addBotMessage("Congrats! You got it right!!");
        const answers = [
          questionBank[index + 1].correctAnswer,
          questionBank[index + 1].incorrectAnswers[0],
          questionBank[index + 1].incorrectAnswers[1],
          questionBank[index + 1].incorrectAnswers[2],
        ];
        scramble(answers);
        question =
          questionBank[index + 1].question.text +
          "\n" +
          answers[0] +
          "\n" +
          answers[1] +
          "\n" +
          answers[2] +
          "\n" +
          answers[3];
        addBotMessage(question);
        setIndex(index + 1);
      } else {
        addBotMessage("Wrong answer.. try again!");
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
