import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Pagination from '../../user/Pagination';
import { url } from '../../url';
import { TabTitle } from '../../title';
import HashLoader from "react-spinners/HashLoader";

function ListComment() {
  TabTitle('Danh sách bình luận');
  const [loading, setLoading] = useState(false);
  const id_comment = useParams();
  const [listCmt, setListCmt] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(10);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listCmt.slice(firstPageIndex, lastPageIndex);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
    getData()
  },[]);
  const getData = async (keywordss = '') => {
    const res = await axios.get(`${url}/comment/show?keyword=${keywordss}`);

       setListCmt(res.data.data);
   };
    const deleteCmt = async (id_comment) => {
    await axios.delete(`${url}/comment/delete/${id_comment}`);
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
            <h1 className="content_h1_admin">Danh sách bình luận</h1>
            {/* start search */}
            <div className ="header__nav_admin">
              <input className="form-control search_blog" placeholder="Nhập tên bạn muốn tìm kiếm" type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} 
              />
            </div>
            {/* end search */}
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên người dùng</th>
                  <th>Nội dung</th>
                  <th>Ngày bình luận</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='list_cmt'>
                {currentPosts.map((cmt, index) => {
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{cmt.full_name}</td>
                      <td>{cmt.content}</td>
                      <td>{cmt.created_at}</td>
                      <td>
                        <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deleteCmt(cmt.id_comment)}></Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {/* phan trang */}
            <Pagination totalPost={listCmt.length} 
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

export default ListComment