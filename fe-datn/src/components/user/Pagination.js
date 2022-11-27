import React from 'react'

const Pagination = ({totalPost, postsPerPage,currentPage, setCurrentPage}) => {
    let pages =[];

    for(let i = 1; i <= Math.ceil(totalPost/postsPerPage); i++){
        pages.push(i)
    }

  return (
    <div className='pagination'>
        {pages.map((page, index) => {
            return <button key={index} onClick={() => setCurrentPage(page)} className=
            {page == currentPage ? 'active' : ''}>
                {page}
            </button>
        })}
    </div>
  )
}

export default Pagination