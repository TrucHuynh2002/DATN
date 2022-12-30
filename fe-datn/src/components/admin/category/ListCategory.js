import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../../user/Pagination';
import { url } from '../../url';
import { TabTitle } from '../../title';
import HashLoader from "react-spinners/HashLoader";

function ListCategory() {
  TabTitle('Danh sách danh mục');
  const [loading, setLoading] = useState(false);
  const id_category = useParams();
  const [listCategory, setListCategory] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(10);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listCategory.slice(firstPageIndex, lastPageIndex); 
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    getData();
  },[]);
  const getData = async (keywordss = '') => {
   const res = await axios.get(`${url}/category/show?keyword=${keywordss}`);
      setListCategory(res.data.data);
  };
  const deleteCategory = async (id_category) => {
    await axios.delete(`${url}/category/delete/${id_category}`);
    getData();
  };
  const handleChangeKeyWord = (e) => {
    getData(e.target.value)
  }

  return (
    <>
      {loading ? 
        <HashLoader className='css_loading_admin'
        color={'#0d3380'}
        loading={loading}
        size={100}
        />
        :
        <>
          <div className="content">
                  <div className="add-post">
                    <h1 className="content_h1_admin">Danh sách danh mục</h1>
                    <Link to="../add_category" className="btn btn-primary form-add">Thêm danh mục</Link>
                    <div className ="header__nav_admin">
                      <input className="form-control search_blog" placeholder="Nhập tên bạn muốn tìm kiếm " type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} />
                    </div>
                    <Table bordered>
                      <thead>
                      <tr>
                          <th>#</th>
                          <th>Tên danh mục</th>
                          <th>Link to</th>
                          <th></th>
                      </tr>
                      </thead>
                  
                      <tbody className="list-cate">                 
                      {currentPosts.map((cate, index) => {
                          return (     
                          <tr key={index}>
                              <td>{index+1}</td>
                              <td>{cate.name_category}</td>
                              <td>{cate.link_to}</td>
                              <td>
                                  <Link to={`../edit_category/${cate.id_category}`} className="bx bxs-edit btn-edit btn btn-primary">
                                  </Link>
                                    <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deleteCategory(cate.id_category)}></Button>
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
        </>
      }
    </>
  )
}

export default ListCategory