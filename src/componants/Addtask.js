// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { addTask} from '../redux/authSlice';
// import axios from 'axios';
// import { editData,deleteData } from '../redux/authSlice';
// const Addtask = () => {

//   const [tasks,setTask] = useState("");
//   const [datas,setData] = useState([]);
//   const [edit,setEdit] = useState(true);
//   const dispatch = useDispatch();

  
//   useEffect(()=>{
//     axios.get("http://localhost:5000/gettasks").then((res)=>{
//       console.log(res);
//       setData(res.data.data)
//     }).catch((err)=>{
//       alert("no data found")
//     })
//   })

//   const handleTask=async (e)=>{
//     e.preventDefault();
//     try {
//       const res = await dispatch(addTask({ tasks }));
//       if(res.payload.status == 400){
//         alert("Email already exist");
//       }else{
//         alert("Successfully task created");
//         setTask("")
//       }
//     } catch (err) {
//       alert("there was an error");
//     }


//     // const handleEdit = async (id) => {
//     //   try {
//     //     const response = await axios.put(`http://localhost:5000/updatetask/${id}`, {
//     //        // Replace with updated data
//     //     });
//     //     dispatch(editData({ id, newData: response.data }));
//     //   } catch (error) {
//     //     console.error('Error editing data:', error);
//     //   }
//     // };
  
//     const handleDelete = async (id) => {
//       try {
//         await axios.delete(`http://localhost:5000/delete/${id}`);
//         dispatch(deleteData(id));
//       } catch (error) {
//         console.error('Error deleting data:', error);
//       }

//     }

//   }
//   return (
//     <div>
//     <input type='text' onChange={(e)=>setTask(e.target.value)} value={tasks} placeholder='Add task'></input>
//     <button type="submit" onClick={handleTask}>Add task</button>
//     <div>
//     <table>
//     {datas.map((task)=>(
//       <tr>
//         {edit
//         ?
//         <><td key={task.id}>{task.tasks}</td>
//         {/* <button onClick={() => {handleEdit(tasks.id);setEdit(false)}}>Edit</button> */}
//         <button onClick={()=>handleDelete(task._id)}>Delete</button>
//         </>
        
//         :
//         <>
//         <input type='text' value={task.tasks} ></input>
//         <button onClick={()=>setEdit(true)}>save</button>
//         </>
//         }
//       </tr>
      
         
//       )
//     )}
//     </table>
//     </div>
//     {/* {gettasks.map=((tasks)=>(
//       <li key={tasks._id}>{tasks._id}</li>
//     ))} */}
//     </div>
//   )
// }

// export default Addtask


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addTask, editData, deleteData } from '../redux/authSlice';
// import axios from 'axios';

// const Addtask = () => {
//   const [tasks, setTask] = useState('');
//   const [datas, setData] = useState([]);
//   const [edit, setEdit] = useState(true);
//   const [editInput,setEditInput] = useState(tasks)
//   const dispatch = useDispatch();

//   useEffect(() => {
//     axios.get('http://localhost:5000/gettasks')
//       .then((res) => {
//         setData(res.data.data);
//       })
//       .catch((err) => {
//         alert('No data found');
//       });
//   }, []); // Added empty dependency array to run effect only once

//   const handleTask = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await dispatch(addTask({ tasks }));
//       if (res.payload.status === 400) {
//         alert('Email already exists');
//       } else {
//         alert('Task created successfully');
//         setTask('');
  
//         // Fetch and update the tasks after adding a new task
//         const response = await axios.get("http://localhost:5000/gettasks");
//         setData(response.data.data);
//       }
//     } catch (err) {
//       alert('There was an error');
//     }
//   };

//   const handleEdit = async (id, updatedTask) => {
//     try {
//       await axios.put(`http://localhost:5000/updatetask/${id}`, {
//         tasks: updatedTask, // Assuming the updated task value should be sent
//       });
//       dispatch(editData({ id, newData: updatedTask }));
//       setEdit(false); // Set edit mode to false after updating
//     } catch (error) {
//       console.error('Error editing data:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/delete/${id}`);
//       dispatch(deleteData(id));
//       setData(datas.filter(task => task._id !== id));
//     } catch (error) {
//       console.error('Error deleting data:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="text" onChange={(e) => setTask(e.target.value)} value={tasks} placeholder="Add task" />
//       <button type="submit" onClick={handleTask}>Add task</button>
//       <div>
//         <table>
//           {datas.map((task) => (
//             <tr key={task._id}>
//               {edit ? (
//                 <>
//                   <td>{task.tasks}</td>
//                   <button onClick={() => setEdit(false)}>Edit</button>
//                   <button onClick={() => handleDelete(task._id)}>Delete</button>
//                 </>
//               ) : (
//                 <>
//                   <input type="text" value={task.tasks} onChange={(e) => setTask(e.target.value)} />
//                   <button onClick={() => {handleEdit(task._id, tasks)}}>Save</button>
//                 </>
//               )}
//             </tr>
//           ))}
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Addtask;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editData, deleteData } from '../redux/authSlice';
import axios from 'axios';

const Addtask = () => {
  const [tasks, setTask] = useState('');
  const [datas, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:5000/gettasks')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        alert('No data found');
      });
  }, []);

  const handleTask = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(addTask({ tasks }));
      if (res.payload.status === 400) {
        alert('Email already exists');
      } else {
        alert('Task created successfully');
        setTask('');
        fetchTasks(); // Fetch tasks after adding a new one
      }
    } catch (err) {
      alert('There was an error');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/gettasks');
      setData(response.data.data);
    } catch (error) {
      alert('Error fetching tasks');
    }
  };

  const handleEdit = async (id, updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/updatetask/${id}`, {
        tasks: updatedTask,
      });
      dispatch(editData({ id, newData: updatedTask }));
      setEditId(null); // Reset edit ID after editing
      fetchTasks(); // Fetch tasks after editing
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      dispatch(deleteData(id));
      fetchTasks(); // Fetch tasks after deleting
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <input type="text" onChange={(e) => setTask(e.target.value)} value={tasks} placeholder="Add task" />
      <button type="submit" onClick={handleTask}>Add task</button>
      <div>
        <table>
          {datas.map((task) => (
            <tr key={task._id}>
              {editId === task._id ? (
                <>
                  <td><input type="text" value={tasks} onChange={(e) => setTask(e.target.value)} /></td>
                  <button onClick={() => handleEdit(task._id, tasks)}>Save</button>
                </>
              ) : (
                <>
                  <td>{task.tasks}</td>
                  <button onClick={() => setEditId(task._id)}>Edit</button>
                  <button onClick={() => handleDelete(task._id)}>Delete</button>
                </>
              )}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Addtask;

