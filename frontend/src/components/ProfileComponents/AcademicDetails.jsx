// import React, { useEffect, useState } from "react";
// import {
//   useCreateAcademicDetailMutation,
//   useGetAcademicDetailQuery,
// } from "../../redux/Api/academicApiSlice";

// const AcademicDetails = () => {
//   const [degree, setDegree] = useState("");
//   const [department, setDepartment] = useState("");
//   const [year_of_graduation, setYearofGraduation] = useState("");
//   const [cgpa, setCgpa] = useState(0);

//   // fetching the information of academic.....
//   const { data, isLoading, refetch } = useGetAcademicDetailQuery();
//   // if not found academic detail then create academic details......
//   const [createAcademicDetail, { isLoading: isCreating, isSuccess }] = useCreateAcademicDetailMutation();

//   // on submit button...
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // creating the academic information...
//       const res = await createAcademicDetail({ degree, department, year_of_graduation, cgpa });
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // refresh the data when we land on this page....
//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   // Clear form fields after successful submission......
//   useEffect(() => {
//     if (isSuccess) {
//       setDegree("");
//       setDepartment("");
//       setYearofGraduation("");
//       setCgpa(0);
//       refetch(); // Refetch data to show the updated academic details.....
//     }
//   }, [isSuccess, refetch]);

//   if (!data && isLoading) {
//     return <div>Loading academic details...</div>;
//   }

  

//   return (
//     <div className="bg-gray-700 p-4 rounded-lg">
//       <h3 className="text-lg font-semibold mb-3">Academic Details</h3>

//       {!data ? (
//         <form className="space-y-2" onSubmit={handleSubmit}>
//           <div className="flex">
//             <label htmlFor="degree"><strong>Degree: </strong></label>
//             <input
//               type="text"
//               id="degree"
//               name="degree"
//               className="mx-3 border-b border-t-0 border-x-0 border-gray-300 rounded-md"
//               value={degree}
//               onChange={(e) => setDegree(e.target.value)}
//             />
//           </div>

//           <div className="flex">
//             <label htmlFor="department"><strong>Department: </strong></label>
//             <input
//               type="text"
//               id="department"
//               name="department"
//               className="mx-3 border-b border-t-0 border-x-0 border-gray-300 rounded-md"
//               value={department}
//               onChange={(e) => setDepartment(e.target.value)}
//             />
//           </div>

//           <div className="flex">
//             <label htmlFor="year_of_graduation"><strong>Year Of Graduation: </strong></label>
//             <input
//               type="text"
//               id="year_of_graduation"
//               name="year_of_graduation"
//               className="mx-3 border-b border-t-0 border-x-0 border-gray-300 rounded-md"
//               value={year_of_graduation}
//               onChange={(e) => setYearofGraduation(e.target.value)}
//             />
//           </div>

//           <div className="flex">
//             <label htmlFor="cgpa"><strong>CGPA: </strong></label>
//             <input
//               type="text"
//               id="cgpa"
//               name="cgpa"
//               value={cgpa ? cgpa :""}
//               className="mx-3 border-b border-t-0 border-x-0 border-gray-300 rounded-md"
//               onChange={(e) => setCgpa(e.target.value)}
//             />
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-blue-700 rounded-2xl w-full px-4 cursor-pointer shadow shadow-blue-300"
//               disabled={isCreating}
//             >
//               {isCreating ? "Adding..." : "Add"}
//             </button>
//           </div>
//         </form>
//       ) : (
//         <ul className="space-y-2">
//           <li><strong>Degree: </strong> {data?.degree}</li>
//           <li><strong>Department: </strong> {data?.department}</li>
//           <li><strong>Year Of Graduation: </strong> {data?.year_of_graduation}</li>
//           <li><strong>CGPA: </strong> {data?.cgpa}</li>

//           <li className="flex">
//             <strong>Achievements: </strong>
//             <div className="w-3/5 mx-3 max-w-xl overflow-x-auto whitespace-nowrap rounded-lg scrollbar-hide">
//               {data.achievements?.map((ach, index) => (
//                 <span key={index} className="mr-2">{ach?.title}</span>
//               ))}
//             </div>
//             <button className="bg-blue-800 rounded-md px-1 shadow shadow-blue-500 cursor-pointer">Add</button>
//           </li>

//           <li>
//             <strong>Extracurriculars: </strong>
//             <div className="w-3/5 mx-3 max-w-xl overflow-x-auto whitespace-nowrap rounded-lg scrollbar-hide">
//               {data.extracurriculars?.map((activity, index) => (
//                 <span key={index} className="mr-2">{activity}</span>
//               ))}
//             </div>
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AcademicDetails;