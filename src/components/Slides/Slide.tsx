import "./Slides.css"

interface SlideProps {
    title: string;
    content: string;
}

const Slide = ({ title, content }: SlideProps) => {


    const lines = content.split('\n');

    return (
        <div className="slide">
            <h2>{title}</h2>
            <ul>
                {lines.map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                ))}
            </ul>
        </div>
    );
};


export default Slide;