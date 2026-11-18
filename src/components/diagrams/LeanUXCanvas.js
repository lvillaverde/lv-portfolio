import React from "react";

// Me Sirve Lean UX Canvas, rebuilt from the workshop board.
// `area` places each box on the desktop grid; on mobile boxes stack in numeric order.
const BOXES = [
  {
    n: 1,
    area: "problem",
    title: "Business Problem",
    prompt: "What business have you identified that needs help?",
    notes: ["Finding offers", "Offers visibility", "Offers location"],
  },
  {
    n: 2,
    area: "outcomes",
    title: "Business Outcomes",
    prompt: "What changes in customer behavior will indicate you have solved a real problem in a way that adds value to your customers?",
    notes: ["Discover an offer in the map", "Save an offer in favs", "Publish offers in the app", "Recommend an offer to a friend", "Set an offer alarm"],
  },
  {
    n: 3,
    area: "users",
    title: "Users and Customers",
    prompt: "What types of users and customers should you focus on first?",
    notes: ["25–65 year old buyers", "Small and medium commerce managers and owners"],
  },
  {
    n: 4,
    area: "benefits",
    title: "User Benefits",
    prompt: "What are the goals your users are trying to achieve? What is motivating them to seek out your solution?",
    notes: ["Save money", "Save time", "Have more sales", "Discover new shops", "Liquidate stock", "Improve shop visibility"],
  },
  {
    n: 5,
    area: "solutions",
    title: "Solution Ideas",
    prompt: "List product features or enhancement ideas that help your target audience achieve the benefits.",
    notes: [
      "A map with shops and offers",
      "A home page with offers categorized by topic",
      "An app for shop managers to upload offers",
      "Save offers in favs, with an alert when they're about to end",
      "Share offers",
    ],
  },
  {
    n: 6,
    area: "hypotheses",
    title: "Hypotheses",
    prompt: "We believe that [outcome] will be achieved if [user] attains [benefit] with [feature].",
    small: true,
    notes: [
      "We believe that saving offers in favs will be achieved if a 35 year old employee attains saving money with a map with offers.",
      "We believe that discovering offers will be achieved if a 45 year old housewife attains saving money with a home page with offers.",
      "We believe that having more sales will be achieved if a shop manager attains uploading offers with an exclusive app.",
      "We believe that discovering new shops will be achieved if a 25 year old employee attains an offer shared by a friend with a sharing feature.",
      "We believe that liquidating stock will be achieved if a shop manager attains uploading last-minute offers with an exclusive app.",
      "We believe that improving shop visibility will be achieved if a shop manager attains uploading several offers with an exclusive app.",
    ],
  },
  {
    n: 7,
    area: "learn",
    title: "What is the most important thing we have to learn first?",
    prompt: "For each hypothesis, identify the riskiest assumption: the one that will cause the entire idea to fail if it's wrong.",
    small: true,
    notes: [
      "That people search for offers in the app and don't forget about it.",
      "That shop managers don't forget, and are motivated, to upload offers.",
      "That people will have enough shops to browse and discover.",
    ],
  },
  {
    n: 8,
    area: "experiments",
    title: "What's the least amount of work we need to do to learn the next most important thing?",
    prompt: "Brainstorm the types of experiments you can run to learn whether your riskiest assumption is true or false.",
    small: true,
    notes: [
      "Interview shop owners and managers.",
      "Interview people in our social circle about their shopping habits.",
      "Make an MVP.",
      "Downloads %",
      "Comments in Play Store",
    ],
  },
];

function LeanUXCanvas() {
  return (
    <div className="lean-canvas">
      {BOXES.map((box) => (
        <section key={box.n} className={`lean-canvas-box area-${box.area}`} aria-labelledby={`lean-box-${box.n}`}>
          <h3 id={`lean-box-${box.n}`}>
            <em>{box.n}</em>
            {box.title}
          </h3>
          <p className="lean-canvas-prompt">{box.prompt}</p>
          <ul className={`lean-canvas-notes${box.small ? " is-small" : ""}`}>
            {box.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default LeanUXCanvas;
