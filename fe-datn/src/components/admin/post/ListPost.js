import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from '../../user/Pagination';
import { url } from '../../url';

function ListPost() {

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
  const getData = async () => {
   const res = await axios.get(`${url}/post/show`);
   setListPost(res.data.data);
  };

  return (
    <div className="content">
        <div className="add-post">
            <h1 className="content_h1_admin">Danh sách bài viết</h1>
            {/* start search */}
            <form>
                <div className='row'>
                    <input className="form-control search_blog" placeholder="Tìm kiếm" type="text" name="" />
                    <div className="btn-search col-1">
                      <button className="btn btn-outline-secondary">
                        <i className='bx bx-search' style={{color:"#0d3380"}}></i>
                      </button>
                    </div>
                </div>
              </form>
              {/* end search */}
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
                            {/* <Link to={`../edit_post/${post.id_post}`} className="bx bxs-edit btn-edit btn btn-primary"></Link>
                            <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deletePost(post.id_post)}></Button> */}
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