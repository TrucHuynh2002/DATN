import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../../user/Pagination';
import { url } from '../../url';
import { TabTitle } from '../../title';

function ListRoomType() {
  TabTitle('Danh sách loại phòng');
  const id_room_type = useParams();
  const [listRoomType, setListRoomType] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(10);
  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listRoomType.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    getData();
  },[]);

  // danh sach roomtype
  const getData = async (keywordss = '') => {
   const res = await axios.get(`${url}/roomType/show?keyword=${keywordss}`);
   setListRoomType(res.data.data);
  };

  // xoa category
  const deleteRoomType = async (id_room_type) => {
    await axios.delete(`${url}/roomType/delete/${id_room_type}`);
    getData();
  };
  // search
  const handleChangeKeyWord = (e) => {
    getData(e.target.value)
  }

  return (
    <div className="content">
            <div className="add-post">
              <h1 className="content_h1_admin">Danh sách loại phòng</h1>
              {/* start search */}
              <div className ="header__nav_admin">
                <Link to="../add_roomtype" className="btn btn-primary form-add">Thêm loại phòng</Link>
                <input className="form-control search_blog" placeholder="Nhập tên bạn muốn tìm kiếm " type="text" name="keywords" onChange={(e) => handleChangeKeyWord(e)} 
                />
              </div>
              {/* end search */}
             
              <Table bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên loại phòng</th>
                    <th></th>
                </tr>
                </thead>
             
                <tbody className="list-cate">                 
                {currentPosts.map((room, index) => {
                    return (     
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{room.name_room_type}</td>
                        <td>
                          <Link to={`../edit_roomtype/${room.id_room_type}`} className="bx bxs-edit btn-edit btn btn-primary"></Link>
                          <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deleteRoomType(room.id_room_type)}></Button>
                        </td>
                      </tr>  
                    );     
                })}
                </tbody>
              </Table>
              <Pagination totalPost={listRoomType.length} 
              postsPerPage={postsPerPage} 
              setCurrentPage={setCurrentPage}
              currentPage={currentPage} />
            </div>
    </div>
  )
}

export default ListRoomType