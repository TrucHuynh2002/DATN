import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../user/Pagination';

function ListComment() {

  const id_comment = useParams();
  const [listCmt, setListCmt] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(5);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listCmt.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    getData();
  },[]);

  // danh sách comment
  const getData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/comment/show');
       setListCmt(res.data.data);
   };

    // xoa comment
    const deleteCmt = async (id_comment) => {
    await axios.delete(`http://127.0.0.1:8000/api/comment/delete/${id_comment}`);
    getData();
  };


  return (
    <div className="content">
    <div className="add-post">
      <h1 className="content_h1_admin">Danh sách bình luận</h1>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên người dùng</th>
            <th>Nội dung</th>
            <th>Ngày bình luận</th>
            <th>Trạng thái</th>
            <th></th>

          </tr>
        </thead>
        <tbody className='list_cmt'>
          {currentPosts.map((cmt, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{cmt.id_user}</td>
                <td>{cmt.content}</td>
                <td>{cmt.date}</td>
                <td>{cmt.status}</td>
                <td>
                  <Link to="#">
                    <Button variant="outline-success" name='' className="btn-edit">Phê duyệt</Button>
                  </Link>
                  {/* <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deleteCmt(cmt.id_comment)}></Button> */}
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
  )
}

export default ListComment