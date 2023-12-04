import React, { useState, useEffect } from "react";
import "./LoadingScreen.css";

const LoadingScreen: React.FC = () => {
    const [quotes] = useState<string[]>([
        "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
        "The only thing that interferes with my learning is my education. - Albert Einstein",
        "Education is the passport to the future, for tomorrow belongs to those who prepare for it today. - Malcolm X",
        "The function of education is to teach one to think intensively and to think critically. Intelligence plus character – that is the goal of true education. - Martin Luther King Jr.",
        "Educating the mind without educating the heart is no education at all. - Aristotle",
        "Live as if you were to die tomorrow. Learn as if you were to live forever. - Mahatma Gandhi",
        "An investment in knowledge pays the best interest. - Benjamin Franklin",
        "Change is the end result of all true learning. - Leo Buscaglia",
        "Education is not preparation for life; education is life itself. - John Dewey",
        "The beautiful thing about learning is that no one can take it away from you. - B.B. King",
        "Education is the kindling of a flame, not the filling of a vessel. - Socrates",
        "The roots of education are bitter, but the fruit is sweet. - Aristotle",
        "It is the mark of an educated mind to be able to entertain a thought without accepting it. - Aristotle",
        "The mind is not a vessel to be filled, but a fire to be kindled. - Plutarch",
        "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence. - Abigail Adams",
        "Education is what remains after one has forgotten what one has learned in school. - Albert Einstein",
        "Do not confine your children to your own learning, for they were born in another time. - Chinese Proverb",
        "Tell me and I forget. Teach me and I remember. Involve me and I learn. - Benjamin Franklin",
        "Education is a better safeguard of liberty than a standing army. - Edward Everett",
        "The goal of education is the advancement of knowledge and the dissemination of truth. - John F. Kennedy",
        "To educate a person in the mind but not in morals is to educate a menace to society. - Theodore Roosevelt",
        "Education is the movement from darkness to light. - Allan Bloom",
        "Education is all a matter of building bridges. - Ralph Ellison",
        "I have never let my schooling interfere with my education. - Mark Twain",
        "Education is the key to unlock the golden door of freedom. - George Washington Carver",
        "A child educated only at school is an uneducated child. - George Santayana",
        "The whole purpose of education is to turn mirrors into windows. - Sydney J. Harris",
        "Education is not the filling of a pail, but the lighting of a fire. - W.B. Yeats",
        "Learning is a treasure that will follow its owner everywhere. - Chinese Proverb",
        "You are always a student, never a master. You have to keep moving forward. - Conrad Hall",
        "Education is learning what you didn’t even know you didn’t know. - Daniel J. Boorstin",
        "A well-educated mind will always have more questions than answers. - Helen Keller",
        "The aim of education is the knowledge, not of facts, but of values. - William S. Burroughs",
        "The only person who is educated is the one who has learned how to learn and change. - Carl Rogers",
        "Education without values, as useful as it is, seems rather to make man a more clever devil. - C.S. Lewis",
        "One child, one teacher, one book, one pen can change the world. - Malala Yousafzai",
        "The foundation of every state is the education of its youth. - Diogenes",
        "Education is the art of making man ethical. - Georg Wilhelm Friedrich Hegel",
        "In learning you will teach, and in teaching you will learn. - Phil Collins",
        "They know enough who know how to learn. - Henry Adams",
        "Education's purpose is to replace an empty mind with an open one. - Malcolm S. Forbes",
        "Learning never exhausts the mind. - Leonardo da Vinci",
        "The educated differ from the uneducated as much as the living from the dead. - Aristotle",
        "Education is the key to unlocking the world, a passport to freedom. - Oprah Winfrey",
        "Education breeds confidence. Confidence breeds hope. Hope breeds peace. - Confucius",
        "Education is not only a ladder of opportunity, but it is also an investment in our future. - Ed Markey",
        "Nine tenths of education is encouragement. - Anatole France",
        "A person who won't read has no advantage over one who can't read. - Mark Twain",
        "Education is the most powerful tool which you can use to change the world. - Nelson Mandela",
        "The only true wisdom is in knowing you know nothing. - Socrates",
        "Anyone who stops learning is old, whether at twenty or eighty. Anyone who keeps learning stays young. - Henry Ford",
        "Education is a progressive discovery of our own ignorance. - Will Durant",
        "The object of education is to teach us to love what is beautiful. - Plato",
        "The aim of education should be to teach us rather how to think, than what to think. - James Beattie",
        "Education is the mother of leadership. - Wendell Willkie",
        "Learning is not compulsory... neither is survival. - W. Edwards Deming",
        "You can never be overdressed or overeducated. - Oscar Wilde",
        "The beautiful thing about learning is nobody can take it away from you. - B.B. King",
        "Education is a continual process, it's like a bicycle... If you don't pedal you don't go forward. - George Weah",
        "A good education is a foundation for a better future. - Elizabeth Warren",
        "He who opens a school door, closes a prison. - Victor Hugo",
        "Education is the best friend. An educated person is respected everywhere. Education beats the beauty and the youth. - Chanakya",
        "Education is simply the soul of a society as it passes from one generation to another. - G.K. Chesterton",
        "The whole world opened to me when I learned to read. - Mary McLeod Bethune",
        "Education is for improving the lives of others and for leaving your community and world better than you found it. - Marian Wright Edelman",
        "The aim of education is not knowledge but action. - Herbert Spencer",
        "The future of the world is in my classroom today. - Ivan Welton Fitzwater",
        "Education is the transmission of civilization. - Will Durant",
        "What sculpture is to a block of marble, education is to the human soul. - Joseph Addison",
        "Education is the key that unlocks the golden door to freedom. - George Washington Carver",
        "Much education today is monumentally ineffective. All too often we are giving young people cut flowers when we should be teaching them to grow their own plants. - John W. Gardner",
        "The direction in which education starts a man will determine his future in life. - Plato",
        "Education is not a problem. Education is an opportunity. - Lyndon B. Johnson",
        "To define is to limit. One must never, for whatever reason, turn his back on life. - Oscar Wilde",
        "Education is the movement from darkness to light. - Allan Bloom",
        "The man who reads nothing at all is better educated than the man who reads nothing but newspapers. - Thomas Jefferson",
        "Education costs money. But then so does ignorance. - Sir Claus Moser",
        "Education is a better safeguard of liberty than a standing army. - Edward Everett",
        "To educate a man in mind and not in morals is to educate a menace to society. - Theodore Roosevelt",
        "Learning is not the product of teaching. Learning is the product of the activity of learners. - John Holt",
        "Education must not simply teach work - it must teach Life. - W.E.B. Du Bois",
        "A man's mind, stretched by new ideas, may never return to its original dimensions. - Oliver Wendell Holmes Jr.",
        "Education is the kindling of a flame, not the filling of a vessel. - Socrates",
        "Do not train a child to learn by force or harshness; but direct them to it by what amuses their minds, so that you may be better able to discover with accuracy the peculiar bent of the genius of each. - Plato",
        "Upon the subject of education... I can only say that I view it as the most important subject which we as a people may be engaged in. - Abraham Lincoln",
        "Education is a once in a lifetime opportunity to open children’s hearts and minds to the unbelievable wonder of the universe. - Sir Anthony Seldon",
        "Education is simply the soul of a society as it passes from one generation to another. - G.K. Chesterton"
    ]);
    const [currentQuote, setCurrentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
    const [className, setClassName] = useState("quote");

    useEffect(() => {
        const changeQuote = () => {
            setClassName("quote fadeOut"); // Apply fadeOut and shake
            setTimeout(() => {
                // Randomly select a new quote
                const randomIndex = Math.floor(Math.random() * quotes.length);
                setCurrentQuote(quotes[randomIndex]);
                setClassName("quote fadeIn"); // Apply fadeIn and shake
            }, 1000); // This should match the fade-out animation duration
        };

        changeQuote(); // Set the first quote
        const interval = setInterval(changeQuote, 6000); // Include fade-out time

        return () => clearInterval(interval);
    }, [quotes]);

    return (
        <>
            <div className="loading-screen-container">
                <h2 className={className}>{currentQuote}</h2>
                <div className="loading-bar"></div> {/* Loading bar container */}
            </div>
            <span className="loading-screen-footer">- We are working on generating your content please be patient :) -</span>
        </>
    );
};

export default LoadingScreen;
