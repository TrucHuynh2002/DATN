import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap';

import Pagination from '../Pagination';

function ListManageRoom() {
    var user = JSON.parse(localStorage.getItem("user"));
    const {id_user} = useParams();
    const [listPost, setListPost] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ postsPerPage, setPostsPerPage ] =useState(10);

    const lastPageIndex = currentPage * postsPerPage;
    const firstPageIndex = lastPageIndex - postsPerPage;
    const currentPosts = listPost.slice(firstPageIndex, lastPageIndex);

    useEffect(() => {
        getData();
    },[]);
    // danh sach Posted
    const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/post/showUser/${id_user}`); 
    setListPost(res.data.data);
    };
    
    const deletePost = async (id_post) => {
        await axios.delete(`http://127.0.0.1:8000/api/post/delete/${id_post}`);
        getData();
      };
  return (
    <div className="row">
        <div className="manage col-5">
            <div className="container">
                <div className="content_profile">
                    <div className="list-post">
                        <h1><b className="b_title">Tin đã đăng</b></h1>
                        <hr></hr>
                        <div className='row'>
                            {currentPosts.length > 0 ?
                            currentPosts.map((post, index) => {
                                return (    
                                <div className='col-md-12' key={index}>
                                    <div className='account_content____' >
                                        <span>  {index+1} / </span>
                                      <span>  {post.post_name}</span>
                                    </div>
                                </div>
                            )})
                            : <div className="text-center No_user____">
                            <img className="img_________" src="https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A3nh-icon-bu%E1%BB%93n-mu%E1%BB%91n-kh%C3%B3c-1024x1024.jpg" alt="images" />
                            <p>Chưa đăng bài nào </p>
                        </div>
                        }
                            {/* phan trang */}
                            <Pagination totalPost={listPost.length} 
                            postsPerPage={postsPerPage} 
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="manage col-7">
            {/* <div className="container"> */}
                <div className="content_profile">
                    <div className="list-post">
                        <div className='row'>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>1</th>
                                        <th>2</th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>6</th>
                                        <th>7</th>
                                        <th>8</th>
                                        <th>9</th>
                                        <th>10</th>
                                    </tr>
                                </thead>                           
                                <tbody className="list-cate">                
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>  
                                </tbody>
                            </Table>
                            <div className='color_room_manage'>
                                <div className='color_empty_room'></div><span style={{marginLeft:"5px"}}>Phòng trống</span>
                                <div className='color_ownership_room'></div><span style={{marginLeft:"5px"}}>Phòng đã sở hữu</span>
                                <div className='color_deposit_room'></div><span style={{marginLeft:"5px"}}>Phòng đặt cọc</span>
                            </div>
                        </div>                      
                    </div>
                </div>
            {/* </div> */}
        </div>
    </div>
  )
}

export default ListManageRoom