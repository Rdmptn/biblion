import {api_url, api_register} from "../constants"
import { Redirect } from 'react-router';
import axios from "axios"
import React, { useEffect, useState } from "react";


export default function Register() {
  const [isRegistered, setIsRegistered] = useState();
  const [user, setUser] = useState({});
  // localStorage.setItem("user", "popopopopop343434343434");
  const handleSubmit = function(event) {
    console.log("user", user);
    event.preventDefault();
    axios.post(`${api_url}${api_register}`, user)
    .then((response) => {
      console.log("response.data___+++:::", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      if (response.status === 200) {
        
      setIsRegistered(true);
      // window.location.reload();
      window.history.back();
    }
  })
    .catch(error => console.log(error))
  }

  const handleChangeName = function(event) {
    // console.log(event.target.value);
    let name = event.target.value;
    setUser((prev) => ({
      ...prev,
      name
    }))
  }
  
  const handleChangeEmail = function(event) {
    // console.log(event.target.value);
    let email = event.target.value;
    setUser((prev) => ({
      ...prev,
      email
    }))
  }

  const handleChangePassword = function(event) {
    // console.log(event.target.value);
    let password = event.target.value;
    setUser((prev) => ({
      ...prev,
      password
    }))
  }
  return (
        <form  onSubmit={(event) => handleSubmit(event)}>
          <label>
            Name:
            <input type="text" name="name" onChange={handleChangeName}/>
          </label>
          <label>
            email:
            <input type="email" name="email" onChange={handleChangeEmail}/>
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={handleChangePassword}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
  )
}




// export default function Register() {
//   const [name, setName] = useState(props.name || "");
//   const [interviewer, setInterviewer] = useState(props.interviewer || null);
//   const [error, setError] = useState("");

//   function reset() {
//     setName("")
//     setInterviewer(null)
//   }
  
//   function cancel() {
//     reset()
//     props.onCancel();
//   }

//   function save() {
//     props.onSave(name, interviewer);
//   }

//   function validate() {
//     if (name === "") {
//       setError("Student name cannot be blank");
//       return;
//     }
  
//     setError("");
//     props.onSave(name, interviewer);
//   }

  
//   return (
//     <main className="appointment__card appointment__card--create">
//       <section className="appointment__card-left">

//         <form>
//           <label>
//             Name:
//             <input type="text" name="name" />
//           </label>
//           <label>
//             email:
//             <input type="email" name="email" />
//           </label>
//           <label>
//             Password:
//             <input type="password" name="password" />
//           </label>
//           <input type="submit" value="Submit" />
//         </form>

//         {/* <form onSubmit={event => event.preventDefault()} autoComplete="off">
//           <input
//             className="appointment__create-input text--semi-bold"
//             name={props.name}
//             type="text"
//             placeholder="Enter your Name"
//             // value={name}
//             // onChange={(event) => setName(event.target.value)}
//             // data-testid="student-name-input"
//           />
//         </form> */}
//         <section className="appointment__validation">{error}</section>
//         {/* <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer}/> */}
//       </section>
//       <section className="appointment__card-right">
//         <section className="appointment__actions">
//           {/* <Button onClick={cancel} danger>Cancel</Button>
//           <Button onClick={validate} confirm>Save</Button> */}
//         </section>
//       </section>
//     </main>
//   );
// }


// // function reset() {
// //   setName("")
// //   setInterviewer(null)
// // }

// // function cancel() {
// //   reset()
// //   props.onCancel
// // }

// // function save(name, interviewer) {
// //   transition(SAVING);
// //   const interview = {
// //     student: name,
// //     interviewer
// //   };

// //   axios.post
// //     .then(response => {transition(SHOW);})
// //     .catch(error => transition(ERROR_SAVE, true));

// // }