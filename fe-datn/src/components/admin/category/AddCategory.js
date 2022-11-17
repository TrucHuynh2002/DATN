import React from 'react'
import { Button, Form } from 'react-bootstrap';



//thêm danh mục 
// var CourseApi = 'http://127.0.0.1:8000/api/category/create'; 
// function start(){
// handleCreateForm();

// };
// start();


// function handleCreateForm(){
//   var createCategory = document.querySelector('#create');
//   createCategory.onclick = function() {
//     var name_category = document.querySelector('#name_category').value;
    
//     var data = {
//         name_category: name_category
//     };
//     var options =
//     {
//         method:"POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: data
//     }
//     fetch(CourseApi,options)
//     .then(function(response){ return response.data})
//     .then(function(data){ return console.log(data)})
//   }
// }


function AddCategory() {
  return (
    <div className="content">
        <div className="add-post">
            <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Thêm danh mục </h1>
              <Form>
                  <Form.Group className="mb-3" controlId="name_category">
                      <Form.Label>Tên danh mục</Form.Label>
                      <Form.Control type="text" name="name_category" className=''/>
                  </Form.Group>
                  <div className="d-grid gap-2">
                      <Button variant="primary" size="sm" name='' type="submit">
                          Thêm danh mục
                      </Button>
                  </div>
              </Form>     
        </div>
    </div>
  )
}

export default AddCategory