import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import Pagination from '../../user/Pagination';

function ListCategory() {

  const id_category = useParams();

  // phan trang
  const [listCategory, setListCategory] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(5);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listCategory.slice(firstPageIndex, lastPageIndex);
 
  useEffect(() => {
    getData();
  },[]);

  // danh sach category
  const getData = async () => {
   const res = await axios.get('http://127.0.0.1:8000/api/category/show');
      setListCategory(res.data.data);
  };

  // xoa category
  const deleteCategory = async (id_category) => {
    await axios.delete(`http://127.0.0.1:8000/api/category/delete/${id_category}`);
    getData();
  };

  return (
    <div className="content">
            <div className="add-post">
              <h1 className="content_h1_admin">Danh sách danh mục</h1>
              <Link to="../add_category" className="btn btn-primary form-add">Thêm danh mục</Link>
              <Table bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên danh mục</th>
                    <th></th>
        

                </tr>
                </thead>
             
                <tbody className="list-cate">                 
                {currentPosts.map((cate, index) => {
                    return (     
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{cate.name_category}</td>
                        <td>
                            <Link to={`../edit_category/${cate.id_category}`} className="bx bxs-edit btn-edit btn btn-primary">
                              {/* <Button variant="outline-primary" name='' className="bx bxs-edit btn-edit"></Button> */}
                            </Link>
                         
                            {/* <Link className=" btn btn-danger bx bxs-trash" onClick={() => 
                              deleteCategory(cate.id_category)}> */}
                              <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deleteCategory(cate.id_category)}></Button>
                            {/* </Link> */}
                        </td>
                      </tr>  
                    );     
                })}
                </tbody>
              </Table>
              {/* phan trang */}
            <Pagination totalPost={listCategory.length} 
            postsPerPage={postsPerPage} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage} />
            </div>
    </div>
  )
}

export default ListCategory