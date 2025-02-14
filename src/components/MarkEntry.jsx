import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MarkEntry.css";
   
const MarkEntry = () => {
  const [marks, setMarks] = useState({
    subject1: "",
    subject2: "",
    subject3: "",
    subject4: "",
    subject5: "",
  });
  const navigate = useNavigate();
  const [markList, setMarkList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

 
  useEffect(() => {
    fetch("http://localhost:8000/marks")
      .then((res) => res.json())
      .then((data) => setMarkList(data))
      .catch((err) => console.error("Error fetching marks:", err));
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

 
  const handleChange = (field, value) => {
    setMarks({ ...marks, [field]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
     
      fetch(`http://localhost:8000/marks/${markList[editingIndex].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(marks),
      })
        .then((res) => {
          if (res.ok) {
            const updatedList = [...markList];
            updatedList[editingIndex] = { ...marks, id: markList[editingIndex].id };
            setMarkList(updatedList);
            setEditingIndex(null);
            setMarks({
              subject1: "",
              subject2: "",
              subject3: "",
              subject4: "",
              subject5: "",
            });
          }
        })
        .catch((err) => console.error("Error updating mark:", err));
    } else {
   
      fetch("http://localhost:8000/marks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(marks),
      })
        .then((res) => res.json())
        .then((newMark) => {
          setMarkList([...markList, newMark]);
          setMarks({
            subject1: "",
            subject2: "",
            subject3: "",
            subject4: "",
            subject5: "",
          });
        })
        .catch((err) => console.error("Error submitting marks:", err));
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/marks/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setMarkList(markList.filter((mark) => mark.id !== id));
        }
      })
      .catch((err) => console.error("Error deleting mark:", err));
  };

 
  const handleEdit = (index) => {
    setEditingIndex(index);
    setMarks(markList[index]);
  };

  return (
    <div className="container">
      <h3>Enter Marks for 5 Subjects</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Subject 1"
          value={marks.subject1}
          onChange={(e) => handleChange("subject1", e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Subject 2"
          value={marks.subject2}
          onChange={(e) => handleChange("subject2", e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Subject 3"
          value={marks.subject3}
          onChange={(e) => handleChange("subject3", e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Subject 4"
          value={marks.subject4}
          onChange={(e) => handleChange("subject4", e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Subject 5"
          value={marks.subject5}
          onChange={(e) => handleChange("subject5", e.target.value)}
          required
        />
        <button type="submit">{editingIndex !== null ? "Update" : "Submit"}</button>
      </form>

      <h3>Mark List</h3>
<table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
  <thead>
    <tr>
      <th>S.no</th>
      <th>Subject 1</th>
      <th>Subject 2</th>
      <th>Subject 3</th>
      <th>Subject 4</th>
      <th>Subject 5</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {markList.map((mark, index) => (
      <tr key={mark.id}>
        <td>{index + 1}</td>
        <td>{mark.subject1}</td>
        <td>{mark.subject2}</td>
        <td>{mark.subject3}</td>
        <td>{mark.subject4}</td>
        <td>{mark.subject5}</td>
        <td>
          <button onClick={() => handleEdit(index)}>Edit</button>
          <button onClick={() => handleDelete(mark.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default MarkEntry;
