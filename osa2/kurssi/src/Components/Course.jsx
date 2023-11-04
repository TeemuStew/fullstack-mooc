const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}


const Content = ({ content }) => {
    let sumOfExercises = content.reduce((a, b) => a = a + b.exercises, 0)
    return (
        <div>
            {content.map(part =>
                <Part key={part.id} part={part} />
            )}
            <strong>total of {sumOfExercises} exercises</strong>
        </div>
    )
}


const Header = ({ header }) => {
    return (
        <div>
            <h2>{header}</h2>
        </div>
    )
}


const Course = ({ course }) => {
    return (
        <div>
            <Header header={course.name} />
            <Content key={course.id} content={course.parts} />
        </div>
    )
}


export default Course