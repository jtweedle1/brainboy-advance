import { useState } from 'react';

export default function NewQuest() {
  const [topic, setTopic] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) return;

    console.log('Starting new adventure on topic:', topic);
  };

  return (
    <div>
      <h2>Begin a New Adventure</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="topic">What would you like to learn?</label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. React, biology, etc."
        />
        <button type="submit">Generate Adventure</button>
      </form>
    </div>
  );
}
