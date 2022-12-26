import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Pagination from '../../user/Pagination';
import { url } from '../../url';

function ListBlog() {
  const navigate = useNavigate();
  const id_blog = useParams();
  const [listBlog, setListBlog] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] =useState(10);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listBlog.slice(firstPageIndex, lastPageIndex); 
  useEffect(() => {
    getData();
  },[]);
  // danh sach Blog
  const getData = async (keywordss = '') => {
   const res = await axios.get(`${url}/blog/show?keyword=${keywordss}`);
      setListBlog(res.data.data);
  };
  // xoa Blog
  const deleteBlog = async (id_blog) => {
    await axios.delete(`${url}/blog/delete/${id_blog}`);
    getData();
  };
  // search
  // const [keyword,setKeyword] = useState({
  //   keywords: ""
  // })
  // const {
  //   keywords,
  // } = keyword
  const [searching,setSearching] = useState(false);
          const [getKeywords,setgetKeywords] = useState([]);
          const [getDataPostSearch,setGetDataPostSearch] = useState([]);
          // const getKeyword = async (keyword) => {
          //   const res = await axios.get(`${url}/getkeywordblog/${keyword}`);
          //   console.log(res.data)
          //   setgetKeywords(res.data.data)
          //   setGetDataPostSearch(res.data.get_category)
          // }
          const handleChangeKeyWord = (e) => {
            // setKeyword({ ...keyword,[e.target.name]:e.target.value});
            getData(e.target.value)

            // if(e.target.value.length > 0){
            //   getKeyword(e.target.value)
            // }else{
            //   setSearching(false)
            // }
          }
          const handleSubmitSearch = (e) => {
            e.preventDefault()
          }

  return (
    <div className="content">
            <div className="add-post">
              <h1 className="content_h1_admin">Danh sách Blog</h1>
              {/* start search */}
              <form onSubmit={(e) => handleSubmitSearch(e)}>
                <div className='row'>
                    <input className="form-control search_blog" placeholder="Tìm kiếm" type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} />
                    {searching &&  (
                              <div className='show_search'>
                                 <ul>
                                  {
                                    getDataPostSearch.length > 0
                                    &&
                                   getDataPostSearch.map((post,index) => {
                                      return (
                                        <li key={index}>
                                              <Link to={`../blogdetail/${post.id_blog}`}>{post.name_blog}</Link>                              
                                        </li>

                                      )
                                   })

                                  }
                            
                                  {
                                    getKeywords.length > 0 
                                    &&
                                    getKeywords.map((keyword,index) => {
                                      return (
                                        <li key={index}>
                                          <Link to="room">{keyword.key_word}</Link>
                                        </li>
                                      )                                          
                                    })                                  
                                  }
                                    {/* <li>
                                      <Link to={`searchroom?keyword=${keywords}`}>Tìm kiếm với {keywords}</Link>
                                    </li> */}
                                </ul>               
                              </div>    
                            )
                          }
                    <div className="btn-search col-1">
                      <button className="btn btn-outline-secondary">
                        <i className='bx bx-search' style={{color:"#0d3380"}}></i>
                      </button>
                    </div>
                </div>
              </form>
              {/* end search */}
              <Link to="../add_blog" className="btn btn-primary form-add">Thêm Blog</Link>
              <Table bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên blog</th>
                    <th>Từ khóa</th>
                    <th>Mô tả ngắn</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
             
                <tbody className="list-cate">                 
                {currentPosts.map((blog, index) => {
                    return (     
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{blog.name_blog}</td>
                        <td>{blog.meta_keywords}</td>
                        <td className='blog_descriptionSort'>{blog.description_sort}</td>                        
                        <td>
                          <div>
                            <img src={blog.img_blog} alt={blog.name_img_blog} />
                          </div>
                        </td>
                        <td>                
                            <Link to={`../detail_blog/${blog.id_blog}`} className="bx bx-detail btn-edit btn btn-primary"></Link>            
                            <Link to={`../edit_blog/${blog.id_blog}`} className="bx bxs-edit btn-edit btn btn-primary">
                            </Link>           
                            <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deleteBlog(blog.id_blog)}></Button>
                        </td>
                      </tr>  
                    );     
                })}
                </tbody>
              </Table>
              {/* phan trang */}
            <Pagination totalPost={listBlog.length} 
            postsPerPage={postsPerPage} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage} />
            </div>
    </div>
  )
}

export default ListBlog