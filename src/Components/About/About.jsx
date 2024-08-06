import React from "react";
import Footer from "../Footer/Footer";

export default function About() {
  return (
    <>
    <div className="p-20 mt-16 bg-gray-900 h-110">
      <div className="text-4xl font-medium text-white underline w-80 decoration-orange-600 underline-offset-8">
        About TODOIST
      </div>
      <br></br>
      <p className="mr-40 text-white">
        A Todo Website is an essential tool for individuals and teams looking to
        boost their productivity and stay organized. By providing a dedicated
        space for task management, these websites help users clarify their
        priorities, focus on what needs to be done, and make steady progress
        towards their goals. One of the key benefits of using a Todo Website is
        its ability to help users break down large tasks into smaller,
        manageable chunks. This approach makes it easier to tackle complex
        projects, avoid feeling overwhelmed, and celebrate small wins along the
        way. Additionally, Todo Websites often include features like due dates,
        reminders, and notifications, ensuring that users stay on track and meet
        their deadlines.
        <br></br>
        <br></br>
        Todo Websites also facilitate collaboration and teamwork, allowing
        multiple users to share and work on the same task list. This feature is
        particularly useful for remote teams, freelancers, and businesses with
        multiple stakeholders. By providing a shared platform for task
        management, Todo Websites promote transparency, accountability, and open
        communication among team members. In addition to their core features,
        many Todo Websites offer advanced functionalities like tagging,
        prioritization, and data export. These features enable users to
        customize their task management system, tailor it to their specific
        needs, and integrate it with other tools and applications. Whether
        you're a student, entrepreneur, or busy professional, a Todo Website can
        help you streamline your workflow, reduce stress, and achieve your
        goals.
      </p>
    </div>
    <Footer/>
    </>
  );
}
