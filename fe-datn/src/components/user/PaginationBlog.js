import React from 'react'

const Pagination = ({totalBlog, blogPerPage, currentPageBlog, setCurrentPageBlog}) => {
    let pagesBlog =[];

    for(let i = 1; i <= Math.ceil(totalBlog/blogPerPage); i++){
        pagesBlog.push(i)
    }

  return (
    <div className='pagination'>
        {pagesBlog.map((pageBlog, index) => {
            return <button key={index} onClick={() => setCurrentPageBlog(pageBlog)} className=
            {pageBlog == currentPageBlog ? 'active' : ''}>
                {pageBlog}
            </button>
        })}
    </div>
  )
}

export default Pagination