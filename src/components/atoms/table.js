// import React from "react"   

// // Example of a data array that
// // you might receive from an API
// const data = [
// { name: "Anom", age: 19, gender: "Male" },
// { name: "Megha", age: 19, gender: "Female" },
// { name: "Subham", age: 25, gender: "Male"},
// ]

// function App() {
// return (
// 	<div className="App" style={{ width: "100%",
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"}}>
// 	<table style={{  border: "2px solid forestgreen",
//   width: "800px",
//   height: "200px"}}>
// 		<tr>
    
// 		<th>Name</th>
// 		<th>Age</th>
// 		<th>Gender</th>
// 		</tr>
// 		{data.map((val, key) => {
// 		return (
// 			<tr key={key}>
// 			<td>{val.name}</td>
// 			<td>{val.age}</td>
// 			<td>{val.gender}</td>
// 			</tr>
// 		)
// 		})}
// 	</table>
// 	</div>
// );
// }

// export default App;

  


import React from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Table = () => {
return (
	<Container maxWidth="sm">
	<Typography component="div" style={{
		backgroundColor: 'Orange', height: '100vh'
	}}>
		Greetings from GeeksforGeeks
	</Typography>
	</Container>
);
}

export default Table
