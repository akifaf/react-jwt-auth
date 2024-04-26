// // EditForm.js
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateUser } from "../redux/AuthSlice";


// function EditForm({ userData }) {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState(userData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUser(formData)); // Assuming updateUser action is implemented in userActions
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label className="form-label">First Name</label>
//         <input
//           type="text"
//           className="form-control"
//           name="first_name"
//           value={formData.first_name}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Last Name</label>
//         <input
//           type="text"
//           className="form-control"
//           name="last_name"
//           value={formData.last_name}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Email</label>
//         <input
//           type="email"
//           className="form-control"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit" className="btn btn-primary">Save</button>
//     </form>
//   );
// }

// export default EditForm;



<div class="modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>