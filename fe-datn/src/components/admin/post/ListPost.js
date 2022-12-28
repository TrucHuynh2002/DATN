import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from '../../user/Pagination';
import { url } from '../../url';
import { TabTitle } from '../../title';

function ListPost() {
  TabTitle('Danh sách bài viết - Nhà Tui.com');
  const [listPost, setListPost] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(10);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    getData();
  },[]);

  // danh sach post
  const getData = async (keywordss = '') => {
   const res = await axios.get(`${url}/post/show?keyword=${keywordss}`);
   setListPost(res.data.data);
  };
  // search
  const handleChangeKeyWord = (e) => {
    getData(e.target.value)
  }

  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Danh sách bài viết</h1>
            <div className ="header__nav_admin">
              <input className="form-control search_blog" placeholder="Nhập tên bạn muốn tìm kiếm " type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} 
              />
            </div>
            <Table bordered>
            <thead>
            <tr>
                <th>ID</th>
                <th>Tên bài viết</th>
                <th>Trạng thái</th>
                {/* <th></th> */}
            </tr>
            </thead>
            <tbody>

                {currentPosts.map((post, index) => {
                    return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{post.post_name}</td>
                        <td>
                          {post.status === 1 && <Button variant="outline-success" disable="true" name='' className="">Đã duyệt</Button> }
                          {post.status === 0 && <Button variant="outline-danger" name='' className="">Phê duyệt</Button> }
                          </td>
                          <td>
                            <Link to={`../detail_post/${post.id_post}`} className="bx bx-detail btn-edit btn btn-primary"></Link>
                          </td>
                    </tr>
                    );
                })}               
            </tbody>
            </Table>
            <Pagination totalPost={listPost.length} 
            postsPerPage={postsPerPage} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage} />
        </div>
    </div>
  )
}

export default ListPost