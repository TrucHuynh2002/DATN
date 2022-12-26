import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from '../../user/Pagination';
import { url } from '../../url';

function ListFurniture() {

  const [listFurniture, setListFurniture] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(10);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = listFurniture.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    getData();
  },[]);

  // danh sach furniture
  const getData = async () => {
    const res = await axios.get(`${url}/furniture/show`);  
      setListFurniture(res.data.data);
  };

  // xoa
  const deleteFurniture = async (id_furniture) => {
    await axios.delete(`${url}/furniture/delete/${id_furniture}`);
    getData();
  };

  return (
    <div className="content">
    <div className="add-post">
      <h1 className="content_h1_admin">Danh sách nội thất</h1>
      <div className ="header__nav_admin">
        <Link to="../add_furniture" className="btn btn-primary form-add">Thêm nội thất</Link>
        <input className="form-control search_blog" placeholder="Nhập tên bạn muốn tìm kiếm " type="text" name="keywords" 
        // onChange={(e) => handleChangeKeyWord(e)} 
        />
      </div>
     
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên nội thất</th>
            <th>Icons</th>
            <th></th>
          
          </tr>
        </thead>
        <tbody className='list'>
            {currentPosts.map((furn, index) => {
              return(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{furn.name}</td>
                <td><div className={furn.icon}></div></td>
                <td>
                  <Link to={`../edit_furniture/${furn.id_furniture}`} className="bx bxs-edit btn-edit btn btn-primary"></Link>
                  <Button variant="outline-danger" name='' className="bx bxs-trash" onClick={() => deleteFurniture(furn.id_furniture)}></Button>
                </td>
              </tr>
              );
            })}
        </tbody>
    </Table>
      {/* phan trang */}
      <Pagination totalPost={listFurniture.length} 
      postsPerPage={postsPerPage} 
      setCurrentPage={setCurrentPage}
      currentPage={currentPage} />
      </div>             
    </div>
  )
}

export default ListFurniture