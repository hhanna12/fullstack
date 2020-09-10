import React from 'react'

const Course = ({courses}) => {
    return (
      <>
      <Header courses={courses} />
      </>
    )
  }
  
  const Header = (props) => {
    //Header huolehtii kurssin nimen renderöimisestä
    const { courses } = props
    return (
      <>
        <h1> Web development curriculum </h1>
        <Content courses={courses} />
      </>  
    )
  }
  
  
  const Content = (props) => {
  //Content osista ja niiden tehtävämääristä
  const { courses } = props
    return (
      <>
         {courses.map(variable => 
        <h2 key={variable.id}>
          {variable.name} 
          <Part courses={variable} />
          <Total courses={variable} />
        </h2>)}
      </>
    )
  
  }
  
  
  const Part = (props) => {
    const { courses } = props
    return (
      <>
        {courses.parts.map(variable2 => 
        <li key={variable2.id}>
          {variable2.name} {variable2.exercises} 
        </li>)}
      </>
  
    )
  }
  
  
  const Total = (props) => {
  //Total tehtävien yhteismäärästä
    const { courses } = props
    var totalAmount = courses.parts.reduce(function(sum, courses) {
      return sum + courses.exercises
    }, 0)
  
  
    return (
      <b>
        total of {totalAmount} exercises
      </b>
    )
  }
  
  export default Course