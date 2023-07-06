const Header = ({name}) => {
    return <h1>{name}</h1>
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>{name} {exercises}</p>
    )
  }
  
  const Content = ({parts}) => {
    //parts.map(part => sum += part.exercises)
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
        <p>Total of {total} exercises</p>
      </div>
    )
  }
  
  const Courses = ({courses}) => {
    return(
      <div>
        {courses.map(course => { 
          return(
            <div key={course.id}>
              <Header name={course.name}/>
              <Content parts={course.parts}/>
            </div>
          )
        } )}
      </div>
    )
  }

export default Courses