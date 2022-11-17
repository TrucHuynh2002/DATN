import React from 'react'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


// lấy danh mục từ api
var ListCoursesBlock = document.querySelector('.list-cate');
 var CourseApi = 'http://127.0.0.1:8000/api/category/show'; 
 function  start(){
 getCourses(function(Courses){
  console.log(Courses);
 });
 };
 start();
 function getCourses(callback){
  fetch(CourseApi)
  .then(function(response){
    return response.json();
  })
  .then(callback);
 }

function ListCategory() {
  return (
    <div className="content">
            <div className="add-post">
              <h1 style={{ textAlign: "center", padding: "5px", color: "#0d3380" }}>Danh sách danh mục</h1>
              <Link to="add_category" className="btn btn-primary form-add">Thêm danh mục</Link>
              <Table bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>1</th>
                    <th>2</th>
                    <th></th>
                </tr>
                </thead>
                <tbody class="list-cate">
                    <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>
                        <Link to="edit_category">
                        <Button variant="outline-primary" name='' className="bx bxs-edit btn-edit"></Button>
                        </Link>
                        <Link to="#">
                        <Button variant="outline-danger" name='' className="bx bxs-trash"></Button>
                        </Link>
                    </td>
                    </tr>
                </tbody>
              </Table>
            </div>
    </div>
  )
}

export default ListCategory